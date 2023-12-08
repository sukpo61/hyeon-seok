import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import deletePartyDetail from "src/api/deletePartyDetail";
import { DefaultButton } from "@components/common/DefaultButton";

interface PartyDeleteConfirmPopupProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const PopUpDescription = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 40px;
`;
const PartyDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 400px;
  background-color: white;
  border-radius: 12px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: white;
  border-radius: 12px;
`;

const PartyDeleteConfirmPopup = ({
  setIsOpen,
  id,
}: PartyDeleteConfirmPopupProps) => {
  const { mutateAsync: partyDetailDelete } = useMutation({
    mutationFn: deletePartyDetail,
  });

  const onClickDeleteHandler = () => {
    partyDetailDelete({ id });
  };

  const onClickCloseHandler = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <PartyDetailContainer>
        <PopUpDescription>정말 삭제하시겠습니까?</PopUpDescription>
        <ButtonContainer>
          <DefaultButton
            text="삭제"
            onClick={onClickDeleteHandler}
            style={{
              width: "100px",
            }}
          />
          <DefaultButton
            text="취소"
            onClick={onClickCloseHandler}
            buttonType="secondary"
            style={{
              width: "100px",
            }}
          />
        </ButtonContainer>
      </PartyDetailContainer>
    </Container>
  );
};

export default PartyDeleteConfirmPopup;
