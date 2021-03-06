import * as React from "react";
import { SVGProps } from "react";

const SvgCheckBox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1.664 6.905 3.62 3.62 9.052-9.05"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgCheckBox;
