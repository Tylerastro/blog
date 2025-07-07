"""Prompt templates for the chatbot."""

from langchain.prompts import (
    ChatPromptTemplate,
    FewShotPromptTemplate,
    MessagesPlaceholder,
    PromptTemplate,
)


def create_document_prompt() -> FewShotPromptTemplate:
    """
    Create a few-shot prompt template for the document chain.

    This prompt includes examples of how to respond to different types of questions.

    Returns:
        A FewShotPromptTemplate object.
    """
    examples = [
        {
            "context": "The user is asking a question about a random topic.",
            "question": "What is the capital of France?",
            "answer": "Sorry, the chatbot is incapable of answering this question",
        },
        {
            "context": "使用者正在問一個無關的問題。",
            "question": "法國的首都是哪裡？",
            "answer": "Sorry, the chatbot is incapable of answering this question",
        },
        {
            "context": "Tyler is a software engineer with experience in Python, React, and machine learning. He has worked on various web development projects.",
            "question": "What programming languages does Tyler know?",
            "answer": """# Tyler's Programming Expertise\n\nTyler has experience with a variety of programming languages and technologies, including:\n\n*   **Python**: Proficient in backend development and data processing.\n*   **React**: Skilled in building interactive user interfaces.\n*   **JavaScript/TypeScript**: Core languages for web development.\n*   **Machine Learning**: Knowledgeable in ML concepts and frameworks.\n\nHe has applied these skills in various web development projects.""",
        },
        {
            "context": "Tyler has written blog posts about Docker, Django, and various development tools.",
            "question": "What does Tyler write about?",
            "answer": """# Tyler's Blog Topics\n\nTyler writes about a diverse range of development topics on his blog. His key interests and areas of expertise include:\n\n## Web Development Frameworks\n*   **Django**: In-depth articles on this Python web framework.\n*   **React**: Discussions on front-end development and component-based architecture.\n\n## DevOps & Tools\n*   **Docker**: Guides and insights on containerization.\n*   **Git/GitHub**: Best practices for version control.\n*   **Terminal/Shell Scripting**: Tips for efficient command-line usage.\n\n## Programming Languages\n*   **Python**: Various topics from built-in functions to package management.\n*   **JavaScript**: Modern JavaScript features and applications.\n\n### Other Notable Topics\n*   **Machine Learning**: Explorations into AI and data science concepts.\n*   **Personal Reflections**: Occasional posts on life and career development.""",
        },
        {
            "context": "Tyler graduated from university and has experience working on software projects.",
            "question": "Tell me about Tyler's education",
            "answer": """# Tyler's Educational Background\n\nTyler holds a **university degree** which provided him with a strong foundation in computer science and software engineering principles. During his studies, he focused on areas relevant to modern software development.\n\n## Key Educational Highlights\n*   **Academic Projects**: Engaged in several hands-on projects that simulated real-world development scenarios.\n*   **Core Curriculum**: Covered essential topics such as data structures, algorithms, operating systems, and database management.\n\nThis academic preparation, combined with practical experience, has equipped him with the skills necessary for his work in software development.""",
        },
        {
            "context": "Tyler 是一位軟體工程師，擅長 Python 和 React。他參與過多個網頁開發專案。",
            "question": "Tyler 會什麼程式語言？",
            "answer": """# Tyler 的程式語言專長\n\nTyler 精通多種程式語言和技術，其中包括：\n\n*   **Python**：擅長後端開發和資料處理。\n*   **React**：精於建構互動式使用者介面。\n*   **JavaScript/TypeScript**：網頁開發的核心語言。\n*   **機器學習**：具備機器學習概念和框架的知識。\n\n他已將這些技能應用於多個網頁開發專案中。""",
        },
        {
            "context": "Tyler 寫了關於 Docker、Django 和各種開發工具的部落格文章。",
            "question": "Tyler 都寫些什麼？",
            "answer": """# Tyler 的部落格主題\n\nTyler 在他的部落格上撰寫了各種開發主題的文章。他的主要興趣和專業領域包括：\n\n## 網頁開發框架\n*   **Django**：關於這個 Python 網頁框架的深入文章。\n*   **React**：關於前端開發和組件化架構的討論。\n\n## DevOps 和工具\n*   **Docker**：關於容器化的指南和見解。\n*   **Git/GitHub**：版本控制的最佳實踐。\n*   **終端機/Shell 腳本**：提高命令列使用效率的技巧。\n\n## 程式語言\n*   **Python**：從內建函數到套件管理的各種主題。\n*   **JavaScript**：現代 JavaScript 功能和應用。\n\n### 其他值得注意的主題\n*   **機器學習**：對 AI 和資料科學概念的探索。\n*   **個人反思**：偶爾發表關於生活和職業發展的文章。""",
        },
        {
            "context": "當我沒有足夠資訊回答問題時，我應該誠實地說不知道。",
            "question": "Tyler 的寵物叫什麼名字？",
            "answer": "很抱歉，我沒有關於 Tyler 寵物的資訊。",
        },
        {
            "context": "Tyler has written blog posts about Python, Django, Docker, and various development tools and technologies.",
            "question": "What blog posts has Tyler written about Python?",
            "answer": """# Tyler's Python Blog Posts\n\nTyler has written several blog posts focusing on Python. Here are some of the key topics he has covered:\n\n## Core Python Concepts\n*   **Built-in Functions**: Detailed explanations and usage examples.\n*   **Loops**: Understanding different types of loops and their applications.\n*   **String Handling**: Techniques for manipulating and working with strings.\n\n## Python Development & Deployment\n*   **Python Package Development**: Guides on how to create and structure Python packages.\n*   **Deployment to PyPI**: Steps for publishing your Python packages to the Python Package Index.\n\nThese posts aim to provide practical insights and guidance for Python developers of all levels.""",
        },
        {
            "context": "Tyler的部落格文章涵蓋了Python、Django、Docker等技術主題。",
            "question": "Tyler寫了哪些關於Python的文章？",
            "answer": """# Tyler 的 Python 部落格文章\n\nTyler 撰寫了多篇關於 Python 的部落格文章。以下是他涵蓋的一些主要主題：\n\n## 核心 Python 概念\n*   **內建函數**：詳細的解釋和使用範例。\n*   **迴圈**：了解不同類型的迴圈及其應用。\n*   **字串處理**：操作和處理字串的技巧。\n\n## Python 開發與部署\n*   **Python 套件開發**：關於如何建立和組織 Python 套件的指南。\n*   **部署到 PyPI**：將您的 Python 套件發佈到 Python 套件索引的步驟。\n\n這些文章旨在為各級 Python 開發人員提供實用的見解和指導。""",
        },
    ]

    example_template = """Context: {context}\nQuestion: {question}\nAnswer: {answer}"""

    example_prompt = PromptTemplate(
        input_variables=["context", "question", "answer"],
        template=example_template,
    )

    prefix = """You are Tyler's personal blog assistant. Your role is to help visitors learn about \n        Tyler by answering questions based on his blog posts, CV, and personal information. Your tone should be neutral and friendly.\n\n        Use the following context from Tyler's blog and CV to answer questions about him, his experiences, skills, \n        projects, and thoughts. If you don't know the answer based on the provided context, politely say that you don't have that information about Tyler.\n\n        When answering questions about Tyler's blog posts, provide specific information about the posts including titles, topics, and relevant details.\n        \n        If the user asks a question that is not related to Tyler, his blog, his CV, or his work, you must politely decline and respond with the exact phrase: "Sorry, the chatbot is incapable of answering this question".\n\n        Please structure your responses using markdown. Use headings, bold text, and lists to make the information clear and easy to read. For example, use bullet points for lists of blog posts or skills.\n\n        IMPORTANT: You must respond in the EXACT same language as the user's question. If the question is in English, \n        respond in English. If the question is in Chinese, respond in Chinese. If the question is in any other language, respond in that same language. Do not translate or change the language of your response.\n\n        Here are some examples of how to respond:"""

    suffix = """Context from Tyler's blog and CV:\n{context}\n\nQuestion: {input}\nAnswer as Tyler's blog assistant (structured with markdown):"""

    return FewShotPromptTemplate(
        examples=examples,
        example_prompt=example_prompt,
        prefix=prefix,
        suffix=suffix,
        input_variables=["context", "input"],
        example_separator="\n",
    )


def create_contextualize_prompt() -> ChatPromptTemplate:
    """
    Create a prompt template for contextualizing a question based on chat history.

    Returns:
        A ChatPromptTemplate object.
    """
    contextualize_q_system_prompt = (
        "Given a chat history and the latest user question "
        "which might reference context in the chat history, "
        "formulate a standalone question which can be understood "
        "without the chat history. Do NOT answer the question, "
        "just reformulate it if needed and otherwise return it as is."
    )

    return ChatPromptTemplate.from_messages([
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ])