/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const UserGroupUser = ({ color = "#A3AED0", className }) => {
  return (
    <svg
      className={`user-group-user ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M20.7925 9.52352C21.5825 10.3136 21.5825 11.5944 20.7925 12.3845C20.0025 13.1745 18.7216 13.1745 17.9316 12.3845C17.1415 11.5944 17.1415 10.3136 17.9316 9.52352C18.7216 8.73349 20.0025 8.73349 20.7925 9.52352"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M14.2026 5.91236C15.4191 7.12884 15.4191 9.10115 14.2026 10.3176C12.9861 11.5341 11.0138 11.5341 9.79732 10.3176C8.58084 9.10116 8.58084 7.12885 9.79732 5.91236C11.0138 4.69588 12.9861 4.69588 14.2026 5.91236"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M6.06848 9.52352C6.85851 10.3136 6.85851 11.5944 6.06848 12.3845C5.27845 13.1745 3.99756 13.1745 3.20753 12.3845C2.4175 11.5944 2.4175 10.3136 3.20753 9.52352C3.99756 8.73349 5.27845 8.73349 6.06848 9.52352"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M23 19V17.904C23 16.523 21.881 15.404 20.5 15.404H19.699"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M1 19V17.904C1 16.523 2.119 15.404 3.5 15.404H4.301"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M17.339 19V17.399C17.339 15.466 15.772 13.899 13.839 13.899H10.16C8.227 13.899 6.66 15.466 6.66 17.399V19"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

UserGroupUser.propTypes = {
  color: PropTypes.string,
};