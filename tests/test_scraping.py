from src.scraping import is_valid_url, scrape_job_description


def test_is_valid_url_accepts_http_and_https():
    assert is_valid_url("https://example.com/job")
    assert is_valid_url("http://example.com/job")


def test_is_valid_url_rejects_invalid_values():
    assert not is_valid_url("")
    assert not is_valid_url("example.com/job")
    assert not is_valid_url("ftp://example.com/job")


def test_scrape_job_description_returns_empty_for_invalid_url():
    assert scrape_job_description("not-a-url") == ""
