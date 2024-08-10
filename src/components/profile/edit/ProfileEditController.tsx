import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import useToast from '@hooks/useToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import getProfile, { API_GET_PROFILE_KEY } from 'src/api/getProfile';
import patchProfile from 'src/api/patchProfile';
import { postUploadImage } from 'src/api/postUploadImage';
import * as yup from 'yup';
import ProfileEditScreen from './ProfileEditScreen';

export interface ProfileEditForm {
    nickname: string;
    image: string | File;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const ProfileEditController = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { showToast } = useToast();

    const { data } = useQuery({
        queryKey: [API_GET_PROFILE_KEY],
        queryFn: () => getProfile(),
    });

    const formSchema = yup.object({
        nickname: yup
            .string()
            .min(1, '닉네임을 입력해주세요.')
            .max(10, '10자를 넘기지 말아주세요.')
            .required(),
        image: yup.mixed<string | File>().required(),
    });

    const form = useForm<ProfileEditForm>({
        resolver: yupResolver(formSchema),
        values: {
            nickname: data?.nickname || '',
            image: data?.imgUrl || '',
        },
    });

    const { handleSubmit } = form;

    const { mutate: patchProfileMutate } = useMutation({
        mutationFn: patchProfile,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [API_GET_PROFILE_KEY],
            });
            router.replace('/profile');
        },
        onError: (error) => {
            console.error(error);
            return Promise.reject(error);
        },
    });

    const { mutateAsync: postUploadImageMutate } = useMutation({
        mutationFn: postUploadImage,
        onError: (error) => {
            console.error(error);
            return Promise.reject(error);
        },
    });

    const onSubmit = useCallback(
        async (formData: ProfileEditForm) => {
            const { nickname, image } = formData;
            let imgUrl = image;
            if (imgUrl && typeof imgUrl !== 'string') {
                const uploadResult = await postUploadImageMutate(imgUrl);
                imgUrl = uploadResult.imgUrl;
            }
            const payload = { nickname, imgUrl };
            patchProfileMutate(payload);
        },
        [postUploadImageMutate, patchProfileMutate],
    );

    const onSubmitError = (errors: Object) => {
        for (const error of Object.values(errors)) {
            showToast(error.message);
            break;
        }
    };

    return (
        <FormProvider {...form}>
            <Form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                <ProfileEditScreen />
            </Form>
        </FormProvider>
    );
};

export default ProfileEditController;
