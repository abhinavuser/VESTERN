import { DynamicImage } from "@/components/dynamic-image";
import { SubscribeInput } from "@/components/subscribe-input";
import type { Metadata } from "next";
import Image from "next/image";
import engineSDK from "public/engine-sdk.png";
import engineLight from "public/engine-ui-light.png";
import engineDark from "public/engine-ui.png";

export const metadata: Metadata = {
  title: "Engine",
  description:
    "Vestern engine streamlines banking integrations with a single API effortlessly connecting to multiple providers and get one unified format.",
};

export default function Page() {
  return (
    <div className="w-full dark:bg-[#0C0C0C] flex flex-col items-center justify-center mt-24">
      <h1 className="text-[100px] md:text-[170px] font-medium text-center text-primary relative z-20 leading-none">
        One API
      </h1>

      <h2 className="text-[100px] md:text-[170px] leading-none text-dotted text-center">
        to rule them all
      </h2>

      <div className="mb-2 mt-6">
        <p className="text-[#707070] mt-4 mb-8 text-center max-w-[550px]">
          Vestern engine streamlines banking integrations with a single API
          effortlessly connecting to multiple providers and get one unified
          format.
        </p>
      </div>

      <SubscribeInput />

      <div className="text-center flex flex-col items-center mt-[140px]">
        
        

        
      </div>

      <div className="text-center flex flex-col items-center mt-24">
        
        

        
      </div>
    </div>
  );
}
