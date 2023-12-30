import PartyInfo from "@components/partydetail/PartyInfo";
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

const PartyDetailContent = ({ y }: { y: number }) => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
    queryFn: () => getPartyDetail({ id }),
    enabled: !!id,
  });

  const postParticipateMutate = useMutation({
    mutationFn: postParticipate,
  });

  const DeletePartyDetailMutate = useMutation({
    mutationFn: deletePartyDetail,
    onSuccess: () => {
      router.push("/");
    },
  });

  const participateParty = () => {
    postParticipateMutate.mutate({
      partyId: Number(id),
      leaderId: data?.userId,
      status: "ACCEPT",
    });
  };

  const partyDetailDelete = () => {
    DeletePartyDetailMutate.mutate({ id });
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
          isLeader={data.isLeader}
        />
      </>
    );
  }
};

export default PartyDetailContent;
