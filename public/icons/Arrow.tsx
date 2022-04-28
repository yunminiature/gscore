import * as React from "react";
import { SVGProps } from "react";

const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      filter="url(#Arrow_svg__a)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.46 1.54 3 10l8.46 8.46" stroke="current" />
      <path d="M3 10h18" stroke="#current" />
    </g>
    <defs>
      <filter
        id="Arrow_svg__a"
        x={-2}
        y={0.539}
        width={28}
        height={26.922}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4357_1266"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4357_1266"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SvgArrow;
