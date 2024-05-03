import { DefaultHeader } from '@components/common/DefaultHeader';
import { DefaultText } from '@components/common/DefaultText';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import styled from '@emotion/styled';
import { Color } from 'styles/Color';
import { newNotificationRecoil } from 'src/recoil-states/newNotificationState';
import { NotificationBox } from '@components/notification/NotificationBox';
import { useRecoilValue } from 'recoil';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-top: 40px;
`;
const NotificationList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 20px;
    gap: 30px;
    background: ${Color.Background};
    min-height: calc(100vh - 45px);
    height: 100%;
`;

const OFFSET = 15;

const NotificationPage = () => {
    const notifications = useRecoilValue(newNotificationRecoil);
    const [renderedCount, setRenderedCount] = useState(OFFSET);

    const onObserve = () => {
        if (notifications.length > renderedCount) {
            setRenderedCount((prevCount) => prevCount + OFFSET);
        }
    };

    return (
        <Container>
            <DefaultHeader
                leftArea={<HeaderBackButton />}
                centerArea={<DefaultText text="알림 내역" size={20} weight={700} />}
            />
            <NotificationList>
                <ObserverTrigger onObserve={onObserve} observerMinHeight={'30px'}>
                    {notifications.slice(0, renderedCount).map((data) => (
                        <NotificationBox key={data.id} data={data} />
                    ))}
                </ObserverTrigger>
            </NotificationList>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);
    const refreshToken = cookies.refreshToken;

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

export default NotificationPage;
