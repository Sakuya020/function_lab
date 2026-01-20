"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio");
  if (isStudio) return null;
  return (
    <footer className="w-full padding-x footer-text">
      <div className="flex justify-between mb-[200px] md:mb-[300px] lg:mb-[400px] pt-[6px] md:pt-[10px] lg:pt-[20px] border-t border-secondary">
        <div>
          <Link
            href="mailto:hi@functionlab.design"
            target="_blank"
            className="redirect-link inline-flex items-center gap-2 transition-colors duration-300"
          >
            <span className="redirect-text transition-colors duration-300">
              Get in touch
            </span>
            <span className="redirect-arrow inline-flex transition-transform duration-300 translate-x-0">
              →
            </span>
          </Link>
        </div>
        <div className="underline underline-offset-2 md:underline-offset-3 lg:underline-offset-7 redirect-link">
          <Link
            className="redirect-text transition-colors duration-300"
            href="mailto:hi@functionlab.design"
            target="_blank"
          >
            hi@functionlab.design
          </Link>
        </div>
      </div>
      {/* phone */}
      <div className="md:hidden flex justify-between items-center h-[65px] border-t">
        <div>© Function Lab 2026</div>
        <div>
          <Link
            href="https://www.instagram.com/function_lab_design/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block underline underline-offset-2 hover:text-secondary transition-colors duration-300"
          >
            Instagram
          </Link>
          <Link
            href="mailto:hi@functionlab.design"
            target="_blank"
            className="underline underline-offset-2 hover:text-secondary transition-colors duration-300"
          >
            Get in touch
          </Link>
        </div>
      </div>
      {/* tablet and desktop */}
      <div className="hidden md:grid grid-cols-12 items-center h-[89px] border-t lg:text-[22px] lg:leading-[28px]">
        <div className="col-span-6 lg:col-span-9">© Function Lab 2026</div>
        {/* 占据剩余空间 */}
        <div className="col-start-* col-span-6 lg:col-span-3 flex justify-between">
          <Link
            href="https://www.instagram.com/function_lab_design/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block underline md:underline-offset-3 hover:text-secondary transition-colors duration-300"
          >
            Instagram
          </Link>
          <Link
            href="mailto:hi@functionlab.design"
            target="_blank"
            className="underline md:underline-offset-3 hover:text-secondary transition-colors duration-300"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
