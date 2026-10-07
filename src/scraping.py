from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

from src.text_processing import clean_text


REQUEST_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0 Safari/537.36"
    )
}


def is_valid_url(url: str) -> bool:
    parsed = urlparse((url or "").strip())
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def scrape_job_description(url: str) -> str:
    if not is_valid_url(url):
        print("[ERROR] Invalid job URL.")
        return ""

    try:
        response = requests.get(url.strip(), headers=REQUEST_HEADERS, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        for tag in soup(["script", "style", "noscript", "header", "footer", "nav"]):
            tag.decompose()

        selector_candidates = [
            "[class*='job-description']",
            "[id*='job-description']",
            "[class*='description']",
            "[id*='description']",
            "[class*='job-details']",
            "[id*='job-details']",
            "main",
            "article",
        ]

        text_blocks = []
        for selector in selector_candidates:
            for element in soup.select(selector):
                text = clean_text(element.get_text(separator=" ", strip=True))
                if len(text) > 150:
                    text_blocks.append(text)

        if not text_blocks:
            for tag in soup.find_all(["h1", "h2", "h3", "p", "li"]):
                text = clean_text(tag.get_text(separator=" ", strip=True))
                if len(text) > 20:
                    text_blocks.append(text)

        unique_blocks = list(dict.fromkeys(text_blocks))
        job_text = clean_text(" ".join(unique_blocks))
        return job_text if len(job_text) >= 150 else ""
    except Exception as e:
        print(f"[ERROR] Failed to scrape job description: {e}")
        return ""
