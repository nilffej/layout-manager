import { COLORS } from "../../globals/Colors";
import { DragTypes } from "../../globals/ItemTypes";
import type { FC } from "react";
import { memo } from "react";
import { styled } from "styled-components";
import { useDrop } from "react-dnd";

interface EmptyRowProps {
  row: number;
  moveModule: (id: number, toRow: number, to: number) => void;
}

interface Item {
  id: number;
  originalRow: number;
  originalIndex: number;
}

export const EmptyRow: FC<EmptyRowProps> = memo(function EmptyRow({
  row,
  moveModule,
}) {
  const [, drop] = useDrop(
    () => ({
      accept: DragTypes.MODULE,
      hover({ id: draggedId }: Item) {
        moveModule(draggedId, row, 0);
      },
    }),
    [moveModule]
  );
  return (
    <Placeholder ref={(node) => drop(node)}>
      <div>Empty Row</div>
    </Placeholder>
  );
});

const Placeholder = styled.div`
  position: relative;
  height: 3em;
  width: 100%;
  padding: 4px;
  background-color: ${COLORS.TRANSPARENT};

  div {
    color: ${COLORS.DARKGRAY};
    font-style: italic;
    font-size: smaller;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
