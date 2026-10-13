import { BrainCircuit, ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#272b3d] bg-[#090b14]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-15 w-15 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10">
            <img
              src="/PRG.png"
              alt="Resumind Logo"
              className="h-[30px] w-[30px] object-contain"
            />
          </div>

          <div>
            <div className="text-xl font-bold tracking-tight text-white">
              Resumind<span className="text-violet-400">.</span>
            </div>
            <div className="text-[11px] font-semibold tracking-[0.2em] text-[#969bb3]">
              Solution for your perfect resume
            </div>
          </div>
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#analyzer"
            className="hidden text-sm text-[#b2b5c8] transition hover:text-white sm:block"
          >
            Analyzer
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-[#272b3d] px-3 py-1.5 text-xs text-[#b2b5c8] md:flex">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-emerald-400" />
            AI workspace
          </div>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg border border-[#272b3d] p-2.5 text-[#b2b5c8] transition hover:border-violet-400/50 hover:text-white"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
