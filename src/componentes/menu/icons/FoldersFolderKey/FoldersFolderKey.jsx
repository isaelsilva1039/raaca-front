/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const FoldersFolderKey = ({ className,color ='#323232' }) => {
  return (
    <svg
      className={`folders-folder-key ${className}`}
      fill="none"
      height="27"
      viewBox="0 0 24 27"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M4.72049 17.7045L3.30875 19.2763C3.12182 19.4844 3.01685 19.7663 3.01685 20.0602V21.076C3.01685 21.6891 3.46456 22.1862 4.01685 22.1862H4.9337C5.1994 22.1862 5.45419 22.0688 5.64181 21.8599L7.04894 20.2932"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M4.72046 17.7045C4.37318 16.155 4.99959 14.5386 6.25174 13.7531C7.50389 12.9677 9.07419 13.2061 10.0904 14.3359C11.1067 15.4658 11.3192 17.2095 10.61 18.5986C9.9008 19.9877 8.44406 20.6809 7.04891 20.2932"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M7.86689 16.8571C7.86686 16.8878 7.84446 16.9126 7.81687 16.9126C7.78927 16.9126 7.7669 16.8877 7.76689 16.8571C7.76689 16.8264 7.78924 16.8016 7.81683 16.8016C7.83012 16.8015 7.84286 16.8074 7.85225 16.8178C7.86164 16.8282 7.86691 16.8424 7.86689 16.8571"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M12 22.2049H19C20.1046 22.2049 21 21.2107 21 19.9844V9.92558C21 8.69924 20.1046 7.70509 19 7.70509H12.5291C12.1981 7.70509 11.8886 7.52324 11.7024 7.2194L10.2974 4.92668C10.1111 4.62282 9.80157 4.44096 9.47054 4.44098H5C3.89543 4.44098 3 5.43512 3 6.66147V12.2127"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
