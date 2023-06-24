import Button from "../../common/Button";
import { COLORS } from "../../globals/Colors";
import { LayoutManager } from "../LayoutEditor/LayoutManager";
import { ModalContext } from "../../App";
import { styled } from "styled-components";
import { useContext } from "react";

function Navbar() {
  const modalContext = useContext(ModalContext);

  return (
    <Wrapper>
      <Side>
        <Title>Layout Manager</Title>
        <Button onClick={modalContext.toggleModal}>Edit Layout</Button>
        {modalContext.modalActive ? <LayoutManager /> : undefined}
      </Side>
    </Wrapper>
  );
}

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  height: 3em;
  width: 100%;
  padding: 0em 1em 0em;
  justify-content: space-between;
  box-sizing: border-box;
  background: ${COLORS.BLACK};
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 1.5em;
  color: #ffffff;
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
