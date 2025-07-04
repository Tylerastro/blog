# Backend Service

This directory contains the backend service for the blog, which is a FastAPI application that provides a chatbot API.

## Description

The backend is a Python-based service built with FastAPI. It serves as a personal assistant chatbot that can answer questions about Tyler, his blog posts, his CV, and other personal information. The chatbot leverages a Retrieval-Augmented Generation (RAG) model to provide contextually relevant answers.

## Tech Stack

-   **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
-   **Language:** [Python 3.12](https://www.python.org/)
-   **Core Libraries:**
    -   [LangChain](https://www.langchain.com/): For building the RAG chain and integrating with language models.
    -   [LangChain OpenAI](https://python.langchain.com/docs/integrations/llms/openai): For integration with OpenAI models.
    -   [LangChain Google GenAI](https://python.langchain.com/docs/integrations/llms/google_vertex_ai_palm): For integration with Google's Generative AI models.
    -   [FAISS](https://github.com/facebookresearch/faiss): For efficient similarity search in the vector store.
    -   [Pydantic](https://pydantic-docs.helpmanual.io/): For data validation.
    -   [Uvicorn](https://www.uvicorn.org/): As the ASGI server.

## Features

-   **Chatbot API:** Exposes a `/api/chat` endpoint to interact with the chatbot.
-   **Multi-model Support:** Can be configured to use different language models (e.g., Google Gemini, OpenAI GPT).
-   **Session Management:** Maintains chat history for each user session.
-   **Retrieval-Augmented Generation (RAG):** The chatbot uses a RAG pipeline to retrieve relevant information from various sources before generating a response.

### RAG Data Sources

The RAG system pulls information from the following sources:
-   **CV:** Tyler's CV from `/public/Tyler_CV.pdf`.
-   **Blog Posts:** Markdown files located in the `/markdown` directory.
-   **QA Pairs:** JSON files in `/backend/QA/` containing predefined questions and answers about Tyler and the blog, in both English and Chinese.
-   **Blog Metadata:** Metadata about blog posts from `/backend/QA/metadata.json` and `/backend/QA/tags.json`.

A custom `BlogPostRetriever` is implemented to specifically query blog post information based on tags and content.
