import json
import os
import re
from typing import Any, Dict, List, Optional

from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.history_aware_retriever import \
    create_history_aware_retriever
from langchain.chains.retrieval import create_retrieval_chain
from langchain.prompts import (ChatPromptTemplate, FewShotPromptTemplate,
                               MessagesPlaceholder, PromptTemplate)
from langchain.retrievers import EnsembleRetriever
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_community.document_loaders import (DirectoryLoader, PyPDFLoader,
                                                  UnstructuredMarkdownLoader)
from langchain_community.vectorstores import FAISS
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.retrievers import BaseRetriever
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_google_genai import (ChatGoogleGenerativeAI,
                                    GoogleGenerativeAIEmbeddings)
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from backend.helpers import time_profiler


class BlogPostRetriever(BaseRetriever):
    """Custom retriever for blog posts based on tag filtering"""

    blog_posts: List[Dict[str, Any]] = []
    all_tags: List[str] = []

    class Config:
        arbitrary_types_allowed = True

    def __init__(self, blog_posts: List[Dict[str, Any]], **kwargs):
        super().__init__(**kwargs)
        self.blog_posts = blog_posts
        self.all_tags = list(
            set(tag for post in self.blog_posts for tag in post.get('tags', [])))

    def get_relevant_documents(self, query: str) -> List[Document]:
        """Get relevant blog post documents based on query"""
        # Check if this is a blog post query
        if not self._is_blog_post_query(query):
            return []

        # Extract relevant tags from the query
        relevant_tags = self._extract_relevant_tags(query, self.all_tags)

        # Filter posts by tags
        filtered_posts = self._filter_posts_by_tags(
            self.blog_posts, relevant_tags)

        # If no specific tags found, return all posts (with a limit)
        if not filtered_posts and self._is_blog_post_query(query):
            filtered_posts = self.blog_posts[:10]  # Limit to 10 most recent

        # Create document objects
        documents = self._create_blog_post_documents(filtered_posts)

        return documents

    async def aget_relevant_documents(self, query: str) -> List[Document]:
        """Async version of get_relevant_documents"""
        return self.get_relevant_documents(query)

    def _is_blog_post_query(self, query: str) -> bool:
        """Detect if the user is asking about blog posts"""
        blog_indicators = [
            # English indicators
            r'\b(blog|post|article|write|wrote|writing)\b',
            r'\b(what.*write|what.*wrote|what.*blog)\b',
            r'\b(tell.*about.*post|about.*blog)\b',
            r'\b(show.*post|list.*post|find.*post)\b',
            # Chinese indicators
            r'\b(部落格|文章|寫|寫了|寫過|發布|發表)\b',
            r'\b(什麼.*寫|寫了什麼|寫過什麼)\b',
            r'\b(關於.*文章|關於.*部落格)\b',
            r'\b(顯示.*文章|列出.*文章|找.*文章)\b',
            # Technology-related terms (likely blog topics)
            r'\b(Python|Django|Docker|JavaScript|React|Vue|Node|CSS|HTML|Git|GitHub|Linux|MacOS|Terminal|Vim|Shell|Script)\b',
            r'\b(機器學習|人工智慧|軟體開發|程式設計|網頁開發|前端|後端|資料庫|演算法)\b',
        ]

        query_lower = query.lower()
        for pattern in blog_indicators:
            if re.search(pattern, query_lower, re.IGNORECASE):
                return True
        return False

    def _extract_relevant_tags(self, query: str, available_tags: List[str]) -> List[str]:
        """Extract relevant tags from user query"""
        relevant_tags = []
        query_lower = query.lower()

        # Direct tag matching
        for tag in available_tags:
            if tag.lower() in query_lower:
                relevant_tags.append(tag)

        # Semantic tag matching based on query content
        tag_mappings = {
            # Programming languages
            'python': ['Python'],
            'django': ['Django'],
            'docker': ['Docker', 'Dockerfile'],
            'javascript': ['JavaScript'],
            'react': ['React'],
            'vue': ['Vue'],
            'node': ['Node'],
            'html': ['HTML'],
            'css': ['CSS'],
            'shell': ['Shell Script'],
            'bash': ['Shell Script'],
            'terminal': ['Terminal'],
            'macos': ['MacOS'],
            'linux': ['Linux'],
            'vim': ['Text Editor'],
            'git': ['Git'],
            'github': ['GitHub'],
            'hexo': ['Hexo'],
            'deployment': ['Deployment'],
            'web development': ['Web Development'],
            'database': ['Database'],
            'mysql': ['MySQL'],
            'postgresql': ['PostgreSQL'],
            'basics': ['Basics'],
            'tutorial': ['Basics'],
            'guide': ['Basics'],
            'youtube': ['Youtube'],
            'video': ['Youtube'],
            'download': ['Youtube'],
            'animation': ['Animation'],
            'anime': ['Animation'],
            'vtuber': ['Vtuber'],
            'military': ['當兵'],
            'army': ['當兵'],
            'tlog': ['Tlog'],
            'diary': ['Tlog'],
            'life': ['Life'],
            'personal': ['Life'],
            'hacktoberfest': ['Hacktoberfest'],
            'open source': ['Hacktoberfest'],
            # Chinese mappings
            '程式': ['Python', 'Programming'],
            '網頁': ['Web Development'],
            '部署': ['Deployment'],
            '資料庫': ['Database'],
            '終端': ['Terminal'],
            '指令': ['Shell Script'],
            '動畫': ['Animation'],
            '當兵': ['當兵'],
            '軍隊': ['當兵'],
            '日記': ['Tlog'],
            '生活': ['Life'],
        }

        for keyword, tags in tag_mappings.items():
            if keyword in query_lower:
                relevant_tags.extend(
                    [tag for tag in tags if tag in available_tags])

        # Remove duplicates and return
        return list(set(relevant_tags))

    def _filter_posts_by_tags(self, posts: List[Dict], relevant_tags: List[str]) -> List[Dict]:
        """Filter blog posts by relevant tags"""
        if not relevant_tags:
            return posts

        filtered_posts = []
        for post in posts:
            post_tags = post.get('tags', [])
            if any(tag in post_tags for tag in relevant_tags):
                filtered_posts.append(post)

        return filtered_posts

    def _create_blog_post_documents(self, posts: List[Dict]) -> List[Document]:
        """Create Document objects from blog post metadata"""
        documents = []
        for post in posts:
            title = post.get('title', 'Unknown Title')
            tags = post.get('tags', [])
            date = post.get('date', '')
            categories = post.get('categories', [])

            # Create rich content for the document
            content = f"""
            Title: {title}
            Date: {date}
            Tags: {', '.join(tags)}
            Categories: {', '.join(categories)}

            This is a blog post by Tyler about {', '.join(tags)} topics.
            """

            documents.append(Document(
                page_content=content,
                metadata={
                    'title': title,
                    'tags': tags,
                    'date': date,
                    'categories': categories,
                    'type': 'blog_post'
                }
            ))

        return documents


class ChatbotService:
    def __init__(self, model_provider="google"):
        self.model_provider = model_provider
        self.llm = self._get_llm()
        self.embeddings = self._get_embeddings()
        self.store = {}  # Store for chat histories
        self.rag_chain = self._create_rag_chain()

    @time_profiler
    def _get_llm(self):
        if self.model_provider == "openai":
            return ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
        elif self.model_provider == "google":
            return ChatGoogleGenerativeAI(model="models/gemini-2.5-flash", temperature=0.3)
        else:
            raise ValueError(
                f"Unsupported model provider: {self.model_provider}")

    @time_profiler
    def _get_embeddings(self):
        if self.model_provider == "openai":
            return OpenAIEmbeddings()
        elif self.model_provider == "google":
            return GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        else:
            raise ValueError(
                f"Unsupported model provider: {self.model_provider}")

    @time_profiler
    def _load_documents(self):
        project_root = os.path.dirname(os.path.dirname(
            os.path.dirname(os.path.abspath(__file__))))
        CV_PATH = os.path.join(project_root, "public", "Tyler_CV.pdf")
        MARKDOWN_PATH = os.path.join(project_root, "markdown")

        cv_loader = PyPDFLoader(CV_PATH)
        markdown_loader = DirectoryLoader(
            MARKDOWN_PATH, glob="**/*.md", loader_cls=UnstructuredMarkdownLoader)

        cv_docs = cv_loader.load()
        markdown_docs = markdown_loader.load()

        QA_PATH = os.path.join(project_root, "backend", "QA")
        qa_files = [
            os.path.join(QA_PATH, "blog.en.json"),
            os.path.join(QA_PATH, "blog.tw.json"),
            os.path.join(QA_PATH, "person.en.json"),
            os.path.join(QA_PATH, "person.tw.json"),
        ]
        qa_docs = []
        for file_path in qa_files:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for item in data:
                        content = f"Question: {item['question']}\nAnswer: {item['answer']}"
                        qa_docs.append(Document(page_content=content))

        return cv_docs + markdown_docs + qa_docs

    @time_profiler
    def _load_blog_metadata(self) -> List[Dict[str, Any]]:
        """Load blog post metadata from tags.json and metadata.json"""
        project_root = os.path.dirname(os.path.dirname(
            os.path.dirname(os.path.abspath(__file__))))

        # Load tags.json
        tags_path = os.path.join(project_root, "backend", "QA", "tags.json")
        metadata_path = os.path.join(
            project_root, "backend", "QA", "metadata.json")

        blog_posts = []

        if os.path.exists(tags_path):
            with open(tags_path, 'r', encoding='utf-8') as f:
                tags_data = json.load(f)
                blog_posts.extend(tags_data)

        # Load additional metadata if available
        if os.path.exists(metadata_path):
            with open(metadata_path, 'r', encoding='utf-8') as f:
                metadata = json.load(f)
                # Merge metadata with tags data
                for post in blog_posts:
                    # Find corresponding metadata entry
                    for filepath, meta in metadata.items():
                        if meta.get('title') == post.get('title'):
                            post.update(meta)
                            post['filepath'] = filepath
                            break

        return blog_posts

    @time_profiler
    def _create_rag_chain(self):
        docs = self._load_documents()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500, chunk_overlap=100)
        splits = text_splitter.split_documents(docs)

        vectorstore = FAISS.from_documents(
            documents=splits, embedding=self.embeddings)

        # Create general vector store retriever
        general_retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

        # Create blog post retriever
        blog_posts = self._load_blog_metadata()
        blog_retriever = BlogPostRetriever(blog_posts)

        # Combine retrievers using EnsembleRetriever
        ensemble_retriever = EnsembleRetriever(
            retrievers=[general_retriever, blog_retriever],
            weights=[0.7, 0.3]  # Give more weight to general retriever
        )

        examples = [
            {
                "context": "Tyler is a software engineer with experience in Python, React, and machine learning. He has worked on various web development projects.",
                "question": "What programming languages does Tyler know?",
                "answer": """# Tyler's Programming Expertise

Tyler has experience with a variety of programming languages and technologies, including:

*   **Python**: Proficient in backend development and data processing.
*   **React**: Skilled in building interactive user interfaces.
*   **JavaScript/TypeScript**: Core languages for web development.
*   **Machine Learning**: Knowledgeable in ML concepts and frameworks.

He has applied these skills in various web development projects."""
            },
            {
                "context": "Tyler has written blog posts about Docker, Django, and various development tools.",
                "question": "What does Tyler write about?",
                "answer": """# Tyler's Blog Topics

Tyler writes about a diverse range of development topics on his blog. His key interests and areas of expertise include:

## Web Development Frameworks
*   **Django**: In-depth articles on this Python web framework.
*   **React**: Discussions on front-end development and component-based architecture.

## DevOps & Tools
*   **Docker**: Guides and insights on containerization.
*   **Git/GitHub**: Best practices for version control.
*   **Terminal/Shell Scripting**: Tips for efficient command-line usage.

## Programming Languages
*   **Python**: Various topics from built-in functions to package management.
*   **JavaScript**: Modern JavaScript features and applications.

### Other Notable Topics
*   **Machine Learning**: Explorations into AI and data science concepts.
*   **Personal Reflections**: Occasional posts on life and career development."""
            },
            {
                "context": "Tyler graduated from university and has experience working on software projects.",                "question": "Tell me about Tyler's education",
                "answer": """# Tyler's Educational Background

Tyler holds a **university degree** which provided him with a strong foundation in computer science and software engineering principles. During his studies, he focused on areas relevant to modern software development.

## Key Educational Highlights
*   **Academic Projects**: Engaged in several hands-on projects that simulated real-world development scenarios.
*   **Core Curriculum**: Covered essential topics such as data structures, algorithms, operating systems, and database management.

This academic preparation, combined with practical experience, has equipped him with the skills necessary for his work in software development."""
            },
            {
                "context": "Tyler 是一位軟體工程師，擅長 Python 和 React。他參與過多個網頁開發專案。",
                "question": "Tyler 會什麼程式語言？",
                "answer": """# Tyler 的程式語言專長

Tyler 精通多種程式語言和技術，其中包括：

*   **Python**：擅長後端開發和資料處理。
*   **React**：精於建構互動式使用者介面。
*   **JavaScript/TypeScript**：網頁開發的核心語言。
*   **機器學習**：具備機器學習概念和框架的知識。

他已將這些技能應用於多個網頁開發專案中。"""
            },
            {
                "context": "Tyler 寫了關於 Docker、Django 和各種開發工具的部落格文章。",
                "question": "Tyler 都寫些什麼？",
                "answer": """# Tyler 的部落格主題

Tyler 在他的部落格上撰寫了各種開發主題的文章。他的主要興趣和專業領域包括：

## 網頁開發框架
*   **Django**：關於這個 Python 網頁框架的深入文章。
*   **React**：關於前端開發和組件化架構的討論。

## DevOps 和工具
*   **Docker**：關於容器化的指南和見解。
*   **Git/GitHub**：版本控制的最佳實踐。
*   **終端機/Shell 腳本**：提高命令列使用效率的技巧。

## 程式語言
*   **Python**：從內建函數到套件管理的各種主題。
*   **JavaScript**：現代 JavaScript 功能和應用。

### 其他值得注意的主題
*   **機器學習**：對 AI 和資料科學概念的探索。
*   **個人反思**：偶爾發表關於生活和職業發展的文章。"""
            },
            {
                "context": "當我沒有足夠資訊回答問題時，我應該誠實地說不知道。",
                "question": "Tyler 的寵物叫什麼名字？",
                "answer": "很抱歉，我沒有關於 Tyler 寵物的資訊。"
            },
            {
                "context": "Tyler has written blog posts about Python, Django, Docker, and various development tools and technologies.",
                "question": "What blog posts has Tyler written about Python?",
                "answer": """# Tyler's Python Blog Posts

Tyler has written several blog posts focusing on Python. Here are some of the key topics he has covered:

## Core Python Concepts
*   **Built-in Functions**: Detailed explanations and usage examples.
*   **Loops**: Understanding different types of loops and their applications.
*   **String Handling**: Techniques for manipulating and working with strings.

## Python Development & Deployment
*   **Python Package Development**: Guides on how to create and structure Python packages.
*   **Deployment to PyPI**: Steps for publishing your Python packages to the Python Package Index.

These posts aim to provide practical insights and guidance for Python developers of all levels."""
            },
            {
                "context": "Tyler的部落格文章涵蓋了Python、Django、Docker等技術主題。",
                "question": "Tyler寫了哪些關於Python的文章？",
                "answer": """# Tyler 的 Python 部落格文章

Tyler 撰寫了多篇關於 Python 的部落格文章。以下是他涵蓋的一些主要主題：

## 核心 Python 概念
*   **內建函數**：詳細的解釋和使用範例。
*   **迴圈**：了解不同類型的迴圈及其應用。
*   **字串處理**：操作和處理字串的技巧。

## Python 開發與部署
*   **Python 套件開發**：關於如何建立和組織 Python 套件的指南。
*   **部署到 PyPI**：將您的 Python 套件發佈到 Python 套件索引的步驟。

這些文章旨在為各級 Python 開發人員提供實用的見解和指導。"""
            }
        ]

        example_template = """
        Context: {context}
        Question: {question}
        Answer: {answer}
        """

        example_prompt = PromptTemplate(
            input_variables=["context", "question", "answer"],
            template=example_template
        )

        prefix = """You are Tyler's personal blog assistant. Your role is to help visitors learn about 
        Tyler by answering questions based on his blog posts, CV, and personal information. Your tone should be neutral and friendly.

        Use the following context from Tyler's blog and CV to answer questions about him, his experiences, skills, 
        projects, and thoughts. If you don't know the answer based on the provided context, politely say that you don't have that information about Tyler.

        When answering questions about Tyler's blog posts, provide specific information about the posts including titles, topics, and relevant details.

        Please structure your responses using markdown. Use headings, bold text, and lists to make the information clear and easy to read. For example, use bullet points for lists of blog posts or skills.

        IMPORTANT: You must respond in the EXACT same language as the user's question. If the question is in English, 
        respond in English. If the question is in Chinese, respond in Chinese. If the question is in any other language, respond in that same language. Do not translate or change the language of your response.

        Here are some examples of how to respond:"""

        suffix = """
        Context from Tyler's blog and CV:
        {context}

        Question: {input}
        Answer as Tyler's blog assistant (structured with markdown):"""

        document_prompt = FewShotPromptTemplate(
            examples=examples,
            example_prompt=example_prompt,
            prefix=prefix,
            suffix=suffix,
            input_variables=["context", "input"],
            example_separator="\n"
        )

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

        history_aware_retriever = create_history_aware_retriever(
            self.llm, ensemble_retriever, contextualize_q_prompt
        )

        question_answer_chain = create_stuff_documents_chain(
            self.llm, document_prompt)

        rag_chain = create_retrieval_chain(
            history_aware_retriever, question_answer_chain)

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

    @time_profiler
    def get_response(self, message, session_id="default"):
        response = self.rag_chain.invoke(
            {"input": message},
            config={"configurable": {"session_id": session_id}}
        )
        return response
