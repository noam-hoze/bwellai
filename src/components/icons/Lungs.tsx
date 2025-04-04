
import React from "react";
import { LucideProps } from "lucide-react";

export const Lungs = (props: LucideProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6.081 20C7.693 20 9 18.665 9 17.02V12c0-.552-.447-1-1-1V7.501c0-.539.168-1.066.48-1.505l1.333-1.88C10.266 3.402 11 3 11.765 3H14v17" />
    <path d="M17.92 20C16.307 20 15 18.665 15 17.02V12c0-.552.447-1 1-1V7.501c0-.539-.168-1.066-.48-1.505l-1.333-1.88C13.734 3.402 13 3 12.236 3H10" />
    <path d="M11 3v17" />
    <path d="M11 8H8" />
    <path d="M14 8h-3" />
    <path d="M9 12H5a2 2 0 100 4h.3c.5 0 .9.4.9.9a.1.1 0 01-.1.1H4" />
    <path d="M15 12h4a2 2 0 110 4h-.3c-.5 0-.9.4-.9.9a.1.1 0 00.1.1h2.1" />
  </svg>
);

export default Lungs;
