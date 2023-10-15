/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const ProtectionSecurityComputerLockCheckmark = ({ color = "#A3AED0", className }) => {
  return (
    <svg
      className={`protection-security-computer-lock-checkmark ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M8.928 16L8.428 20"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M20 9V5.428C20 4.08705 18.9129 3 17.572 3H5.428C4.08705 3 3 4.08705 3 5.428V13.572C3 14.9129 4.08705 16 5.428 16H12"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M6.928 20H12"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <rect
        className="rect"
        height="5"
        rx="1.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        width="7"
        x="15"
        y="16"
      />
      <path
        className="path"
        d="M16.5 16V14.5C16.5 13.3954 17.3954 12.5 18.5 12.5V12.5C19.6046 12.5 20.5 13.3954 20.5 14.5V14.5V16"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M12 11.5H14"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M7.64656 11.85L8.98278 10.65"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M6.98278 11.2536L7.64656 11.85"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M12 7.5H16"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M7.64656 7.85L8.98278 6.65"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M6.98278 7.2536L7.64656 7.85"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

ProtectionSecurityComputerLockCheckmark.propTypes = {
  color: PropTypes.string,
};
