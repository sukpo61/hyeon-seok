import { DefaultText } from "@components/common/DefaultText";
import { TimeMachineIcon } from "@components/icons/common/TimeMachine.icon";
import styled from "@emotion/styled";
import { useCallback } from "react";

interface RecentKeywordButtonProps {
  keyword: string;
  onClickKeyword: (keyword: string) => void;
  onClickDeleteBtn: (keyword: string) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  #keyword-area {
    display: flex;
    gap: 15px;
    align-items: center;
    cursor: pointer;
  }
  #keyword-deletebtn-area {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const RecentKeywordButton = ({
  keyword,
  onClickKeyword,
  onClickDeleteBtn,
}: RecentKeywordButtonProps) => {
  const onClickKeywordHandler = useCallback(() => {
    onClickKeyword(keyword);
  }, [keyword, onClickKeyword]);

  const onClickDeleteHandler = useCallback(() => {
    onClickDeleteBtn(keyword);
  }, [keyword, onClickDeleteBtn]);

  return (
    <Container>
      <div id="keyword-area">
        <TimeMachineIcon />
        <DefaultText text={keyword} size={15} onClick={onClickKeywordHandler} />
      </div>
      <div id="keyword-deletebtn-area">
        <DefaultText text="삭제" size={15} onClick={onClickDeleteHandler} />
      </div>
    </Container>
  );
};
