import ProfileEditController from '@components/profile/edit/ProfileEditController';
import { GetServerSideProps, NextPage } from 'next';

interface ReviewEditPageProps {}

const ProfileEditPage: NextPage<ReviewEditPageProps> = () => {
    return <ProfileEditController />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        };
    }

    return {
        props: {},
    };
};

export default ProfileEditPage;
