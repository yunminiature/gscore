import * as React from "react";

const SvgLogout = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.313 8.063 20.25 12l-3.938 3.938" />
    <path
      d="M9.75 12h10.5M9.75 20.25H4.5a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75h5.25"
      stroke="current"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgLogout;
