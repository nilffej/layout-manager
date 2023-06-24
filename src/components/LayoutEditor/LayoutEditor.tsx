import { COLORS } from "../../globals/Colors";
import { DragTypes } from "../../globals/ItemTypes";
import { EditorModule } from "./EditorModule";
import { EmptyRow } from "./EmptyRow";
import Group from "../../common/Group";
import { LayoutModule } from "../../state/layoutSlice";
import React from "react";
import { styled } from "styled-components";
import { useDrop } from "react-dnd";

const heights = [1, 2, 3, 4, 5, 6];

interface LayoutProps {
  layout: LayoutModule[][];
  setLayout: React.Dispatch<React.SetStateAction<LayoutModule[][]>>;
  rowHeights: number[];
  setRowHeights: React.Dispatch<React.SetStateAction<number[]>>;
}

function LayoutEditor({
  layout,
  setLayout,
  rowHeights,
  setRowHeights,
}: LayoutProps) {
  const findModule = (id: number) => {
    for (let i = 0; i < layout.length; ++i) {
      const module = layout[i].filter((c) => c.id === id);
      if (module.length > 0)
        return {
          module: module[0],
          row: i,
          index: layout[i].indexOf(module[0]),
        };
    }
    return {
      undefined,
      row: -1,
      index: -1,
    };
  };

  const moveModule = (id: number, atRow: number, atIndex: number) => {
    const { module, row, index } = findModule(id) as {
      module: {
        id: number;
        type: string;
      };
      row: number;
      index: number;
    };
    let newModules = layout.map((arr) => arr.slice());
    newModules[row].splice(index, 1);
    newModules[atRow].splice(atIndex, 0, module);
    setLayout(newModules);
  };

  const deleteModule = (id: number) => {
    const { row, index } = findModule(id);
    const newModules = layout.map((arr) => arr.slice());
    newModules[row].splice(index, 1);
    setLayout(newModules);
  };

  const setRowHeight = (ind: number, height: string) => {
    const newHeights = rowHeights.slice();
    newHeights.splice(ind, 1, parseInt(height));
    setRowHeights(newHeights);
  };

  const [, drop] = useDrop(() => ({ accept: DragTypes.MODULE }));
  return (
    <Wrapper ref={drop}>
      {layout.map((row, index) => {
        return (
          <Row key={`editorlayoutrow-${index}`}>
            <LayoutRow>
              {row.length === 0 ? (
                <EmptyRow row={index} moveModule={moveModule} />
              ) : (
                row.map((module, modind) => (
                  <EditorModule
                    key={`editorlayoutmodule-${index}-${modind}`}
                    id={module.id}
                    type={module.type}
                    moveModule={moveModule}
                    findModule={findModule}
                    deleteModule={deleteModule}
                  />
                ))
              )}
            </LayoutRow>
            <HeightSelector>
              <Group gap={0.5} column>
                <label>Height</label>
                <select
                  value={rowHeights[index]}
                  onChange={(e) => setRowHeight(index, e.target.value)}
                >
                  {heights.map((val) => (
                    <option value={val} key={`selectedColumn-${val}`}>
                      {val}
                    </option>
                  ))}
                </select>
              </Group>
            </HeightSelector>
          </Row>
        );
      })}
    </Wrapper>
  );
}

export default LayoutEditor;

const Wrapper = styled.div`
  width: 24em;
`;

const LayoutRow = styled.div`
  display: flex;
  gap: 4px;
  background-color: ${COLORS.DARKGRAY};
  padding: 4px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
`;

const HeightSelector = styled.div`
  margin-left: 0.5em;
  display: flex;
  align-items: center;

  label {
    font-size: x-small;
    color: ${COLORS.GRAY};
  }
`;
