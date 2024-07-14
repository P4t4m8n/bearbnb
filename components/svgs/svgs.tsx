import { SvgIconModel, SvgsNameTypes } from "@/model/icons.model";
import { CalendarSVG, DoorSVG, KeySVG } from "./amentiasSVG";

interface Props {
  className: string;
}

export function LikeSVG() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
    </svg>
  );
}

export function RatingSVG({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
      />
    </svg>
  );
}

export function LogoSVG() {
  return (
    <svg viewBox="0 0 32 32">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path d="M29.524 22.279c-0.372-1.044-0.752-1.907-1.183-2.74l0.058 0.123v-0.038c-2.361-5.006-4.551-9.507-6.632-13.551l-0.139-0.204c-1.483-3.040-2.544-4.866-5.627-4.866-3.049 0-4.344 2.118-5.667 4.871l-0.101 0.2c-2.086 4.044-4.275 8.551-6.627 13.555v0.066l-0.699 1.525c-0.262 0.63-0.396 0.96-0.431 1.058-0.279 0.691-0.441 1.492-0.441 2.332 0 3.526 2.859 6.385 6.385 6.385 0.020 0 0.040-0 0.060-0l-0.003 0c0.117-0 0.232-0.012 0.342-0.036l-0.011 0.002h0.465c2.744-0.574 5.073-2.061 6.71-4.121l0.018-0.024c1.656 2.082 3.983 3.568 6.65 4.132l0.075 0.013h0.465c0.099 0.021 0.214 0.034 0.331 0.034h0c0.017 0 0.038 0 0.059 0 3.526 0 6.384-2.858 6.384-6.384 0-0.84-0.162-1.642-0.457-2.376l0.015 0.043zM27.999 25.266c-0.262 1.581-1.309 2.87-2.719 3.467l-0.030 0.011c-2.815 1.225-5.602-0.729-7.988-3.379 3.945-4.937 4.674-8.782 2.98-11.269-0.887-1.289-2.353-2.123-4.015-2.123-0.080 0-0.159 0.002-0.237 0.006l0.011-0c-0.023-0-0.049-0.001-0.076-0.001-2.816 0-5.098 2.282-5.098 5.098 0 0.583 0.098 1.142 0.278 1.664l-0.011-0.036c0.782 2.574 2.032 4.8 3.665 6.686l-0.019-0.023c-0.978 1.128-2.103 2.094-3.352 2.879l-0.062 0.036c-0.657 0.387-1.43 0.657-2.256 0.758l-0.029 0.003c-0.186 0.027-0.401 0.043-0.62 0.043-2.474 0-4.48-2.006-4.48-4.48 0-0.599 0.117-1.17 0.33-1.692l-0.011 0.030c0.165-0.431 0.494-1.225 1.056-2.451l0.031-0.066c1.829-3.971 4.051-8.485 6.604-13.49l0.066-0.165 0.725-1.395c0.348-0.857 0.932-1.559 1.672-2.043l0.017-0.010c0.425-0.248 0.935-0.395 1.48-0.395 0.027 0 0.054 0 0.081 0.001l-0.004-0c1.024 0.009 1.933 0.497 2.514 1.251l0.006 0.008c0.197 0.299 0.431 0.696 0.727 1.191l0.697 1.361 0.1 0.199c2.551 5.004 4.775 9.507 6.597 13.489l0.033 0.031 0.666 1.525 0.397 0.955c0.199 0.493 0.314 1.065 0.314 1.664 0 0.232-0.017 0.46-0.051 0.683l0.003-0.025zM16.001 23.841c-1.367-1.544-2.407-3.411-2.991-5.47l-0.024-0.099c-0.126-0.348-0.198-0.749-0.198-1.167 0-0.711 0.21-1.372 0.57-1.927l-0.008 0.014c0.543-0.803 1.45-1.325 2.479-1.325 0.060 0 0.12 0.002 0.18 0.005l-0.008-0c0.052-0.003 0.112-0.005 0.173-0.005 1.030 0 1.938 0.525 2.469 1.323l0.007 0.011c0.351 0.538 0.56 1.196 0.56 1.904 0 0.422-0.074 0.826-0.211 1.201l0.008-0.024c-0.624 2.155-1.661 4.019-3.029 5.588l0.015-0.017z"></path>{" "}
      </g>
    </svg>
  );
}

export function SearchSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path
        fill="none"
        d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
      ></path>
    </svg>
  );
}

export function GlobeSVG({ className }: Props) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={className}
    >
      <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path>
    </svg>
  );
}

export function HamburgerSVG({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={className}
    >
      <g fill="black">
        <path d="M2 16h28M2 24h28M2 8h28"></path>
      </g>
    </svg>
  );
}

export function AvatarSVG({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={className}
    >
      <g fill="none">
        <circle cx="16" cy="16" r="14"></circle>
        <path d="M14.02 19.66a6 6 0 1 1 3.96 0M17.35 19.67H18c3.69.61 6.8 2.91 8.54 6.08m-20.92-.27A12.01 12.01 0 0 1 14 19.67h.62"></path>
      </g>
    </svg>
  );
}

export function FilterSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      stroke="4"
    >
      <path
        fill="none"
        d="M7 16H3m26 0H15M29 6h-4m-8 0H3m26 20h-4M7 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0zM17 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 20a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm0 0H3"
      ></path>
    </svg>
  );
}

export function ScrollBySVG({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={className}
    >
      <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
    </svg>
  );
}

export function ShareSVG() {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path
        d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
        fill="none"
      ></path>
    </svg>
  );
}

export function DoubleBedSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      // style="display: block; height: 24px; width: 24px; fill: currentcolor;"
    >
      <path d="M26 4a2 2 0 0 1 2 1.85v7.99l1.85 5.54a3 3 0 0 1 .11.46l.03.24.01.24V30h-2v-2H4v2H2v-9.68a3 3 0 0 1 .09-.71l.06-.23L4 13.84V6a2 2 0 0 1 1.7-1.98l.15-.01L6 4zm2 18H4v4h24zm-1.39-6H5.4l-1.34 4h23.9zM26 6H6v8h2v-4a2 2 0 0 1 1.85-2H22a2 2 0 0 1 2 1.85V14h2zm-11 4h-5v4h5zm7 0h-5v4h5z"></path>
    </svg>
  );
}

export const SingleBedSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      // style="display: block; height: 24px; width: 24px; fill: currentcolor;"
    >
      <path d="M24 4a2 2 0 0 1 2 1.85v7.99l1.85 5.54a3 3 0 0 1 .11.46l.03.24.01.24V30h-2v-2H6v2H4v-9.68a3 3 0 0 1 .09-.71l.06-.23L6 13.84V6a2 2 0 0 1 1.7-1.98l.15-.01L8 4zm2 18H6v4h20zm-1.39-6H7.4l-1.34 4h19.9zM24 6H8v8h3v-4a2 2 0 0 1 1.85-2H19a2 2 0 0 1 2 1.85V14h3zm-5 4h-6v4h6z"></path>
    </svg>
  );
};

export function PlusSVG() {
  return (
    <svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path>
    </svg>
  );
}

export function MinusSVG() {
  return (
    <svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="m.75 6.75h10.5v-1.5h-10.5z"></path>
    </svg>
  );
}

export function SuggestionPin() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
    </svg>
  );
}

export function CheckSVG() {
  return (
    <svg fill="#000000" viewBox="0 0 24 24" id="check-mark-circle">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect id="secondary" x="3" y="3" width="18" height="18" rx="9"></rect>
        <polyline id="primary" points="8 11.5 11 14.5 16 9.5"></polyline>
        <rect
          id="primary-2"
          data-name="primary"
          x="3"
          y="3"
          width="18"
          height="18"
          rx="9"
        ></rect>
      </g>
    </svg>
  );
}

export const MessageSVG = () => {
  return (
    <svg fill="#000000" viewBox="0 -2.75 29.5 29.5">
      <g  strokeWidth="0"></g>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g>
        <path
          d="M30.75,9.041A3.04,3.04,0,0,0,27.709,6H4.291A3.04,3.04,0,0,0,1.25,9.041V21.459A3.04,3.04,0,0,0,4.291,24.5h19.12a1.026,1.026,0,0,1,.725.3l4.907,4.907A1,1,0,0,0,30.75,29V9.041Zm-2,0V26.586l-3.2-3.2a3.024,3.024,0,0,0-2.139-.886H4.291A1.041,1.041,0,0,1,3.25,21.459V9.041A1.041,1.041,0,0,1,4.291,8H27.709A1.041,1.041,0,0,1,28.75,9.041Z"
          transform="translate(-1.25 -6)"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};

export const LogoutSVG = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export function DynamicSVG({ path, viewBox }: SvgIconModel) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d={path}></path>
    </svg>
  );
}

export const DynamicSVGByName = ({ name }: { name: SvgsNameTypes }) => {
  switch (name) {
    case "door":
      return <DoorSVG />;
    case "calendar":
      return <CalendarSVG />;
    case "key":
      return <KeySVG />;
  }
};
