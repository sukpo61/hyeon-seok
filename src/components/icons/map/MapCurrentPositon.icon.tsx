export const MapCurrentPositionIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle opacity="0.3" cx="15" cy="15" r="15" fill="#F83838" />
    <g filter="url(#filter0_d_4053_32440)">
      <circle cx="15" cy="15" r="4" fill="#F83838" />
      <circle cx="15" cy="15" r="4.75" stroke="white" strokeWidth="1.5" />
    </g>
    <defs>
      <filter
        id="filter0_d_4053_32440"
        x="5.5"
        y="9.5"
        width="19"
        height="19"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4053_32440"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_4053_32440"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
