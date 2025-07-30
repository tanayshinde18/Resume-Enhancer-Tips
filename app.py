import streamlit as st
from main import analyze_resume_against_job

st.set_page_config(page_title="Resume Matcher AI", layout="centered")

with st.sidebar:
    st.header("About")
    st.write("🚀 Upload your resume and a job link to get instant feedback powered by AI.")
    st.markdown("Made with 💡 using [LangChain](https://www.langchain.com/), [Groq](https://groq.com/), and [Streamlit](https://streamlit.io/).")


st.title("📄 Resume Matcher AI")
st.markdown("Upload your resume and paste a job link to receive **AI-powered** suggestions for improvement.")

st.markdown("## 🔧 Input")
job_url = st.text_input("🔗 Job Posting URL")
resume_file = st.file_uploader("📎 Upload Your Resume (PDF only)", type=["pdf"])


if st.button("🚀 Analyze Resume", key="analyze_button"):
    if not job_url or not resume_file:
        st.warning("⚠️ Please enter a valid job URL and upload a PDF file.")
    else:
        with st.spinner("🔍 Analyzing... Please wait."):
            result = analyze_resume_against_job(job_url, resume_file)

        if "error" in result:
            st.error(f"❌ {result['error']}")
        else:
            st.success("✅ Analysis Complete!")

            # Display Missing Skills
            missing_skills = result.get("missing_skills", [])
            suggestions = result.get("suggestions", [])

            if missing_skills:
                st.markdown("### 🧠 Missing Skills / Keywords")
                st.info("We couldn't find the following key skills from the job description in your resume:")
                st.markdown("\n".join([f"- **{skill}**" for skill in missing_skills]))
            else:
                st.success("🎯 Great job! No major missing skills found.")

           
# Footer
st.markdown("---")
st.caption("Built with ❤️ by Tanay using Streamlit, LangChain, and Groq.")
