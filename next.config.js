/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    KAKAO_KEY: process.env.KAKAO_KEY,
    KAKAO_RESTAPI_KEY: process.env.KAKAO_RESTAPI_KEY,
    KAKAO_HOST_URL: process.env.KAKAO_HOST_URL,
    MATITTING_HOST_URL: process.env.MATITTING_HOST_URL,
  },
  images: {
    domains: [
      "cdn.pixabay.com",
      "k.kakaocdn.net",
      "ssl.pstatic.net",
      "matitting.s3.ap-northeast-2.amazonaws.com",
    ],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
