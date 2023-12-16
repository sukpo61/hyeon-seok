import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import PartyInfo from "@components/partydetail/PartyInfo";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { useScroll } from "react-use";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import getPartyDetail, {
  API_GET_PARTY_DETAIL_KEY,
} from "src/api/getPartyDetail";
import BackgroundImage from "@components/common/BackgroundImage";
import PartyDetailBottomBar from "@components/partydetail/PartyDetailBottomBar";
import postParticipate from "src/api/postParticipate";
import { useMutation } from "@tanstack/react-query";
import deletePartyDetail from "src/api/deletePartyDetail";
import Loading from "@components/partydetail/Loading";
import ErrorPage from "@components/partydetail/ErrorPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  max-width: 768px;
  overflow-y: scroll;
`;

const PartyDetailContent = ({ y }: { y: number }) => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
    queryFn: () => getPartyDetail({ id }),
    enabled: !!id,
  });

  const { mutateAsync: postParticipateMutate } = useMutation({
    mutationFn: postParticipate,
  });

  const { mutateAsync: partyDetailDeleteMutate } = useMutation({
    mutationFn: deletePartyDetail,
    onSuccess: () => {
      router.push("/");
    },
  });

  const participateParty = () => {
    postParticipateMutate({
      partyId: parseInt(id),
      leaderId: data?.userId,
      status: "ACCEPT",
    });
  };

  const partyDetailDelete = () => {
    partyDetailDeleteMutate({ id });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isSuccess) {
    return (
      <>
        <BackgroundImage src={data.thumbnail} scrollY={y} />
        <PartyInfo data={data} />
        <PartyDetailBottomBar
          participateParty={participateParty}
          partyDetailDelete={partyDetailDelete}
        />
      </>
    );
  }
};

const PartyDetail = () => {
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  return (
    <Container ref={scrollRef}>
      <DefaultHeader leftArea={<HeaderBackButton />} />
      <PartyDetailContent y={y} />
    </Container>
  );
};

export default PartyDetail;
