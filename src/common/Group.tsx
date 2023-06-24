import { styled } from "styled-components";

interface GroupProps {
  children?: React.ReactElement[];
  gap?: number;
  column?: boolean | number;
  mb?: number;
}

function Group({ children, gap, column, mb }: GroupProps) {
  return (
    <Wrapper gap={gap} column={column && +column} mb={mb}>
      {children}
    </Wrapper>
  );
}

export default Group;

const Wrapper = styled.div<GroupProps>`
  display: flex;
  ${({ gap }) => (gap ? `gap: ${gap}em` : "justify-content: space-between")};
  align-items: center;
  ${({ column }) => (column ? "flex-direction: column" : undefined)}
  ${({ mb }) => (mb ? `margin-bottom: ${mb}em` : undefined)}
`;
