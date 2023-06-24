import { COLORS } from "../globals/Colors";
import { styled } from "styled-components";

interface ModalProps {
  children: React.ReactElement | React.ReactElement[];
}

function Modal({ children }: ModalProps) {
  return (
    <Overlay>
      <ModalBox>{children}</ModalBox>
    </Overlay>
  );
}

export default Modal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${COLORS.OVERLAY};
`;

const ModalBox = styled.div`
  background: ${COLORS.BLACK};
  position: absolute;
  padding: 2em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
`;
