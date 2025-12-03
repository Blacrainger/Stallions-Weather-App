import type { SVGProps } from "react";

export function StallionsWeatherAppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 18L9 4h2l5 14" />
      <path d="M6.5 12h9" />
      <path d="M17 4h-4v4h4v4h-4" />
    </svg>
  );
}
