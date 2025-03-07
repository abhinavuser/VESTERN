"use client";

import { Assistant } from "./assistant";
import { Tray } from "./tray";

export function SectionSix() {
  return (
    <section
      className="mt-[300px] mb-[250px] md:mt-24 md:mb-12 relative min-h-[800px]" // Added min-height
      id="assistant"
    >
      <Tray />
      <div className="absolute w-full h-full flex items-center justify-center flex-col top-8 xl:top-0">
        <h4 className="text-4xl mb-4 font-medium md:text-white">Assistant</h4>
        <p className="max-w-[790px] px-4 text-center text-sm md:text-white dark:text-[#878787] mb-12 md:mb-0">
          Ask Vestern anything and get tailored insights into your financial
          situation. Understand your biggest outgoings and incomings to get a
          better grasp on your financials to help you cut costs, find
          opportunities and build a longer runway.
        </p>

        <div className="mt-6 hidden xl:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={139}
            height={19}
            fill="none"
          >
            <path
              fill="white"
              d="M93.464 9.513c0-2.932 1.884-4.98 4.497-4.98s4.497 2.048 4.497 4.98c0 2.933-1.884 4.98-4.497 4.98s-4.497-2.047-4.497-4.98Zm7.267 0c0-2.097-1.144-3.46-2.77-3.46-1.626 0-2.77 1.357-2.77 3.46 0 2.103 1.144 3.46 2.77 3.46 1.626 0 2.77-1.357 2.77-3.46Zm6.571 4.98c-.914 0-1.587-.365-2.029-.887v3.163h-1.615V7.28h1.615v.752c.442-.527 1.115-.886 2.029-.886 1.98 0 3.107 1.67 3.107 3.672 0 2.002-1.133 3.673-3.107 3.673Zm-2.074-3.875v.415c0 1.306.751 2.046 1.749 2.046 1.172 0 1.806-.914 1.806-2.26 0-1.345-.634-2.26-1.806-2.26-.998 0-1.749.73-1.749 2.059Zm9.549 3.874c-2.019 0-3.432-1.491-3.432-3.673 0-2.18 1.402-3.672 3.364-3.672 1.963 0 3.135 1.547 3.135 3.487v.539h-4.951c.123 1.21.846 1.951 1.884 1.951.796 0 1.424-.404 1.643-1.133l1.384.527c-.499 1.24-1.614 1.98-3.027 1.98v-.006Zm-.079-5.988c-.835 0-1.48.499-1.721 1.452h3.241c-.012-.78-.499-1.452-1.52-1.452Zm4.362 5.842V7.281h1.615v.752a2.495 2.495 0 0 1 1.952-.886c1.48 0 2.366 1.02 2.366 2.546v4.653h-1.615v-4.182c0-.875-.348-1.509-1.239-1.509-.729 0-1.469.538-1.469 1.548v4.143h-1.615.005Zm10.665-9.66h1.952l3.661 9.66H133.6l-.836-2.209h-4.171l-.819 2.21h-1.71l3.661-9.662Zm.942 1.911-1.508 4.037h3.039l-1.536-4.037h.005Zm7.441-1.912v9.661h-1.721v-9.66h1.721ZM89.516 8.23a4.54 4.54 0 0 0 .207-1.88 4.433 4.433 0 0 0-.588-1.794 4.539 4.539 0 0 0-2.08-1.878 4.492 4.492 0 0 0-2.787-.292A4.472 4.472 0 0 0 80.892.883a4.527 4.527 0 0 0-4.317 3.13 4.471 4.471 0 0 0-1.727.762 4.46 4.46 0 0 0-1.262 1.407 4.506 4.506 0 0 0-.583 2.742c.1.954.499 1.85 1.144 2.563a4.542 4.542 0 0 0-.208 1.878 4.52 4.52 0 0 0 .589 1.794 4.539 4.539 0 0 0 2.08 1.879c.875.392 1.85.493 2.787.291a4.472 4.472 0 0 0 3.376 1.503c.958 0 1.895-.297 2.668-.863a4.536 4.536 0 0 0 1.649-2.271 4.471 4.471 0 0 0 1.727-.763 4.528 4.528 0 0 0 1.262-1.407c.482-.83.684-1.789.583-2.742a4.492 4.492 0 0 0-1.144-2.557Zm-6.706 9.425c-.892 0-1.587-.275-2.187-.78.028-.017.073-.039.106-.061l3.572-2.064a.556.556 0 0 0 .213-.213c.05-.09.079-.19.079-.292V9.21l1.508.875s.017.011.023.017c0 .005.005.017.01.022v4.172c0 1.89-1.575 3.364-3.324 3.364v-.005Zm-7.261-3.084a3.328 3.328 0 0 1-.399-2.254c.028.017.073.044.107.061l3.572 2.064c.09.05.19.078.291.078.101 0 .202-.028.292-.078l4.362-2.518v1.772c0 .006-.011.017-.017.023l-3.61 2.085a3.379 3.379 0 0 1-2.552.337 3.355 3.355 0 0 1-2.04-1.565l-.007-.005Zm-.943-7.8a3.346 3.346 0 0 1 1.75-1.474v4.25c0 .1.028.202.078.291.05.09.124.163.213.213l4.363 2.518-1.508.875s-.017.005-.023.01h-.028l-3.61-2.085a3.366 3.366 0 0 1-1.565-2.04 3.378 3.378 0 0 1 .33-2.552V6.77Z"
            />
            {/* ... rest of the SVG path */}
          </svg>
        </div>

        <div className="xl:mt-14 w-full flex justify-center scale-[0.50] lg:scale-[0.80] xl:scale-100 min-w-[720px]">
          <Assistant />
        </div>
      </div>

      <div>
        <div className="absolute right-12 top-[120px] hidden xl:flex flex-col space-y-8 text-center items-center">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={68}
              height={54}
              fill="none"
            >
              <path
                fill="#878787"
                d="M7.332 53.667c-1.833 0-3.403-.653-4.708-1.959C1.318 50.404.665 48.834.665 47V7c0-1.833.653-3.403 1.959-4.708C3.929.986 5.499.333 7.332.333h20L33.999 7h26.666c1.834 0 3.403.653 4.709 1.959 1.305 1.305 1.958 2.875 1.958 4.708V47c0 1.834-.653 3.403-1.958 4.709-1.306 1.305-2.875 1.958-4.709 1.958H7.332Z"
              />
            </svg>
            <span className="text-sm mt-1 block">Misc</span>
          </div>

          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={68}
              height={54}
              fill="none"
            >
              <path
                fill="#878787"
                d="M7.332 53.667c-1.833 0-3.403-.653-4.708-1.959C1.318 50.404.665 48.834.665 47V7c0-1.833.653-3.403 1.959-4.708C3.929.986 5.499.333 7.332.333h20L33.999 7h26.666c1.834 0 3.403.653 4.709 1.959 1.305 1.305 1.958 2.875 1.958 4.708V47c0 1.834-.653 3.403-1.958 4.709-1.306 1.305-2.875 1.958-4.709 1.958H7.332Z"
              />
            </svg>
            <span className="text-sm mt-1 block">untitled</span>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={80}
              height={80}
              fill="none"
            >
              <path fill="#1D1D1D" d="M0 0h80v80H0z" />
              <path fill="#F5F5F3" d="M18 11h44v57H18z" />
            </svg>
            <span className="text-sm mt-1 block">invoice.pdf</span>
          </div>
        </div>

        {/* Empty div to maintain spacing */}
        <div className="w-full h-[800px] bg-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}