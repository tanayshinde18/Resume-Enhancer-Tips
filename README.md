# Resume Matcher AI

Resume Matcher AI is a Streamlit app that compares a PDF resume against a job description and returns AI-powered feedback using LangChain and Groq.

## Features

- Upload a PDF resume.
- Paste a job posting URL or enter the job description manually.
- Extract job description text from the web page.
- Extract resume text from the uploaded PDF.
- Generate a structured analysis with:
  - match score
  - missing skills and keywords
  - strong matches
  - actionable improvement suggestions
  - example rewritten resume bullets
- Uses `openai/gpt-oss-20b`, which is compatible with Groq free-tier usage.
- Trims job and resume text before analysis to stay friendly to free-tier token limits.

## Tech Stack

- Python
- Streamlit
- LangChain
- Groq
- BeautifulSoup
- PyMuPDF

## Setup

1. Create and activate a virtual environment.

```bash
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies.

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the project root.

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL_NAME=openai/gpt-oss-20b
MAX_JOB_DESCRIPTION_CHARS=12000
MAX_RESUME_CHARS=10000
```

`GROQ_MODEL_NAME` is optional. If omitted, the app uses `openai/gpt-oss-20b`.

The default text limits are intentionally conservative for Groq free-tier usage. Groq lists `openai/gpt-oss-20b` free limits as 30 requests per minute, 1,000 requests per day, 8,000 tokens per minute, and 200,000 tokens per day. The app caps the job description and resume text before sending them to the model so a normal analysis request remains comfortably below the token-per-minute limit.

## Run The App

```bash
streamlit run app.py
```

Open the local Streamlit URL in your browser, provide a job posting URL or paste a job description, upload a PDF resume, and click **Analyze Resume**.

## Run Tests

```bash
pytest
```

## Project Structure

```text
.
├── app.py              # Streamlit UI
├── src/
│   ├── analyzer.py     # Workflow orchestration
│   ├── chains.py       # LangChain + Groq structured analysis
│   ├── config.py       # Environment-based app settings
│   ├── resume_parser.py
│   ├── schemas.py      # Pydantic response models
│   ├── scraping.py
│   └── text_processing.py
├── tests/
├── requirements.txt
├── .env.example
└── README.md
```

## Notes

- Some job sites block scraping or render job descriptions with JavaScript. If a URL fails, try a different public job posting page.
- If scraping fails, use the manual job description input.
- Keep `.env` private. It is already ignored by `.gitignore`.

## Future Improvements

- Export the analysis as PDF or Markdown.
- Add richer section-by-section resume feedback.
- Add a downloadable optimized resume draft.
