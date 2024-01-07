import styled from "@emotion/styled";
import { CSSProperties } from "react";

export interface NotificationIconProps {
  notificationCount: number;
  styles?: CSSProperties;
}

const Container = styled.div``;
export const NotificationIcon = ({
  notificationCount,
  styles,
}: NotificationIconProps) => (
  <Container style={styles}>
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.05672 11.5149C7.05672 7.36453 10.1657 4 14.0008 4C17.8359 4 20.9448 7.36453 20.9448 11.5149V14.34C20.9448 16.5016 21.8102 17.3044 22.8248 18.7952C23.2977 19.49 23.2782 20.3842 23.021 21.0569C22.7634 21.7305 22.1748 22.4 21.3103 22.4H6.69124C5.82673 22.4 5.23816 21.7305 4.98057 21.0569C4.72331 20.3842 4.70385 19.49 5.17671 18.7952C6.19138 17.3044 7.05672 16.5016 7.05672 14.34V11.5149ZM14.0008 5.46908C10.9154 5.46908 8.4142 8.17588 8.4142 11.5149V14.34C8.4142 16.9228 7.38596 18.0264 6.2697 19.6665C6.14742 19.8461 6.11022 20.1692 6.23489 20.4952C6.35923 20.8203 6.55224 20.9309 6.69124 20.9309H21.3103C21.4493 20.9309 21.6423 20.8203 21.7667 20.4952C21.8913 20.1692 21.8541 19.8461 21.7319 19.6665C20.6156 18.0264 19.5874 16.9228 19.5874 14.34V11.5149C19.5874 8.17588 17.0862 5.46908 14.0008 5.46908Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6714 24.497C12.023 24.2929 12.4733 24.4127 12.6772 24.7646C12.8116 24.9964 13.0044 25.1888 13.2364 25.3226C13.4684 25.4564 13.7315 25.5268 13.9993 25.5268C14.267 25.5268 14.5301 25.4564 14.7621 25.3226C14.9941 25.1888 15.1869 24.9964 15.3213 24.7646C15.5252 24.4127 15.9755 24.2929 16.3271 24.497C16.6786 24.7011 16.7983 25.1519 16.5943 25.5038C16.3306 25.9588 15.9521 26.3366 15.4966 26.5991C15.0412 26.8617 14.5248 26.9999 13.9993 26.9999C13.4737 26.9999 12.9573 26.8617 12.5019 26.5991C12.0464 26.3366 11.6679 25.9588 11.4042 25.5038C11.2002 25.1519 11.3199 24.7011 11.6714 24.497Z"
        fill="black"
      />
      {notificationCount > 0 && (
        <>
          <circle
            cx="20"
            cy="8"
            r="8"
            fill="#FF5555"
            stroke="white"
            strokeWidth="1.0"
          ></circle>
          <text
            x={notificationCount < 10 ? 17 : 15}
            y="11"
            // 각각의 OS 상 에서 폰트 호환 필요
            style={{ font: `bold 10px sans-serif,monospace`, fill: `#fff` }}
          >
            {notificationCount < 10 ? notificationCount : `9`}
          </text>
          {notificationCount > 10 && (
            <text
              x={20}
              y="10.5"
              // 각각의 OS 상 에서 폰트 호환 필요
              style={{ font: `bold 10px sans-serif,monospace`, fill: `#fff` }}
            >
              {"+"}
            </text>
          )}
        </>
      )}
    </svg>
  </Container>
);
