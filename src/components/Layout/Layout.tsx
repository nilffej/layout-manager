import Module from "./Module";
import { RootState } from "../../state/store";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

function Layout() {
  const { layout, rowHeights } = useSelector(
    (state: RootState) => state.layout
  );
  const totalHeight = rowHeights.reduce((total, height) => total + height);

  return (
    <Wrapper>
      {layout.map((row, index) => (
        <LayoutRow
          key={`layoutrow-${index}`}
          height={rowHeights[index] / totalHeight}
        >
          {row.map((module, index) => (
            <Module key={`module-${index}`} {...module} />
          ))}
        </LayoutRow>
      ))}
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const LayoutRow = styled.div<{ height: number }>`
  width: 100%;
  display: flex;
  gap: 0.5em;
  height: ${({ height }) => `${height * 90}vh`};
`;
