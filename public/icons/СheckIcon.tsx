import * as React from "react";
import {SVGProps} from "react";

const СheckIcon = (props:SVGProps<SVGSVGElement>) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26 13c0 7.18-5.82 13-13 13S0 20.18 0 13 5.82 0 13 0s13 5.82 13 13Zm-6.526-3.293a1 1 0 0 0-1.415-1.414l-7.697 7.697-2.655-2.654a1 1 0 0 0-1.414 1.414l3.362 3.362a1 1 0 0 0 1.414 0l8.405-8.405Z"
      fill="#fff"
    />
  </svg>
);

export default СheckIcon;