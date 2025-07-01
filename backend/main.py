import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.history_aware_retriever import \
    create_history_aware_retriever
from langchain.chains.retrieval import create_retrieval_chain
from langchain.document_loaders import (DirectoryLoader, PyPDFLoader,
                                        UnstructuredMarkdownLoader)
from langchain.prompts import (ChatPromptTemplate, FewShotPromptTemplate,
                               MessagesPlaceholder, PromptTemplate)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_google_genai import (ChatGoogleGenerativeAI,
                                    GoogleGenerativeAIEmbeddings)
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from pydantic import BaseModel

load_dotenv(".env.local", override=True)


class Chatbot:
    def __init__(self, model_provider="google"):
        self.model_provider = model_provider
        self.llm = self._get_llm()
        self.embeddings = self._get_embeddings()
        self.store = {}  # Store for chat histories
        self.rag_chain = self._create_rag_chain()

    def _get_llm(self):
        if self.model_provider == "openai":
            return ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
        elif self.model_provider == "google":
            return ChatGoogleGenerativeAI(model="models/gemini-2.5-flash", temperature=0)
        else:
            raise ValueError(
                f"Unsupported model provider: {self.model_provider}")

    def _get_embeddings(self):
        if self.model_provider == "openai":
            return OpenAIEmbeddings()
        elif self.model_provider == "google":
            return GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        else:
            raise ValueError(
                f"Unsupported model provider: {self.model_provider}")

    def _create_rag_chain(self):
        # 1. Load documents
        project_root = os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))
        CV_PATH = os.path.join(project_root, "public", "Tyler_CV.pdf")
        MARKDOWN_PATH = os.path.join(project_root, "markdown")

        cv_loader = PyPDFLoader(CV_PATH)
        markdown_loader = DirectoryLoader(
            MARKDOWN_PATH, glob="**/*.md", loader_cls=UnstructuredMarkdownLoader)

        cv_docs = cv_loader.load()
        markdown_docs = markdown_loader.load()
        docs = cv_docs + markdown_docs

        # 2. Split documents
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)
        print(splits)

        # 3. Create vector store
        vectorstore = FAISS.from_documents(
            documents=splits, embedding=self.embeddings)

        # 4. Create retrieval chain with few-shot examples
        # Define few-shot examples - combining English and multilingual examples
        examples = [
            # English examples
            {
                "context": "Tyler is a software engineer with experience in Python, React, and machine learning. He has worked on various web development projects.",
                "question": "What programming languages does Tyler know?",
                "answer": "Based on Tyler's background, he has experience with Python, React, and other web development technologies. He also has knowledge in machine learning technologies."
            },
            {
                "context": "Tyler has written blog posts about Docker, Django, and various development tools.",
                "question": "What does Tyler write about?",
                "answer": "Tyler writes about various development topics including Docker, Django, and other development tools and technologies based on his blog posts."
            },
            {
                "context": "Tyler graduated from university and has experience working on software projects.",
                "question": "Tell me about Tyler's education",
                "answer": "Tyler has a university education and practical experience working on software development projects."
            },
            # Chinese examples
            {
                "context": "Tyler 是一位軟體工程師，擅長 Python 和 React。他參與過多個網頁開發專案。",
                "question": "Tyler 會什麼程式語言？",
                "answer": "根據資料，Tyler 擅長 Python、React 等程式語言和網頁開發技術。他在機器學習技術方面也有相關知識。"
            },
            {
                "context": "Tyler 寫了關於 Docker、Django 和各種開發工具的部落格文章。",
                "question": "Tyler 都寫些什麼？",
                "answer": "Tyler 撰寫各種開發主題的文章，包括 Docker、Django 和其他開發工具與技術，這些都基於他的部落格文章。"
            },
            {
                "context": "當我沒有足夠資訊回答問題時，我應該誠實地說不知道。",
                "question": "Tyler 的寵物叫什麼名字？",
                "answer": "很抱歉，我沒有關於 Tyler 寵物的資訊。"
            }
        ]

        # Create example template
        example_template = """
        Context: {context}
        Question: {question}
        Answer: {answer}
        """

        example_prompt = PromptTemplate(
            input_variables=["context", "question", "answer"],
            template=example_template
        )

        # Create few-shot prompt template
        prefix = """You are Tyler's personal blog assistant. Your role is to help visitors learn about 
        Tyler by answering questions based on his blog posts, CV, and personal information. Your tone should be professional yet friendly.

        Use the following context from Tyler's blog and CV to answer questions about him, his experiences, skills, 
        projects, and thoughts. If you don't know the answer based on the provided context, politely say that you don't have that information about Tyler.

        IMPORTANT: You must respond in the EXACT same language as the user's question. If the question is in English, 
        respond in English. If the question is in Chinese, respond in Chinese. If the question is in any other language, respond in that same language. Do not translate or change the language of your response.

        Here are some examples of how to respond:"""

        suffix = """
        Context from Tyler's blog and CV:
        {context}

        Question: {input}
        Answer as Tyler's blog assistant:"""

        # Create the document chain prompt
        document_prompt = FewShotPromptTemplate(
            examples=examples,
            example_prompt=example_prompt,
            prefix=prefix,
            suffix=suffix,
            input_variables=["context", "input"],
            example_separator="\n"
        )

        # Create contextualize prompt for history-aware retrieval
        contextualize_q_system_prompt = (
            "Given a chat history and the latest user question "
            "which might reference context in the chat history, "
            "formulate a standalone question which can be understood "
            "without the chat history. Do NOT answer the question, "
            "just reformulate it if needed and otherwise return it as is."
        )

        contextualize_q_prompt = ChatPromptTemplate.from_messages([
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ])

        # Create history-aware retriever
        history_aware_retriever = create_history_aware_retriever(
            self.llm, vectorstore.as_retriever(), contextualize_q_prompt
        )

        # Create question-answer chain
        question_answer_chain = create_stuff_documents_chain(
            self.llm, document_prompt)

        # Create RAG chain
        rag_chain = create_retrieval_chain(
            history_aware_retriever, question_answer_chain)

        # Add session management
        def get_session_history(session_id: str) -> BaseChatMessageHistory:
            if session_id not in self.store:
                self.store[session_id] = ChatMessageHistory()
            return self.store[session_id]

        conversational_rag_chain = RunnableWithMessageHistory(
            rag_chain,
            get_session_history,
            input_messages_key="input",
            history_messages_key="chat_history",
            output_messages_key="answer",
        )

        return conversational_rag_chain

    def get_response(self, message, session_id="default"):
        response = self.rag_chain.invoke(
            {"input": message},
            config={"configurable": {"session_id": session_id}}
        )
        return response["answer"]


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    # In production, you should restrict this to your frontend's domain
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for chatbot instances per session
chatbot_sessions = {}


class ChatRequest(BaseModel):
    message: str
    model_provider: str = "google"  # Default to google
    session_id: str = "default"  # Session ID for chat history


@app.post("/api/chat")
async def chat(request: ChatRequest):
    model_key = request.model_provider

    # Get or create chatbot for this model provider
    if model_key not in chatbot_sessions:
        chatbot_sessions[model_key] = Chatbot(
            model_provider=request.model_provider)

    chatbot = chatbot_sessions[model_key]
    response = chatbot.get_response(
        request.message, session_id=request.session_id)
    return {"response": response}


@app.post("/api/chat/clear")
async def clear_chat(session_id: str = "default"):
    """Clear chat history for a specific session"""
    # Clear session history from all chatbot instances
    for chatbot in chatbot_sessions.values():
        if session_id in chatbot.store:
            del chatbot.store[session_id]
    return {"message": f"Chat history cleared for session: {session_id}"}
