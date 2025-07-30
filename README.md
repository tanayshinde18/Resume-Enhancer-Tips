# 🧠 Resume Matcher AI – Compare Your Resume with Job Descriptions

![Resume Matcher AI](https://img.shields.io/badge/Built%20With-LangChain%20%7C%20Streamlit%20%7C%20Groq-brightgreen.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

A smart, lightweight Python app that uses AI to compare your resume (PDF) with any job description from the web. Get intelligent suggestions to improve your resume and boost your chances of getting shortlisted!

---

## 🚀 Features

- 🔍 **Extracts** text from resume PDFs
- 🌐 **Scrapes** job descriptions from URLs
- 🧠 **Compares** resume vs job using LLM (via Groq)
- ✅ **Gives actionable suggestions** to improve your resume
- 📊 **Displays a relevance score** between job and resume
- 🧪 Built using **LangChain**, **Groq**, and **Streamlit**

---

## 🧰 Tech Stack

| Layer        | Tool/Library                |
|--------------|-----------------------------|
| Frontend     | Streamlit                   |
| LLM Interface| LangChain + Groq (LLaMA 3)  |
| PDF Parsing  | PyMuPDF or PDFMiner         |
| Web Scraping | Requests + BeautifulSoup    |
| Deployment   | Docker / Streamlit Cloud (optional) |

---

🧠 How It Works (High Level)
Resume PDF text is extracted using PyMuPDF
Job description is scraped from the provided URL
LangChain routes both texts into a Groq-hosted LLaMA 3 LLM
LLM returns:
  Relevance score
  Suggested improvements

🛣️ Roadmap
 Add support for DOCX format
 Upload multiple job links
 Integration with LinkedIn Jobs API
 Save history of suggestions
