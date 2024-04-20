import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import { useEffect, useMemo, useState } from "react";
import BackIcon from "@components/icons/common/Back.icon";
import Progressbar from "@components/common/ProgressBar";
import { DefaultButton } from "@components/common/DefaultButton";
import { useRouter } from "next/router";

import GenderSection from "@components/signup/GenderSection";
import BirthDaySection from "@components/signup/BirthdaySection";
import NickNameSection from "@components/signup/NicknameSection";
import { useForm } from "react-hook-form";
import SignupButton from "@components/signup/SignupButton";
import { useMutation } from "@tanstack/react-query";
import postSignup from "src/api/postSignup";
import { ColorToken } from "styles/Color";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";
import defaultRequest from "src/lib/axios/defaultRequest";
interface HeaderLeftAreaProps {
  onClick: () => void;
}

export interface SignUpFormType {
  gender: string;
  birthDay: string;
  nickName: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 45px;
  min-height: calc(100vh);
  width: 100%;
  max-width: 768px;
  background: ${ColorToken.icon_background};
`;

const HeaderAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 15px;
  align-items: center;
`;

const StepTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 32px;
`;
const ProgressbarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
`;

const LeftArea = ({ onClick }: HeaderLeftAreaProps) => {
  return (
    <HeaderAreaContainer onClick={onClick}>{BackIcon()}</HeaderAreaContainer>
  );
};

const SignUpPage = () => {
  const { query } = useRouter();
  const [step, setStep] = useState(0);
  const { newUserId } = query;

  const { mutateAsync } = useMutation({
    mutationFn: postSignup,
  });
  const { register, control, setValue, handleSubmit, setError, formState } =
    useForm<SignUpFormType>({
      defaultValues: {
        gender: "",
        birthDay: "",
        nickName: "",
      },
    });
  const router = useRouter();
  const { errors } = formState;

  const backStep = () =>
    step > 0 ? setStep((step: number) => step - 1) : router.back();

  const submitSingup = async ({
    birthDay,
    gender,
    nickName,
  }: SignUpFormType) => {
    const lastStep = signupSteps.length - 1;

    if (step === lastStep) {
      const data = await mutateAsync(
        {
          userId: Number(newUserId),
          birthday: birthDay,
          gender,
          nickname: nickName,
        },
        {
          onError(error, variables, context) {
            if (
              error instanceof AxiosError &&
              error.response?.data.errorCode === 2003
            ) {
              setError("nickName", {
                message: "중복된 닉네임입니다. 다른 닉네임을 사용해 주세요.",
              });
            }
          },
        }
      );

      if (data) {
        const accessToken = data.headers["authorization"];
        const refreshToken = data.headers["authorization-refresh"];
        defaultRequest.defaults.headers.common["Authorization"] = accessToken;
        await setCookie("refreshToken", refreshToken);
        router.push("/");
      }
      return;
    }
    setStep((step: number) => step + 1);
  };

  const signupSteps = [
    {
      title: "회원님의 성별은 무엇인가요?",
      contents: <GenderSection control={control} setValue={setValue} />,
    },
    {
      title: "회원님의 생일은 언제인가요?",
      contents: <BirthDaySection {...register("birthDay")} />,
    },
    {
      title: "닉네임을 만들어 볼까요?",
      contents: (
        <NickNameSection
          {...register("nickName")}
          errorMessage={errors.nickName?.message}
        />
      ),
    },
  ];
  const buttonText = useMemo(() => {
    return step + 1 === signupSteps.length ? "완료" : "다음";
  }, [signupSteps.length, step]);

  return (
    <Container>
      <DefaultHeader leftArea={<LeftArea onClick={backStep} />} />
      <ProgressbarContainer>
        <Progressbar value={((step + 1) / signupSteps.length) * 100} />
      </ProgressbarContainer>
      <StepTitle>{signupSteps[step].title}</StepTitle>
      {signupSteps[step].contents}
      <SignupButton
        control={control}
        step={step}
        onClick={handleSubmit(submitSingup)}
        text={buttonText}
      />
    </Container>
  );
};

export default SignUpPage;
