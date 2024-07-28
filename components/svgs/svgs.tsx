import { SvgIconModel, SvgsNameTypes } from "@/model/icons.model";
import { CalendarSVG, DoorSVG, KeySVG } from "./amentiasSVG";
import { HouseSVG } from "./stayTypeSvgs";

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

export const AnimatedLogoSVG = () => {
  return (
    <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
      <g strokeWidth="10"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M96 22a22.527 22.527 0 0 0-20.335 12.87c-11.068 23.616-33.396 70.46-44.464 93.949a28.578 28.578 0 0 0-2.767 12.225c0 15.994 12.963 28.957 28.957 28.957 23.744 0 61.129-39.83 61.129-67.564 0-12.438-10.082-22.521-22.52-22.521-12.439 0-22.52 10.083-22.52 22.521 0 27.734 37.384 67.564 61.128 67.564 15.992 0 28.957-12.963 28.957-28.957a28.56 28.56 0 0 0-2.768-12.225c-11.066-23.488-33.332-70.333-44.398-93.82A22.525 22.525 0 0 0 95.999 22Z"
          fill="white"
        />
      </g>
      <circle r="1">
        <animateMotion
          path="M96 22a22.527 22.527 0 0 0-20.335 12.87c-11.068 23.616-33.396 70.46-44.464 93.949a28.578 28.578 0 0 0-2.767 12.225c0 15.994 12.963 28.957 28.957 28.957 23.744 0 61.129-39.83 61.129-67.564 0-12.438-10.082-22.521-22.52-22.521-12.439 0-22.52 10.083-22.52 22.521 0 27.734 37.384 67.564 61.128 67.564 15.992 0 28.957-12.963 28.957-28.957a28.56 28.56 0 0 0-2.768-12.225c-11.066-23.488-33.332-70.333-44.398-93.82A22.525 22.525 0 0 0 95.999 22Z"
          repeatCount="indefinite"
          dur="3s"
          keyTimes="0;0.5;0.75;1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          calcMode="spline"
        ></animateMotion>
      </circle>
    </svg>
  );
};

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
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
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

export const SharedHouseSVG = () => {
  return (
    <svg viewBox="0 0 297 297">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <g>
          <polygon points="149.367,22.541 276.86,165 297,165 149.167,0 82.167,73.846 82.167,33 49.167,33 49.167,110.307 0,165 20.435,165 "></polygon>{" "}
          <path d="M149.134,46.459L41.167,165.568V297h213V165h1.222L149.134,46.459z M103.343,226.533c-1.989,2.591-3.695,5.421-5.139,8.467 H74.437c0-25,11.222-35.533,26.858-38.976c-7.738-4.54-12.938-13.063-12.938-22.683c0-14.439,11.705-26.206,26.144-26.206 c10.188,0,19.009,5.816,23.323,14.312c-18.084,4.739-31.467,21.219-31.467,40.77c0,6.025,1.309,11.895,3.72,17.247 C107.58,221.554,105.354,223.912,103.343,226.533z M135.295,225.024c-7.738-4.54-12.939-13.063-12.939-22.683 c0-14.439,11.705-26.269,26.144-26.269s26.144,11.704,26.144,26.144c0,9.623-5.204,18.274-12.947,22.814 c15.641,3.44,26.867,13.97,26.867,38.97h-80.127C108.437,239,119.658,228.467,135.295,225.024z M198.795,235 c-1.444-3.047-3.152-5.878-5.144-8.47c-2.012-2.619-4.251-4.975-6.744-7.062c2.411-5.354,3.729-11.225,3.729-17.252 c0-19.875-13.827-36.568-32.366-40.988c4.348-8.405,13.115-14.155,23.23-14.155c14.439,0,26.144,11.704,26.144,26.144 c0,9.623-5.204,18.274-12.947,22.814c15.641,3.44,26.867,13.97,26.867,38.97H198.795z"></path>{" "}
        </g>
      </g>
    </svg>
  );
};

export const HomeSVG = () => {
  return (
    <svg viewBox="0 0 256 256">
      <g></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g strokeWidth="6">
        <path d="M239.99414,212h-20V115.53882a12.02805,12.02805,0,0,0-3.92773-8.87915L136.06055,33.92456a11.9535,11.9535,0,0,0-16.14551.00073L39.92187,106.65967a12.02314,12.02314,0,0,0-3.92773,8.8789V212h-20a4,4,0,1,0,0,8h224a4,4,0,1,0,0-8Zm-196-96.46143a4.00859,4.00859,0,0,1,1.30957-2.95971l79.99316-72.73438a3.98534,3.98534,0,0,1,5.38282-.00049l80.00488,72.73438a4.01139,4.01139,0,0,1,1.30957,2.96045V212H155.98828V159.9917a12.01343,12.01343,0,0,0-12-12h-32a12.01343,12.01343,0,0,0-12,12V212H43.99414ZM147.98828,212h-40V159.9917a4.00427,4.00427,0,0,1,4-4h32a4.00426,4.00426,0,0,1,4,4Z"></path>{" "}
      </g>
    </svg>
  );
};

export const PhotosSVG = () => {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="M41.636 8.404l1.017 7.237 17.579 4.71a5 5 0 0 1 3.587 5.914l-.051.21-6.73 25.114A5.002 5.002 0 0 1 53 55.233V56a5 5 0 0 1-4.783 4.995L48 61H16a5 5 0 0 1-4.995-4.783L11 56V44.013l-1.69.239a5 5 0 0 1-5.612-4.042l-.034-.214L.045 14.25a5 5 0 0 1 4.041-5.612l.215-.035 31.688-4.454a5 5 0 0 1 5.647 4.256zm-20.49 39.373l-.14.131L13 55.914V56a3 3 0 0 0 2.824 2.995L16 59h21.42L25.149 47.812a3 3 0 0 0-4.004-.035zm16.501-9.903l-.139.136-9.417 9.778L40.387 59H48a3 3 0 0 0 2.995-2.824L51 56v-9.561l-9.3-8.556a3 3 0 0 0-4.053-.009zM53 34.614V53.19a3.003 3.003 0 0 0 2.054-1.944l.052-.174 2.475-9.235L53 34.614zM48 27H31.991c-.283.031-.571.032-.862 0H16a3 3 0 0 0-2.995 2.824L13 30v23.084l6.592-6.59a5 5 0 0 1 6.722-.318l.182.159.117.105 9.455-9.817a5 5 0 0 1 6.802-.374l.184.162L51 43.721V30a3 3 0 0 0-2.824-2.995L48 27zm-37 5.548l-5.363 7.118.007.052a3 3 0 0 0 3.388 2.553L11 41.994v-9.446zM25.18 15.954l-.05.169-2.38 8.876h5.336a4 4 0 1 1 6.955 0L48 25.001a5 5 0 0 1 4.995 4.783L53 30v.88l5.284 8.331 3.552-13.253a3 3 0 0 0-1.953-3.624l-.169-.05L28.804 14a3 3 0 0 0-3.623 1.953zM21 31a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM36.443 6.11l-.175.019-31.69 4.453a3 3 0 0 0-2.572 3.214l.02.175 3.217 22.894 5.833-7.74a5.002 5.002 0 0 1 4.707-4.12L16 25h4.68l2.519-9.395a5 5 0 0 1 5.913-3.587l.21.051 11.232 3.01-.898-6.397a3 3 0 0 0-3.213-2.573zm-6.811 16.395a2 2 0 0 0 1.64 2.496h.593a2 2 0 1 0-2.233-2.496zM10 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
    </svg>
  );
};

export const TrashSVG = () => {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="M10 .38c.31 0 .57.23.62.53V2.5H14v2h-1V14a1 1 0 0 1-.88 1H4a1 1 0 0 1-1-.88V4.5H2v-2h3.38V1c0-.31.23-.57.53-.62H10zM6.12 4.5H4.88v9h1.25v-9zm2.5 0H7.38v9h1.25v-9zm2.5 0H9.88v9h1.24v-9zM9.38 1.62H6.62v.88h2.75v-.87z"></path>
    </svg>
  );
};

export const DotsSVG = () => {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="m3 9.5c.82842712 0 1.5-.67157288 1.5-1.5s-.67157288-1.5-1.5-1.5-1.5.67157288-1.5 1.5.67157288 1.5 1.5 1.5zm5 0c.82842712 0 1.5-.67157288 1.5-1.5s-.67157288-1.5-1.5-1.5-1.5.67157288-1.5 1.5.67157288 1.5 1.5 1.5zm5 0c.8284271 0 1.5-.67157288 1.5-1.5s-.6715729-1.5-1.5-1.5-1.5.67157288-1.5 1.5.6715729 1.5 1.5 1.5z"></path>
    </svg>
  );
};

export const ErrorSVG = () => {
  return (
    <svg viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path>
    </svg>
  );
};

export const PencilSVG = () => {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="M20.8 4.8a4.54 4.54 0 0 1 6.57 6.24l-.16.17L9 29.4a2 2 0 0 1-1.24.58L7.6 30H2v-5.59a2 2 0 0 1 .47-1.28l.12-.13zM19 9.4l-15 15V28h3.59l15-15zm6.8-3.2a2.54 2.54 0 0 0-3.46-.13l-.13.13L20.4 8 24 11.59l1.8-1.8c.94-.94.98-2.45.12-3.45z"></path>
    </svg>
  );
};

export const GreetingSVG = () => {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <path d="M11 31v-9.07a8 8 0 0 1 1.75-14.6 4 4 0 1 1 6.73-.35A6 6 0 0 0 25 1.23V1h2a8 8 0 0 1-7.75 8H17V6.73a2 2 0 1 0-2 0V9a6 6 0 0 0-4 10.47V13h2v16h2v-9h2v9h2V13h2v18H11z"></path>
    </svg>
  );
};

export const DynamicSVGByName = ({ name }: { name: SvgsNameTypes }) => {
  switch (name) {
    case "door":
      return <DoorSVG />;
    case "calendar":
      return <CalendarSVG />;
    case "key":
      return <KeySVG />;
    case "house":
      return <HomeSVG />;
    case "sharedHouse":
      return <SharedHouseSVG />;
  }
};
