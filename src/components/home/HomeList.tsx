import { DefaultText } from "@components/common/DefaultText";
import NoResult from "@components/common/NoResult";
import { ObserverTrigger } from "@components/hoc/ObserverTrigger";
import styled from "@emotion/styled";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import getMainPageData, { API_GET_MAIN_PAGE } from "src/api/getPartyMainPage";
import { PositionSate } from "src/recoil-states/positionStates";
import { Color } from "styles/Color";
import { PartyCard } from "./PartyCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${Color.VeryLightGrey};
  overflow-y: scroll;
  overflow-x: hidden;
  align-items: center;
  padding: 0 15px 60px 15px;
`;

export const HomeList: FC = () => {
  const router = useRouter();
  const position = useRecoilValue(PositionSate);

  const { fetchNextPage, hasNextPage, data, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: [
        API_GET_MAIN_PAGE,
        { latitude: position.coords.x, longitude: position.coords.y },
      ],
      queryFn: ({ pageParam = 0 }) =>
        position.coords.x
          ? getMainPageData({
              latitude: position.coords.x,
              longitude: position.coords.y,
              lastPartyId: pageParam,
              size: 5,
            })
          : Promise.resolve(null),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.pageInfo?.lastPartyId,
    });

  const onClickPartyCard = (id: number) => {
    router.push(`/partydetail/${id}`);
  };
  const onObserve = () => {
    if (hasNextPage) fetchNextPage();
  };

  if (!data || !data.pages) {
    return;
  }

  const partyData = data.pages;

  return (
    <Container>
      {partyData[0]?.partyList.length === 0 ? (
        <NoResult>
          <DefaultText
            text={
              "현재 해당 위치에는 파티가 존재하지 않습니다. \n 다른 위치로 변경해 주세요."
            }
            preLine
            size={20}
            weight={800}
          />
        </NoResult>
      ) : (
        <ObserverTrigger onObserve={onObserve} observerMinHeight={"30px"}>
          {partyData.map((item) =>
            item?.partyList.map((party) => (
              <PartyCard
                key={party.partyId}
                partyData={party}
                onClickPartyCard={onClickPartyCard}
              />
            ))
          )}
        </ObserverTrigger>
      )}
    </Container>
  );
};
