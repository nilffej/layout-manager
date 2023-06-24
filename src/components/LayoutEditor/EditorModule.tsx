import { useDrag, useDrop } from "react-dnd";

import { COLORS } from "../../globals/Colors";
import { DragTypes } from "../../globals/ItemTypes";
import type { FC } from "react";
import { RxCross2 } from "react-icons/rx";
import { memo } from "react";
import { styled } from "styled-components";

interface EditorModuleProps {
  id: number;
  type: string;
  moveModule: (id: number, toRow: number, to: number) => void;
  findModule: (id: number) => { row: number; index: number };
  deleteModule: (id: number) => void;
}

interface Item {
  id: number;
  originalRow: number;
  originalIndex: number;
}

export const EditorModule: FC<EditorModuleProps> = memo(function EditorModule({
  id,
  type,
  moveModule,
  findModule,
  deleteModule,
}) {
  const originalIndex = findModule(id).index;
  const originalRow = findModule(id).row;
  const [, drag] = useDrag(
    () => ({
      type: DragTypes.MODULE,
      item: { id, originalRow, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalRow, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveModule(droppedId, originalRow, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveModule]
  );

  const [, drop] = useDrop(
    () => ({
      accept: DragTypes.MODULE,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { row: overRow, index: overIndex } = findModule(id);
          moveModule(draggedId, overRow, overIndex);
        }
      },
    }),
    [findModule, moveModule]
  );

  return (
    <Wrapper ref={(node) => drag(drop(node))}>
      <DeleteModuleButton onClick={() => deleteModule(id)}>
        <RxCross2 />
      </DeleteModuleButton>
      <TypeText>{type}</TypeText>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  height: 3em;
  width: 100%;
  padding: 4px;
  border: 1px solid black;
  background-color: white;
  cursor: move;
`;

const DeleteModuleButton = styled.div`
  position: absolute;
  color: ${COLORS.DARKGRAY};
  top: 2px;
  right: 2px;
  cursor: pointer;
`;

const TypeText = styled.div`
  max-width: 80%;
  font-size: small;
`;
