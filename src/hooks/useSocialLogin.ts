import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import postLogin from "src/api/postLogin";
import defaultRequest from "src/lib/axios/defaultRequest";
import { string } from "yup";

declare global {
  interface Window {
    naver: any;
    Kakao: any;
  }
}

interface SocialLoginInformationType {
  code: string;
  state?: string;
  loginType: "NAVER" | "KAKAO";
}

const useSocialLogin = () => {
  const { replace, query, push } = useRouter();
  const { code, state } = query;

  const { mutateAsync: processLogin } = useMutation({ mutationFn: postLogin });

  useEffect(() => {
    if (code && state) {
      processLogin(
        {
          code: String(code),
          oauthProvider: "NAVER",
          state: String(state),
        },
        {
          onSuccess(data, variables, context) {
            const { newUserId } = data.data;
            if (newUserId) {
              replace(`/signup?newUserId=${newUserId}`);
              return;
            }
            if (data) {
              const accessToken = data.headers["authorization"];
              const refreshToken = data.headers["authorization-refresh"];
              defaultRequest.defaults.headers.common["Authorization"] =
                accessToken;
              setCookie("refreshToken", refreshToken);
              push("/");
            }
          },
        }
      );
      return;
    } else if (code && !state) {
      processLogin(
        { code: String(code), oauthProvider: "KAKAO" },
        {
          onSuccess(data, variables, context) {
            const { newUserId } = data.data;
            if (newUserId) {
              replace(`/signup?newUserId=${newUserId}`);
              return;
            }
            if (data) {
              const accessToken = data.headers["authorization"];
              const refreshToken = data.headers["authorization-refresh"];
              defaultRequest.defaults.headers.common["Authorization"] =
                accessToken;
              setCookie("refreshToken", refreshToken);
              push("/");
            }
          },
        }
      );
      return;
    }
  }, [code, processLogin, push, replace, state]);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_KEY);
    }
  }, []);
};

export default useSocialLogin;
