//import { LogoLarge } from "@/components/logo-large";
import { SubscribeInput } from "@/components/subscribe-input";
import Link from "next/link";

import { SocialLinks } from "./social-links";


export function Footer() {
  return (
    <footer className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 bg-[#fff] dark:bg-[#0C0C0C] overflow-hidden md:max-h-[820px]">
      <div className="container">
        <div className="flex justify-between items-center border-border border-b-[1px] pb-10 md:pb-16 mb-12">
          

          <span className="font-normal md:text-2xl text-right">
            Vestern | Your go-to finance app
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:w-6/12 justify-between leading-8">
            <div>
              <span className="font-medium">Dashboard</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/overview">Pricing</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/inbox">Market Overview</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/vault">AI-advisor</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/tracker">News</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/invoice">Portfolio</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/pricing">Learn</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/download">Download</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Resources</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="https://git.new/midday">Github</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/support">Support</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/policy">Privacy policy</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/branding">Branding</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/feature-request">Feature Request</Link>
                </li>
              </ul>
            </div>

            <div>
              <span>Company</span>
              <ul>
                <li className="transition-colors text-[#878787]">
                  <Link href="/story">Story</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/updates">Updates</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/open-startup">Open startup</Link>
                </li>
                <li className="transition-colors text-[#878787]">
                  <Link href="/oss-friends">OSS friends</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex md:items-end flex-col">
              <div className="flex items-start md:items-center flex-col md:flex-row space-y-6 md:space-y-0 mb-8">

                <SocialLinks />
              </div>

              <div className="mb-8">
                <SubscribeInput />
              </div>
              <div className="md:mr-0 mt-auto mr-auto">
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="dark:text-[#161616] text-[#F4F4F3] text-[500px] leading-none text-center pointer-events-none">
        Vestern
      </h5>
    </footer>
  );
}
