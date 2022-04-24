import * as React from "react";

const SvgBasket = (props) => (
  <svg
    width={20}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 17a1 1 0 0 0 1-1v-2a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm-4 0a1 1 0 0 0 1-1v-2a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1Zm9-12h-1.38l-1.73-3.45a1 1 0 1 0-1.78.9L13.38 5H6.62l1.27-2.55a1 1 0 0 0-1.78-.9L4.38 5H3a3 3 0 0 0-.92 5.84l.74 7.46a3 3 0 0 0 3 2.7h8.38a3 3 0 0 0 3-2.7l.74-7.46A3 3 0 0 0 17 5Zm-1.81 13.1a1 1 0 0 1-1 .9H5.81a1 1 0 0 1-1-.9L4.1 11h11.8l-.71 7.1ZM17 9H3a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2Z"
      fill="#969696"
    />
  </svg>
);

export default SvgBasket;
