"""Custom retrievers for the chatbot."""

import re
from typing import Any, Dict, List

from langchain.schema import BaseRetriever, Document


class BlogPostRetriever(BaseRetriever):
    """
    Custom retriever for blog posts based on tag filtering.

    This retriever identifies if a query is about blog posts and filters
    the posts based on relevant tags found in the query.
    """

    blog_posts: List[Dict[str, Any]] = []
    all_tags: List[str] = []

    class Config:
        """Configuration for the Pydantic model."""
        arbitrary_types_allowed = True

    def __init__(self, blog_posts: List[Dict[str, Any]], **kwargs: Any):
        """
        Initialize the BlogPostRetriever.

        Args:
            blog_posts: A list of dictionaries, where each dictionary
                        represents a blog post and its metadata.
            **kwargs: Additional keyword arguments for the base class.
        """
        super().__init__(**kwargs)
        self.blog_posts = blog_posts
        self.all_tags = list(
            set(tag for post in self.blog_posts for tag in post.get("tags", []))
        )

    def get_relevant_documents(self, query: str) -> List[Document]:
        """
        Get relevant blog post documents based on the query.

        If the query is not about blog posts, it returns an empty list.
        Otherwise, it filters posts by tags and returns them as Document objects.

        Args:
            query: The user's query string.

        Returns:
            A list of relevant Document objects.
        """
        if not self._is_blog_post_query(query):
            return []

        relevant_tags = self._extract_relevant_tags(query, self.all_tags)
        filtered_posts = self._filter_posts_by_tags(self.blog_posts, relevant_tags)

        if not filtered_posts and self._is_blog_post_query(query):
            filtered_posts = self.blog_posts[:10]  # Limit to 10 most recent

        return self._create_blog_post_documents(filtered_posts)

    def _is_blog_post_query(self, query: str) -> bool:
        """
        Detect if the user is asking about blog posts using regex patterns.

        Args:
            query: The user's query string.

        Returns:
            True if the query is likely about blog posts, False otherwise.
        """
        blog_indicators = [
            # English indicators
            r"\b(blog|post|article|write|wrote|writing)\b",
            r"\b(what.*write|what.*wrote|what.*blog)\b",
            r"\b(tell.*about.*post|about.*blog)\b",
            r"\b(show.*post|list.*post|find.*post)\b",
            # Chinese indicators
            r"\b(部落格|文章|寫|寫了|寫過|發布|發表)\b",
            r"\b(什麼.*寫|寫了什麼|寫過什麼)\b",
            r"\b(關於.*文章|關於.*部落格)\b",
            r"\b(顯示.*文章|列出.*文章|找.*文章)\b",
            # Technology-related terms (likely blog topics)
            r"\b(Python|Django|Docker|JavaScript|React|Vue|Node|CSS|HTML|Git|GitHub|Linux|MacOS|Terminal|Vim|Shell|Script)\b",
            r"\b(機器學習|人工智慧|軟體開發|程式設計|網頁開發|前端|後端|資料庫|演算法)\b",
        ]

        query_lower = query.lower()
        for pattern in blog_indicators:
            if re.search(pattern, query_lower, re.IGNORECASE):
                return True
        return False

    def _extract_relevant_tags(self, query: str, available_tags: List[str]) -> List[str]:
        """
        Extract relevant tags from the user query using direct and semantic matching.

        Args:
            query: The user's query string.
            available_tags: A list of all available tags.

        Returns:
            A list of unique, relevant tags found in the query.
        """
        relevant_tags = []
        query_lower = query.lower()

        for tag in available_tags:
            if tag.lower() in query_lower:
                relevant_tags.append(tag)

        tag_mappings = {
            # Programming languages
            "python": ["Python"],
            "django": ["Django"],
            "docker": ["Docker", "Dockerfile"],
            "javascript": ["JavaScript"],
            "react": ["React"],
            "vue": ["Vue"],
            "node": ["Node"],
            "html": ["HTML"],
            "css": ["CSS"],
            "shell": ["Shell Script"],
            "bash": ["Shell Script"],
            "terminal": ["Terminal"],
            "macos": ["MacOS"],
            "linux": ["Linux"],
            "vim": ["Text Editor"],
            "git": ["Git"],
            "github": ["GitHub"],
            "hexo": ["Hexo"],
            "deployment": ["Deployment"],
            "web development": ["Web Development"],
            "database": ["Database"],
            "mysql": ["MySQL"],
            "postgresql": ["PostgreSQL"],
            "basics": ["Basics"],
            "tutorial": ["Basics"],
            "guide": ["Basics"],
            "youtube": ["Youtube"],
            "video": ["Youtube"],
            "download": ["Youtube"],
            "animation": ["Animation"],
            "anime": ["Animation"],
            "vtuber": ["Vtuber"],
            "military": ["當兵"],
            "army": ["當兵"],
            "tlog": ["Tlog"],
            "diary": ["Tlog"],
            "life": ["Life"],
            "personal": ["Life"],
            "hacktoberfest": ["Hacktoberfest"],
            "open source": ["Hacktoberfest"],
            # Chinese mappings
            "程式": ["Python", "Programming"],
            "網頁": ["Web Development"],
            "部署": ["Deployment"],
            "資料庫": ["Database"],
            "終端": ["Terminal"],
            "指令": ["Shell Script"],
            "動畫": ["Animation"],
            "當兵": ["當兵"],
            "軍隊": ["當兵"],
            "日記": ["Tlog"],
            "生活": ["Life"],
        }

        for keyword, tags in tag_mappings.items():
            if keyword in query_lower:
                relevant_tags.extend(
                    [tag for tag in tags if tag in available_tags]
                )

        return list(set(relevant_tags))

    def _filter_posts_by_tags(
        self, posts: List[Dict], relevant_tags: List[str]
    ) -> List[Dict]:
        """
        Filter a list of blog posts by a list of relevant tags.

        Args:
            posts: The list of blog posts to filter.
            relevant_tags: The list of tags to filter by.

        Returns:
            A list of posts that have at least one of the relevant tags.
        """
        if not relevant_tags:
            return posts

        filtered_posts = []
        for post in posts:
            post_tags = post.get("tags", [])
            if any(tag in post_tags for tag in relevant_tags):
                filtered_posts.append(post)

        return filtered_posts

    def _create_blog_post_documents(self, posts: List[Dict]) -> List[Document]:
        """
        Create Document objects from a list of blog post metadata.

        Args:
            posts: A list of blog post dictionaries.

        Returns:
            A list of Document objects, each representing a blog post.
        """
        documents = []
        for post in posts:
            title = post.get("title", "Unknown Title")
            tags = post.get("tags", [])
            date = post.get("date", "")
            categories = post.get("categories", [])

            content = f"""
            Title: {title}
            Date: {date}
            Tags: {", ".join(tags)}
            Categories: {", ".join(categories)}

            This is a blog post by Tyler about {", ".join(tags)} topics.
            """

            documents.append(
                Document(
                    page_content=content,
                    metadata={
                        "title": title,
                        "tags": tags,
                        "date": date,
                        "categories": categories,
                        "type": "blog_post",
                    },
                )
            )

        return documents
