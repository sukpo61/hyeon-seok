import { DefaultButton } from '@components/common/DefaultButton';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import TextInput from '@components/common/TextInput';
import styled from '@emotion/styled';
import Image from 'next/image';
import defaultProfileImage from 'public/images/profile/profile.png';
import { ChangeEventHandler, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ProfileEditForm } from './ProfileEditController';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    min-height: calc(100vh - 80px);
    width: 100%;
    max-width: 768px;
    margin-top: 80px;
`;

const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 400px;
`;
const UserImage = styled(Image)`
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
`;

const Input = styled.input`
    display: none;
`;

const ProfileEditScreen = () => {
    const { register, setValue, control } = useFormContext<ProfileEditForm>();

    const image = useWatch({ control, name: 'image' });

    const getImageUrl = useCallback((src: File | string) => {
        if (typeof src === 'string' || !src) return src;
        return URL.createObjectURL(src);
    }, []);

    const onChangeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const file = event.currentTarget.files?.[0];
            if (!file) return;
            setValue('image', file);
        },
        [getImageUrl, setValue],
    );

    return (
        <Container>
            <DefaultHeader
                leftArea={<HeaderBackButton />}
                rightArea={<DefaultButton text="완료" />}
            />
            <InputLabel>
                <UserImage
                    alt="profile-image"
                    src={getImageUrl(image) || defaultProfileImage}
                    width={200}
                    height={200}
                />
                <Input type="file" accept="image/*" onChange={onChangeHandler} />
                <TextInput
                    placeholder="닉네임을 입력해주세요."
                    isBorderRadius={false}
                    maxLength={20}
                    {...register('nickname')}
                />
            </InputLabel>
        </Container>
    );
};

export default ProfileEditScreen;
