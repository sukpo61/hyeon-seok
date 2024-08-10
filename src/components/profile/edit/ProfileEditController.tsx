import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import getProfile, { API_GET_PROFILE_KEY } from 'src/api/getProfile';
import patchProfile from 'src/api/patchProfile';
import { postUploadImage } from 'src/api/postUploadImage';
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

    const { data } = useQuery({
        queryKey: [API_GET_PROFILE_KEY],
        queryFn: () => getProfile(),
    });

    const form = useForm<ProfileEditForm>({
        defaultValues: {
            nickname: data?.nickname || '',
            image: data?.imgUrl || '/images/profile/profile.png',
        },
    });

    const { handleSubmit } = form;

    const { mutate: patchProfileMutate } = useMutation({
        mutationFn: patchProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({
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
            let form = formData;
            const { image } = form;
            if (image && typeof image !== 'string') {
                const uploadResult = await postUploadImageMutate(image);
                form = { ...formData, image: uploadResult };
            }
            patchProfileMutate(form);
        },
        [postUploadImageMutate, patchProfileMutate],
    );

    return (
        <FormProvider {...form}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ProfileEditScreen />
            </Form>
        </FormProvider>
    );
};

export default ProfileEditController;
