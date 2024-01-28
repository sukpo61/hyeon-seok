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

const PartyDetailContent = ({ y }: { y: number }) => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const userId = 11;
  // 로그인 기능 연결후 userid 받아올 예정

  const { data, isSuccess } = useQuery({
    queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
    queryFn: () => getPartyDetail({ id, userId: String(userId) }),
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
      status: "APPLY",
    });
  };

  const partyDetailDelete = () => {
    DeletePartyDetailMutate.mutate({ id });
  };

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
