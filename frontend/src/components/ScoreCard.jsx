
import { Target, TrendingUp } from "lucide-react";

export default function ScoreCard({ score }) {
  const value = Number(score);
  const valid = Number.isFinite(value) && value >= 0 && value <= 100;

  if (!valid) {
    return (
      <div className="panel p-5 text-sm text-amber-200">
        The API did not return a valid match score.
      </div>
    );
  }

  const circumference = 2 * Math.PI * 43;
  const offset = circumference * (1 - value / 100);

  return (
    <section className="panel relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-5">
          <div className="relative h-32 w-32 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50" cy="50" r="43"
                fill="none"
                stroke="#292d40"
                strokeWidth="7"
              />
              <circle
                cx="50" cy="50" r="43"
                fill="none"
                stroke="#9b8aff"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{value}</span>
              <span className="text-xs text-[#969bb3]">out of 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-violet-300">
              <Target size={16} />
              RESUME MATCH SCORE
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Your compatibility overview
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#969bb3]">
              A summary of how your resume aligns with the supplied job
              description, based on your AI analysis.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#303349] bg-[#0b0e18] p-4 sm:min-w-44">
          <TrendingUp size={20} className="text-emerald-300" />
          <p className="mt-3 text-sm font-medium text-white">
            Match overview
          </p>
          <p className="mt-1 text-xs leading-5 text-[#969bb3]">
            Use the detailed skill gaps and recommendations below to decide
            where to focus.
          </p>
        </div>
      </div>
    </section>
  );
}
