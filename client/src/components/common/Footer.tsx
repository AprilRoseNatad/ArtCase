import { Link } from "react-router-dom";
import artcaseLogoW from "@/assets/images/artcaseLogoW.png";

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Footer Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* App Brand & Hero Punchline */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={artcaseLogoW}
                alt="ArtCase Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold tracking-wider text-white">
                ArtCase
              </span>
            </Link>

            {/* Hero Punchline */}
            <p className="mt-4 max-w-[320px] text-sm leading-relaxed text-zinc-400">
              ArtCase is a web-based digital arts showcase and recognition platform.
            </p>
          </div>

          {/* Nav Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Connect */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Contact us:
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li>
                  <a href="mailto:support@artcase.com" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <svg className="h-4 w-4 stroke-zinc-400 fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    Email
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Community
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
                <li><Link to="/guidelines" className="transition-colors hover:text-white">Guidelines</Link></li>
                <li><Link to="/support" className="transition-colors hover:text-white">Help Center</Link></li>
                <li><Link to="/developers" className="transition-colors hover:text-white">Developers</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
                <li><Link to="/terms" className="transition-colors hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="transition-colors hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} ArtCase. All rights reserved.</p>
          {/* 
          <p className="flex items-center gap-1.5">
            Built for creators with <span className="text-sm leading-none">❤️‍🩹</span>
          </p>
          */}
        </div>
      </div>
    </footer>
  );
}