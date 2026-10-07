import streamlit as st
from src.analyzer import analyze_resume_against_job_text, analyze_resume_against_job_url

st.set_page_config(page_title="Resume Matcher AI", layout="centered")

with st.sidebar:
    st.header("About")
    st.write("🚀 Upload your resume and a job link to get instant feedback powered by AI.")
    st.markdown("Made with 💡 using [LangChain](https://www.langchain.com/), [Groq](https://groq.com/), and [Streamlit](https://streamlit.io/).")


st.title("📄 Resume Matcher AI")
st.markdown("Upload your resume and provide a job description to receive **AI-powered** suggestions for improvement.")

st.markdown("## 🔧 Input")
input_method = st.radio(
    "Job Description Source",
    ["Job URL", "Paste job description"],
    horizontal=True,
)

job_url = ""
job_description_text = ""
if input_method == "Job URL":
    job_url = st.text_input("🔗 Job Posting URL")
else:
    job_description_text = st.text_area("Job Description", height=240)

resume_file = st.file_uploader("📎 Upload Your Resume (PDF only)", type=["pdf"])


if st.button("🚀 Analyze Resume", key="analyze_button"):
    has_job_input = bool(job_url.strip() or job_description_text.strip())
    if not has_job_input or not resume_file:
        st.warning("⚠️ Please provide a job description and upload a PDF file.")
    else:
        with st.spinner("🔍 Analyzing... Please wait."):
            if input_method == "Job URL":
                result = analyze_resume_against_job_url(job_url, resume_file)
            else:
                result = analyze_resume_against_job_text(job_description_text, resume_file)

        if "error" in result:
            st.error(f"❌ {result['error']}")
        else:
            st.success("✅ Analysis Complete!")

            match_score = result.get("match_score")
            missing_skills = result.get("missing_skills", [])
            strong_matches = result.get("strong_matches", [])
            suggestions = result.get("suggestions", [])
            rewritten_bullets = result.get("rewritten_bullets", [])

            if match_score is not None:
                normalized_score = max(0, min(100, int(match_score)))
                st.metric("Resume Match Score", f"{normalized_score}%")
                st.progress(normalized_score / 100)

            if missing_skills:
                st.markdown("### 🧠 Missing Skills / Keywords")
                st.info("We couldn't find the following key skills from the job description in your resume:")
                st.markdown("\n".join([f"- **{skill}**" for skill in missing_skills]))
            else:
                st.success("🎯 Great job! No major missing skills found.")

            if strong_matches:
                st.markdown("### ✅ Strong Matches")
                st.markdown("\n".join([f"- {match}" for match in strong_matches]))

            if suggestions:
                st.markdown("### 🛠️ Suggested Improvements")
                st.markdown("\n".join([f"- {suggestion}" for suggestion in suggestions]))

            if rewritten_bullets:
                st.markdown("### ✍️ Example Resume Bullets")
                st.markdown("\n".join([f"- {bullet}" for bullet in rewritten_bullets]))


# Footer
st.markdown("---")
st.caption("Built with ❤️ by Tanay using Streamlit, LangChain, and Groq.")
