import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LayoutModule {
  id: number;
  type: string;
}

export interface LayoutPayload {
  layout: LayoutModule[][];
  rowHeights: number[];
}

export interface LayoutState {
  layout: LayoutModule[][];
  rowHeights: number[];
}

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    rowHeights: [3, 3],
    layout: [
      [
        {
          id: 1,
          type: "1",
        },
        {
          id: 2,
          type: "2",
        },
        {
          id: 3,
          type: "3",
        },
      ],
      [
        {
          id: 4,
          type: "4",
        },
        {
          id: 5,
          type: "5",
        },
      ],
    ] as LayoutModule[][],
  },
  reducers: {
    updateLayout: (
      state: LayoutState,
      action: PayloadAction<LayoutPayload>
    ) => {
      state.layout = action.payload.layout;
      state.rowHeights = [...action.payload.rowHeights];

      console.log(state.layout, state.rowHeights);
    },
  },
});

export const { updateLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
