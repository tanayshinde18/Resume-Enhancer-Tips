
import requests
from bs4 import BeautifulSoup
import fitz  # PyMuPDF


def scrape_job_description(url: str) -> str:
    """
    Scrapes the job description text from a given URL.
    
    Args:
        url (str): Link to the job post.

    Returns:
        str: Extracted job description text.
    """
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Modify this according to the website's structure
        job_text = ''
        for tag in soup.find_all(['p', 'li']):
            job_text += tag.get_text(separator=' ', strip=True) + ' '

        return job_text.strip()

    except Exception as e:
        print(f"[ERROR] Failed to scrape job description: {e}")
        return ""


def extract_text_from_resume(file) -> str:
    """
    Extracts text content from a PDF resume.

    Args:
        file (BytesIO or UploadedFile): Resume PDF file.

    Returns:
        str: Extracted text from PDF.
    """
    try:
        doc = fitz.open(stream=file.read(), filetype="pdf")
        text = ''
        for page in doc:
            text += page.get_text()
        doc.close()

        return text.strip()

    except Exception as e:
        print(f"[ERROR] Failed to extract resume text: {e}")
        return ""


