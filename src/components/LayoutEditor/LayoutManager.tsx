import { FC, memo, useContext, useRef, useState } from "react";
import { LayoutModule, updateLayout } from "../../state/layoutSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../common/Button";
import { COLORS } from "../../globals/Colors";
import { DndProvider } from "react-dnd";
import Group from "../../common/Group";
import { HTML5Backend } from "react-dnd-html5-backend";
import LayoutEditor from "./LayoutEditor";
import Modal from "../../common/Modal";
import { ModalContext } from "../../App";
import { RootState } from "../../state/store";
import { styled } from "styled-components";

export const LayoutManager: FC = memo(function LayoutManager() {
  const modalContext = useContext(ModalContext);
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(
    useSelector((state: RootState) => state.layout.layout)
  );
  const [rowHeights, setRowHeights] = useState(
    useSelector((state: RootState) => state.layout.rowHeights)
  );
  const selectedRow = useRef<HTMLSelectElement>(null);

  const addRow = () => {
    const newLayout = layout.map((arr) => arr.slice());
    newLayout.push([]);
    setLayout(newLayout);
    setRowHeights([...rowHeights, 3]);
  };

  const addModule = () => {
    const newLayout = layout.map((arr) => arr.slice());
    const newModule: LayoutModule = {
      id: Date.now(),
      type: "new",
    };
    if (selectedRow.current && selectedRow.current.value !== "") {
      newLayout[parseInt(selectedRow.current.value)].push(newModule);
    }
    setLayout(newLayout);
  };

  const saveConfiguration = () => {
    const indicesToRemove = [] as number[];
    const newLayout = layout.filter((row, index) => {
      if (row.length === 0) {
        indicesToRemove.push(index);
      }
      return row.length > 0;
    });

    const newRowHeights = rowHeights.slice();
    for (let i = indicesToRemove.length - 1; i >= 0; --i) {
      newRowHeights.splice(indicesToRemove[i], 1);
    }

    dispatch(updateLayout({ layout: newLayout, rowHeights: newRowHeights }));
    modalContext.toggleModal();
  };

  return (
    <Modal>
      <Group mb={1}>
        <Button onClick={addRow}>Add Row</Button>
        <Group gap={1}>
          <Group column>
            <RowSelectorLabel htmlFor="row-select">Row</RowSelectorLabel>
            <select
              id="row-select"
              name="row"
              ref={selectedRow}
              defaultValue={layout.length > 0 ? layout.length - 1 : undefined}
            >
              {layout.map((row, index) => (
                <option value={index} key={`selectedRow-${index}`}>
                  {index}
                </option>
              ))}
            </select>
          </Group>
          <Button onClick={addModule}>Add Module</Button>
        </Group>
      </Group>

      <DndProvider backend={HTML5Backend}>
        <LayoutEditor
          layout={layout}
          setLayout={setLayout}
          rowHeights={rowHeights}
          setRowHeights={setRowHeights}
        />
      </DndProvider>

      <div style={{ marginBottom: "1em" }}></div>

      <div style={{ float: "right" }}>
        <Group gap={1}>
          <Button onClick={modalContext.toggleModal} color={COLORS.RED}>
            Cancel
          </Button>
          <Button onClick={saveConfiguration} color={COLORS.GREEN}>
            Save
          </Button>
        </Group>
      </div>
    </Modal>
  );
});

const RowSelectorLabel = styled.label`
  color: ${COLORS.GRAY};
  height: min-content;
  font-size: x-small;
`;
