
import React from "react";

type IconType = {
  currentColor: string;
};

const CancelIcon = ({ currentColor }: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke={currentColor}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="cursor-pointer hidden lg:block "
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const CopyIcon = ({ currentColor }: IconType) => (
  <svg
    stroke={currentColor}
    className="cursor-pointer"
    fill={currentColor}
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1.5rem"
    width="1.5rem"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 0 1-1.75 1.75H8.774a1.75 1.75 0 0 1-1.75-1.75Zm1.75-.25a.25.25 0 0 0-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25Z"></path>
    <path d="M1.995 10.749a1.75 1.75 0 0 1 1.75-1.751H5.25a.75.75 0 1 1 0 1.5H3.745a.25.25 0 0 0-.25.25L3.5 20.25c0 .138.111.25.25.25h9.5a.25.25 0 0 0 .25-.25v-1.51a.75.75 0 1 1 1.5 0v1.51A1.75 1.75 0 0 1 13.25 22h-9.5A1.75 1.75 0 0 1 2 20.25l-.005-9.501Z"></path>
  </svg>
);

const LockIcon = ({ currentColor }: IconType) => (
  <svg
    stroke={currentColor}
    fill={currentColor}
    className="cursor-pointer"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1.5rem"
    width="1.5rem"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
  </svg>
);

const OpenIcon = ({ currentColor }: IconType) => (
  <svg
    stroke="currentColor"
    fill={currentColor}
    strokeWidth="0"
    viewBox="0 0 24 24"
    className="cursor-pointer"
    height="1.5rem"
    width="1.5rem"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2z"></path>
  </svg>
);

const DragIcon = ({ currentColor }: IconType) => (
  <svg
    stroke={currentColor}
    fill={currentColor}
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="1.5rem"
    className="cursor-grab"
    width="1.5rem"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 9l2.146 2.146-.707.708-3-3v-.708l3-3 .707.708L3 8h10l-2.146-2.146.707-.708 3 3v.708l-3 3-.707-.707L13 9H3z"
    ></path>
  </svg>
);

export { CopyIcon, LockIcon, CancelIcon, DragIcon, OpenIcon };
