import os

from dotenv import load_dotenv


load_dotenv()


GROQ_API_KEY = os.getenv("backend/src/GROQ_API_KEY", "")
GROQ_MODEL_NAME = os.getenv("GROQ_MODEL_NAME", "openai/gpt-oss-20b")

# Groq free-tier docs list openai/gpt-oss-20b at 8K TPM. These defaults keep
# one request comfortably below that limit while preserving useful context.
MAX_JOB_DESCRIPTION_CHARS = int(os.getenv("MAX_JOB_DESCRIPTION_CHARS", "12000"))
MAX_RESUME_CHARS = int(os.getenv("MAX_RESUME_CHARS", "10000"))
