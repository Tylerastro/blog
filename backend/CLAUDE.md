# CLAUDE.md - Backend

This file provides guidance for working with the FastAPI backend service that powers the blog's AI chat functionality.

## Quick Start

### Prerequisites
- Python 3.8+ 
- API keys for Google Gemini and/or OpenAI (stored in `.env.local`)

### Environment Setup
Create `backend/.env.local` with the following variables:
```
GOOGLE_API_KEY=your_google_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### Installation & Running
```bash
# Navigate to backend directory
cd backend

# Install dependencies (using uv - preferred)
uv sync

# Alternative: pip install from pyproject.toml
pip install -e .

# Start development server
uvicorn main:app --reload

# Server runs on http://localhost:8000
# API docs available at http://localhost:8000/docs
```

## API Endpoints

### POST /api/chat
Chat with the AI assistant about blog content
```json
{
  "message": "What posts are about Python?",
  "model_provider": "google",  // "google" or "openai"
  "session_id": "default"     // for maintaining conversation history
}
```

### POST /api/chat/clear
Clear chat history for a session
```json
{
  "session_id": "default"
}
```

## Architecture

### Core Components
- **ChatbotService**: Main service orchestrating RAG (Retrieval Augmented Generation)
- **BlogPostRetriever**: Custom retriever for filtering posts by tags and relevance
- **Document Loaders**: Load and process blog content from `/contents/` and `/QA/`
- **Vector Store**: FAISS-based similarity search over blog content
- **LLM Providers**: Support for Google Gemini and OpenAI models

### Data Sources
- `/contents/*.mdx` - Blog post content (auto-generated from markdown)
- `/QA/*.json` - Curated Q&A pairs for better responses
- `/backend/QA/metadata.json` - Blog metadata for context

### Key Features
- **RAG System**: Retrieves relevant blog content to answer questions
- **Multi-Model Support**: Switch between Google Gemini and OpenAI
- **Session Management**: Maintains conversation history per session
- **Ensemble Retrieval**: Combines multiple retrieval strategies
- **Document Processing**: Handles MDX content and metadata

### Tech Stack
- **FastAPI**: Web framework with automatic API documentation
- **LangChain**: RAG framework for LLM applications  
- **FAISS**: Vector similarity search
- **Google Gemini**: Primary LLM provider
- **OpenAI**: Alternative LLM provider

## Development Notes

### Project Structure
```
backend/
├── main.py                 # FastAPI app entry point
├── services/
│   ├── chatbot_service.py  # Main RAG orchestration
│   ├── loaders.py          # Document loading utilities
│   ├── prompts.py          # LLM prompt templates
│   └── retrievers.py       # Custom retrieval logic
├── QA/                     # Curated Q&A data
└── helpers.py              # Utility functions
```

### Adding New Features
- Extend `ChatbotService` for new RAG capabilities
- Add new endpoints in `main.py` following FastAPI patterns
- Update Q&A data in `/QA/` directory for improved responses
- Modify retrievers in `retrievers.py` for custom search logic

### Dependencies Management
- Uses `uv` for fast Python package management (recommended)
- Dependencies defined in `pyproject.toml`
- Lock file: `uv.lock` (commit this to version control)