
import { ArrowUpRight, LoaderCircle, Sparkles } from "lucide-react";

export default function AnalyzeButton({
  onClick,
  loading,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="group flex w-full items-center justify-center gap-3 rounded-xl border border-violet-300/30 bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-[0_0_30px_rgba(124,92,255,0.16)] transition hover:from-violet-500 hover:to-indigo-500 hover:shadow-[0_0_36px_rgba(124,92,255,0.28)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      {loading ? (
        <>
          <LoaderCircle size={19} className="animate-spin" />
          Analyzing your profile...
        </>
      ) : (
        <>
          <Sparkles size={19} />
          Analyze my resume
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
}
