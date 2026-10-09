
import { useState } from "react";

import {
  Activity,
  ArrowDown,
  CheckCircle2,
  CircleAlert,
  FileSearch,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import ResumeUpload from "../components/ResumeUpload";
import JobInput from "../components/JobInput";
import AnalyzeButton from "../components/AnalyzeButton";
import ScoreCard from "../components/ScoreCard";
import SkillsSection from "../components/SkillsSection";
import SuggestionsSection from "../components/SuggestionsSection";
import BulletSuggestions from "../components/BulletSuggestions";

import {
  analyzeResumeWithText,
  analyzeResumeWithUrl,
} from "../services/api";

export default function Home() {
  const [resume, setResume] = useState(null);
  const [mode, setMode] = useState("url");
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    if (!resume) {
      setError("Upload your resume before starting the analysis.");
      return;
    }

    if (mode === "url" && !jobUrl.trim()) {
      setError("Enter the URL of the job posting you want to analyze.");
      return;
    }

    if (mode === "text" && !jobDescription.trim()) {
      setError("Paste a job description before starting the analysis.");
      return;
    }

    setLoading(true);

    try {
      const analysis =
        mode === "url"
          ? await analyzeResumeWithUrl(resume, jobUrl.trim())
          : await analyzeResumeWithText(
              resume,
              jobDescription.trim()
            );

      if (
        !analysis ||
        typeof analysis !== "object" ||
        analysis.error
      ) {
        throw new Error(
          analysis?.error ||
            "The server returned an invalid analysis."
        );
      }

      setResult(analysis);

      window.setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    } catch (err) {
      setError(
        err?.message ||
          "We couldn't analyze your resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResume(null);
    setJobUrl("");
    setJobDescription("");
    setMode("url");
    setResult(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090b14] text-[#f4f3ff]">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-48 left-1/4 h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute right-[-150px] top-[35%] h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-[130px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
          {/* Hero */}
          <section className="relative mb-10 overflow-hidden rounded-3xl border border-[#29263e] bg-[#0d101c] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div
              aria-hidden="true"
              className="grid-pattern pointer-events-none absolute inset-0 opacity-40"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-40 left-1/3 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[100px]"
            />

            <div className="relative z-10 max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/[0.07] px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-violet-200 sm:text-xs">
                <Sparkles size={14} />
                YOUR PERSONAL AI CAREER ANALYST
              </div>

              <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Make every
                <br className="hidden sm:block" /> application{" "}
                <span className="bg-linear-to-r from-violet-300 via-purple-300 to-cyan-200 bg-clip-text text-transparent">
                  count.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#a4a8bd] sm:text-base sm:leading-8">
                Turn your resume into a strategic advantage.
                Discover your job match, identify skill gaps,
                and get actionable AI-powered recommendations
                tailored to your target role.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#a4a8bd] sm:text-sm">
                <span className="flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-300"
                  />
                  Privacy-conscious workflow
                </span>

                <span className="flex items-center gap-2">
                  <Target
                    size={16}
                    className="text-violet-300"
                  />
                  Job-specific insights
                </span>

                <span className="flex items-center gap-2">
                  <WandSparkles
                    size={16}
                    className="text-cyan-300"
                  />
                  AI-assisted improvements
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-10 flex flex-wrap items-center gap-3 border-t border-[#292b40] pt-5 text-xs text-[#858ba5]">
              <Activity
                size={16}
                className="text-violet-300"
              />
              <span>Resume analysis workspace</span>
              <span className="text-[#454960]">/</span>
              <span>PDF + job requirements</span>
            </div>
          </section>

          {/* Analyzer heading */}
          <section className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-violet-300">
                GET STARTED
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Build your job match report
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#969bb3]">
                Provide your resume and the job requirements
                to generate your personalized analysis.
              </p>
            </div>

            <div className="hidden items-center gap-2 self-start rounded-full border border-[#272b3d] bg-[#111420] px-3 py-2 text-xs text-[#969bb3] sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Ready for analysis
            </div>
          </section>

          {/* Input cards */}
          <section
            id="analyzer"
            className="grid scroll-mt-24 gap-5 lg:grid-cols-2"
          >
            {/* Resume upload */}
            <div className="panel h-fit rounded-2xl p-5 transition-colors duration-300 hover:border-violet-400/25 sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <FileSearch size={21} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-violet-300">
                    STEP 01
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    Upload your resume
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#969bb3]">
                    Start with your latest PDF resume.
                  </p>
                </div>
              </div>

              <ResumeUpload
                file={resume}
                setFile={setResume}
              />

              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#272b3d] bg-[#0b0e18] p-3.5 text-xs leading-5 text-[#969bb3]">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-300"
                />

                <p>
                  Upload only the resume you want to analyze.
                  Avoid including unnecessary sensitive
                  personal information.
                </p>
              </div>
            </div>

            {/* Job input */}
            <div className="panel h-fit rounded-2xl p-5 transition-colors duration-300 hover:border-cyan-300/25 sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
                  <Target size={21} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan-300">
                    STEP 02
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    Choose your target role
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#969bb3]">
                    Enter a job posting URL or paste its
                    description.
                  </p>
                </div>
              </div>

              <JobInput
                mode={mode}
                setMode={setMode}
                jobUrl={jobUrl}
                setJobUrl={setJobUrl}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
              />
            </div>
          </section>

          {/* Errors */}
          <section className="mx-auto mt-6 max-w-3xl">
            {error && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-3 rounded-xl border border-rose-400/25 bg-rose-400/[0.08] p-4 text-sm leading-6 text-rose-200"
              >
                <CircleAlert
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <p>{error}</p>
              </div>
            )}

            <AnalyzeButton
              onClick={handleAnalyze}
              loading={loading}
              disabled={!resume || loading}
            />

            <p className="mt-3 text-center text-xs leading-5 text-[#777d95]">
              AI-generated insights are suggestions, not
              guarantees of job suitability or employment.
            </p>
          </section>

          {/* Loading state */}
          {loading && (
            <section
              role="status"
              aria-live="polite"
              className="panel mx-auto mt-10 max-w-2xl rounded-2xl p-8 text-center sm:p-10"
            >
              <div className="accent-glow mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Sparkles
                  size={26}
                  className="animate-pulse-glow"
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-white">
                Resumind is analyzing your profile
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#969bb3]">
                Comparing your resume with the target role
                and preparing personalized insights. This
                may take a little while.
              </p>

              <div className="mx-auto mt-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-[#222438]">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-linear-to-r from-violet-400 to-cyan-300" />
              </div>
            </section>
          )}

          {/* Analysis results */}
          {result && !loading && (
            <section
              id="results"
              aria-live="polite"
              className="mt-16 scroll-mt-24 space-y-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-emerald-300">
                    <CheckCircle2 size={15} />
                    ANALYSIS COMPLETE
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Your intelligence report
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#969bb3]">
                    Understand your strengths, identify
                    skill gaps, and discover opportunities
                    to improve your resume for this role.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetAnalysis}
                  className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#303349] bg-[#111420] px-4 py-2.5 text-sm text-[#c4c5d5] transition hover:border-violet-400/50 hover:bg-violet-500/[0.07] hover:text-white"
                >
                  New analysis
                  <ArrowDown
                    size={15}
                    className="rotate-90"
                  />
                </button>
              </div>

              <ScoreCard score={result.match_score} />

              <SkillsSection
                strongMatches={result.strong_matches}
                missingSkills={result.missing_skills}
              />

              <SuggestionsSection
                suggestions={result.suggestions}
              />

              <BulletSuggestions
                bullets={result.rewritten_bullets}
              />
            </section>
          )}

          {/* Footer */}
          <footer className="mt-20 border-t border-[#272b3d] pt-6">
            <div className="flex flex-col gap-3 text-xs leading-5 text-[#777d95] sm:flex-row sm:items-center sm:justify-between">
              <p>
                <span className="font-semibold text-[#b8b5d0]">
                  resumind.
                </span>{" "}
                AI Career Intelligence
              </p>

              <p>
                Built to help you put your experience into
                perspective.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
