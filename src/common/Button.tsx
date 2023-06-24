import { COLORS } from "../globals/Colors";
import { styled } from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  children?: React.ReactNode;
}

function Button({ color, onClick, children }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} color={color}>
      {children}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{ color?: string }>`
  color: white;
  background-color: ${(props) => (props.color ? props.color : COLORS.DARKGRAY)};
  border: none;
  padding: 0.5em;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: white;
  }
`;
