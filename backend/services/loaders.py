"""Data loading utilities for the chatbot."""

import json
import os
from typing import Any, Dict, List

from langchain.schema import Document
from langchain_community.document_loaders import (
    DirectoryLoader,
    PyPDFLoader,
    UnstructuredMarkdownLoader,
)


def load_documents() -> List[Document]:
    """
    Load documents from various sources including PDF, Markdown, and QA JSON files.

    Returns:
        A list of Document objects from all sources.
    """
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    CV_PATH = os.path.join(project_root, "public", "Tyler_CV.pdf")
    MARKDOWN_PATH = os.path.join(project_root, "markdown")

    cv_loader = PyPDFLoader(CV_PATH)
    markdown_loader = DirectoryLoader(
        MARKDOWN_PATH, glob="**/*.md", loader_cls=UnstructuredMarkdownLoader
    )

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
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                for item in data:
                    content = f"Question: {item['question']}\nAnswer: {item['answer']}"
                    qa_docs.append(Document(page_content=content))

    return cv_docs + markdown_docs + qa_docs


def load_blog_metadata() -> List[Dict[str, Any]]:
    """
    Load and merge blog post metadata from tags.json and metadata.json.

    Returns:
        A list of dictionaries, each representing a blog post with its metadata.
    """
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    tags_path = os.path.join(project_root, "backend", "QA", "tags.json")
    metadata_path = os.path.join(project_root, "backend", "QA", "metadata.json")

    blog_posts = []

    if os.path.exists(tags_path):
        with open(tags_path, "r", encoding="utf-8") as f:
            tags_data = json.load(f)
            blog_posts.extend(tags_data)

    if os.path.exists(metadata_path):
        with open(metadata_path, "r", encoding="utf-8") as f:
            metadata = json.load(f)
            for post in blog_posts:
                for filepath, meta in metadata.items():
                    if meta.get("title") == post.get("title"):
                        post.update(meta)
                        post["filepath"] = filepath
                        break

    return blog_posts
