"""
Main service for the chatbot, responsible for initializing the RAG chain and handling chat responses.
"""

from typing import Any, Dict

from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.history_aware_retriever import \
    create_history_aware_retriever
from langchain.retrievers import EnsembleRetriever
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_community.vectorstores import FAISS
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_google_genai import (ChatGoogleGenerativeAI,
                                    GoogleGenerativeAIEmbeddings)
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from backend.helpers import time_profiler
from backend.services.loaders import load_blog_metadata, load_documents
from backend.services.prompts import (create_contextualize_prompt,
                                      create_document_prompt)
from backend.services.retrievers import BlogPostRetriever


class ChatbotService:
    """
    A comprehensive chatbot service that integrates multiple components to provide
    intelligent responses based on a variety of data sources.

    This service uses a Retrieval-Augmented Generation (RAG) chain to combine
    document retrieval with a language model to generate contextual answers.
    It supports different model providers (Google, OpenAI) and maintains chat history.
    """

    def __init__(self, model_provider: str = "google"):
        """
        Initialize the ChatbotService.

        Args:
            model_provider: The provider for the language model, either "google" or "openai".
                            Defaults to "google".
        """
        self.model_provider = model_provider
        self.llm = self._get_llm()
        self.embeddings = self._get_embeddings()
        # Store for chat histories
        self.store: Dict[str, BaseChatMessageHistory] = {}
        self.rag_chain = self._create_rag_chain()

    @time_profiler
    def _get_llm(self) -> ChatGoogleGenerativeAI | ChatOpenAI:
        """
        Get the language model based on the specified provider.

        Returns:
            An instance of a chat model from either Google or OpenAI.

        Raises:
            ValueError: If the model provider is unsupported.
        """
        if self.model_provider == "openai":
            return ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
        elif self.model_provider == "google":
            return ChatGoogleGenerativeAI(model="models/gemini-2.5-flash", temperature=0.3)
        else:
            raise ValueError(
                f"Unsupported model provider: {self.model_provider}")

    @time_profiler
    def _get_embeddings(self) -> GoogleGenerativeAIEmbeddings | OpenAIEmbeddings:
        """
        Get the embedding model based on the specified provider.

        Returns:
            An instance of an embedding model from either Google or OpenAI.

        Raises:
            ValueError: If the model provider is unsupported.
        """
        if self.model_provider == "openai":
            return OpenAIEmbeddings()
        elif self.model_provider == "google":
            return GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        else:
            raise ValueError(
                f"Unsupported model provider: {self.model_provider}")

    @time_profiler
    def _create_rag_chain(self) -> RunnableWithMessageHistory:
        """
        Create the full Retrieval-Augmented Generation (RAG) chain.

        This chain includes:
        - Loading and splitting documents.
        - Creating a vector store and retrievers.
        - Setting up prompts for contextualization and answering.
        - Combining all components into a runnable chain with history.

        Returns:
            A runnable RAG chain with message history management.
        """
        docs = load_documents()
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500, chunk_overlap=100)
        splits = text_splitter.split_documents(docs)

        vectorstore = FAISS.from_documents(
            documents=splits, embedding=self.embeddings)
        general_retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

        blog_posts = load_blog_metadata()
        blog_retriever = BlogPostRetriever(blog_posts)

        ensemble_retriever = EnsembleRetriever(
            retrievers=[general_retriever, blog_retriever],
            weights=[0.7, 0.3],  # Give more weight to general retriever
        )

        document_prompt = create_document_prompt()
        contextualize_q_prompt = create_contextualize_prompt()

        history_aware_retriever = create_history_aware_retriever(
            self.llm, ensemble_retriever, contextualize_q_prompt
        )

        question_answer_chain = create_stuff_documents_chain(
            self.llm, document_prompt)

        rag_chain = create_retrieval_chain(
            history_aware_retriever, question_answer_chain)

        def get_session_history(session_id: str) -> BaseChatMessageHistory:
            """
            Get the chat history for a given session ID.

            If a history does not exist for the session, a new one is created.

            Args:
                session_id: The ID of the user session.

            Returns:
                The chat message history for the session.
            """
            if session_id not in self.store:
                self.store[session_id] = ChatMessageHistory()
            return self.store[session_id]

        return RunnableWithMessageHistory(
            rag_chain,
            get_session_history,
            input_messages_key="input",
            history_messages_key="chat_history",
            output_messages_key="answer",
        )

    @time_profiler
    def get_response(self, message: str, session_id: str = "default") -> Dict[str, Any]:
        """
        Get a response from the chatbot for a given message and session ID.

        Args:
            message: The user's input message.
            session_id: The unique identifier for the user session. Defaults to "default".

        Returns:
            A dictionary containing the chatbot's response and other relevant information.
        """
        return self.rag_chain.invoke(
            {"input": message},
            config={"configurable": {"session_id": session_id}},
        )

    def clear_session_history(self, session_id: str = "default"):
        """
        Clear the chat history for a specific session.

        Args:
            session_id: The unique identifier for the user session. Defaults to "default".
        """
        if session_id in self.store:
            del self.store[session_id]
