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

const PartyDetail = () => {
  const scrollRef = useRef(null);
  const router = useRouter();

  const { y } = useScroll(scrollRef);
  const { id } = router.query as { id: string };

  const { data, isSuccess } = useQuery({
    queryKey: [API_GET_PARTY_DETAIL_KEY, { id }],
    queryFn: () => getPartyDetail({ id }),
  });

  return (
    <Container ref={scrollRef}>
      <DefaultHeader leftArea={<HeaderBackButton />} />
      {isSuccess && (
        <>
          <BackgroundImage src={data.thumbnail} scrollY={y} />
          <PartyInfo data={data} />
          <PartyDetailBottomBar id={id} />
        </>
      )}
    </Container>
  );
};

export default PartyDetail;
