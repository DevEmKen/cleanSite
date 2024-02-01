import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { UserType, FullUserType, TableStateType } from "../Types/TableTypes";

const firstState: TableStateType = {
  sortedProperty: "firstName",
  tableArr: [],
};

export const TableSlice = createSlice({
  name: "TableSlice",
  initialState: firstState,
  reducers: {
    sortByProperty(state, action) {
      const property = action.payload;
    },
    setTableData(state, action) {
      state.tableArr = action.payload;
    },
  },
});

export const { sortByProperty, setTableData } = TableSlice.actions;

export default TableSlice.reducer;
