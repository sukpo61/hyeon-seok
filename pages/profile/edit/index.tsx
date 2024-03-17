import styled from "@emotion/styled";
import TextInput from "@components/common/TextInput";
import patchProfile from "src/api/patchProfile";
import Image from "next/image";
import getProfile from "src/api/getProfile";
import { DefaultHeader } from "@components/common/DefaultHeader";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { DefaultButton } from "@components/common/DefaultButton";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { API_GET_PROFILE_KEY } from "src/api/getProfile";
import { postUploadImage } from "src/api/postUploadImage";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface ProfileEditForm {
  imgFile: FileList;
  nickname: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 45px;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 768px;
`;

const Main = styled.div`
  display: flex;
  width: 400px;
  height: calc(100% - 76px);
  overflow-y: auto;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 40px;
  cursor: pointer;
  margin-bottom: 100px;
`;

const Profile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [localImgUrl, setLocalImgUrl] = useState<string>(
    "/images/profile/profile.png"
  );

  const { data } = useQuery({
    queryKey: [API_GET_PROFILE_KEY],
    queryFn: () => getProfile(),
  });

  const { register, handleSubmit } = useForm<ProfileEditForm>();

  const { mutate: patchProfileMutate } = useMutation({
    mutationFn: patchProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_GET_PROFILE_KEY],
      });
      router.replace("/profile");
    },
  });

  const { mutateAsync: postUploadImageMutate } = useMutation({
    mutationFn: postUploadImage,
  });

  const handleChangeThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target as FileReader;
        setLocalImgUrl(target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickImage = () => {
    inputFileRef.current?.click();
  };

  const onSubmitPartyForm = async (formData: ProfileEditForm) => {
    const { nickname, imgFile } = formData;
    if (imgFile) {
      const uploadResult = await postUploadImageMutate(imgFile[0]);
      if (uploadResult.imgUrl) {
        patchProfileMutate({ imgUrl: uploadResult.imgUrl, nickname });
      }
      return;
    }
    patchProfileMutate({ nickname });
  };

  if (!data) {
    return;
  }

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton />}
        rightArea={
          <DefaultButton
            text="완료"
            onClick={handleSubmit(onSubmitPartyForm)}
          />
        }
      />
      <Main>
        <Form onSubmit={handleSubmit(onSubmitPartyForm)}>
          <ImageContainer onClick={handleClickImage}>
            <Image
              width={200}
              height={200}
              src={data.imgUrl || localImgUrl}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              alt="profile"
            />
            <input
              id="profile-tumbnail-input"
              type="file"
              hidden
              {...register("imgFile", {
                onChange: handleChangeThumbnail,
              })}
              ref={inputFileRef}
            />
          </ImageContainer>
          <TextInput
            name="nickname"
            placeholder="닉네임을 입력해주세요."
            isBorderRadius={false}
            maxLength={20}
            register={{ ...register("nickname") }}
            defaultValue={data.nickname}
          />
        </Form>
      </Main>
    </Container>
  );
};

export default Profile;
