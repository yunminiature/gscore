import * as React from "react";
import {SVGProps} from "react";

const SvgUp = (props:SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m15.312 8.5-7-7-7 7"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgUp;
