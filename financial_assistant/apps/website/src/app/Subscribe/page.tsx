import { Testimonials } from "@/components/testimonials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@midday/ui/accordion";
import { Button } from "@midday/ui/button";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pro Version",
  description: "Vestern's Pro pack",
};

export default function Page() {
  return (
    <>
      <div className="container">
        <div>
          <div className="flex items-center flex-col text-center relative">
            <h1 className="mt-24 font-medium text-center text-5xl mb-4">
               Subscribe to unlock ALL Profit-Driven features 
            </h1>
            <p className="text-md text-muted-foreground mb-12 max-w-2xl">
              start your 14-day trial
              today!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mt-8">
              {/* Starter Plan */}
              <div className="flex flex-col p-8 border bg-background">
                <h2 className="text-xl mb-2 text-left">Current Plan</h2>
                <div className="mt-4 flex items-baseline">
                  <span className="text-[40px] font-medium tracking-tight">
                    Free
                  </span>
                  <span className="ml-1 text-2xl font-medium">/mo</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Excl. VAT
                  </span>
                </div>
                <p className="mt-4 text-[#878787] text-left text-sm">
                  For everyone
                </p>

                <div className="mt-8">
                  <h3 className="text-xs font-medium uppercase tracking-wide text-left text-[#878787] font-mono">
                    INCLUDING
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">
                        Upto 200 prompts every 2 weeks
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">1 Connected bank acc</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">Market Analysis</span>
                    </li>
                    
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">Learn (Premium)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">Customer management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">Assistant</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">1 user only</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 border-t-[1px] border-border pt-8">
                  <Link href="https://app.midday.ai">
                    <Button
                      variant="outline"
                      className="w-full h-12 border border-primary"
                    >
                      Start 14 day trial
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col p-8 border border-primary bg-background relative">
                <div className="absolute top-0 right-0 mr-4 mt-4 rounded-full text-[#878787] text-[9px] font-normal border px-2 py-1 font-mono">
                  Limited offer
                </div>
                <h2 className="text-xl text-left mb-2">Pro Version</h2>
                <div className="mt-1 flex items-baseline">
                  <span className="text-[40px] font-medium tracking-tight line-through text-[#878787]">
                    Rs.399
                  </span>

                  <span className="ml-1 text-[40px] font-medium tracking-tight">
                    299
                  </span>

                  <span className="ml-1 text-xl font-medium">/mo</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    Excl. VAT
                  </span>
                </div>
                <p className="mt-4 text-[#878787] text-left text-sm">
                  
                </p>

                <div className="mt-8">
                  <h3 className="text-xs font-medium uppercase tracking-wide text-left text-[#878787] font-mono">
                    INCLUDING
                  </h3>
                  <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">All Features in Starter</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">
                        Unlimted prompts
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">5 Connected banks</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">Access to VNews</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">Premium Assistant</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">3 users</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-11 border-t border-border pt-20">
                  <Link href="https://app.midday.ai">
                    <Button className="w-full h-12">Start 14 day trial</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full max-w-5xl items-center justify-between">
              <p className="mt-4 text-xs text-muted-foreground font-mono">
                14 day trial (No credit card required)
              </p>

              <p className="mt-4 text-xs text-muted-foreground font-mono hidden md:block">
                Need more? Feel free to contact us
              </p>
            </div>
          </div>
        </div>

        <div className="container max-w-[800px] mt-32">
          <div>
            <div className="text-center">
              <h4 className="text-4xl">Frequently asked questions</h4>
            </div>

            <Accordion type="single" collapsible className="w-full mt-10 mb-48">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="truncate">Can I trust Vestern's AI functionalities?</span>
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely, we have trained the best LLM to provide you top-notch suggestions preffered for your goals with minimal loss risks. Also our world class Cyber-security system keeps everything encrypted.{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://git.new/midday"
                    className="underline"
                  >
                    here
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              
              
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <span className="truncate max-w-[300px] md:max-w-full">
                    What are your data privacy & security policies?
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  We take data privacy very seriously and implement
                  state-of-the-art security measures to protect your data. We
                  are also actively working towards SOC 2 Type II compliance. We
                  encrypt data at rest, and sensitive data on row level. We also
                  support 2FA authentication.
                  <Link href="/policy" className="ml-1 underline">
                    midday.ai/policy
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <span className="truncate max-w-[300px] md:max-w-full">
                    Can I cancel my subscription at any time?
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your subscription at any time. If you
                  cancel your subscription, you will still be able to use Vestern
                  until the end of your billing period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  <span className="truncate max-w-[300px] md:max-w-full">
                    I have more questions about Vestern. How can I get in
                    touch?
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Sure, we're happy to answer any questions you might have. Just
                  send us an email at{" "}
                  <a href="mailto:support@vestern.finance" className="underline">
                    support@vestern.finance.in
                  </a>{" "}
                  and we'll get back to you as soon as possible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <Testimonials />
    </>
  );
}
