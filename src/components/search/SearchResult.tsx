import { DefaultText } from "@components/common/DefaultText";
import NoResult from "@components/common/NoResult";
import { ObserverTrigger } from "@components/hoc/ObserverTrigger";
import { PartyCard } from "@components/home/PartyCard";
import styled from "@emotion/styled";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import getSearchResult, {
  API_GET_SEARCH_RESULT,
} from "src/api/getSearchResult";
import { Color } from "styles/Color";

interface SearchResultProps {
  keyword: string;
}

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

export const SearchResult: FC<SearchResultProps> = ({ keyword }) => {
  const router = useRouter();

  const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
    queryKey: [API_GET_SEARCH_RESULT, { keyword }],
    queryFn: ({ pageParam = 0 }) =>
      getSearchResult({
        keyword,
        lastPartyId: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.pageInfo?.lastPartyId,
    staleTime: 0,
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
      {partyData[0]?.partyList.length > 0 ? (
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
      ) : (
        <NoResult>
          <DefaultText
            text={
              "현재 검색어에 해당하는 파티가 존재하지 않습니다. \n 다른 검색어로 변경해 주세요."
            }
            preLine
            size={20}
            weight={800}
          />
        </NoResult>
      )}
    </Container>
  );
};
