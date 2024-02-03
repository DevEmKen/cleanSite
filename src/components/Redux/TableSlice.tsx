import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { UserType, FullUserType, TableStateType } from "../Types/TableTypes";

const firstState: TableStateType = {
  sortedProperty: "firstName",
  tableArr: [],
};

const customSort = (property: string) => {
  var ascDesc = 1;
  if (property[0] === "-") {
    ascDesc = -1;
    property = property.substring(1);
  }
  return function (a: any, b: any) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * ascDesc;
  };
};

export const TableSlice = createSlice({
  name: "TableSlice",
  initialState: firstState,
  reducers: {
    sortByProperty(state, action) {
      const property = action.payload;
      if (state.sortedProperty === property) {
        state.tableArr?.sort(customSort("-" + property));
        state.sortedProperty = "-" + property;
      } else {
        state.tableArr?.sort(customSort(property));
        state.sortedProperty = property;
      }
    },
    setTableData(state, action) {
      state.tableArr = action.payload;
    },
  },
});

export const { sortByProperty, setTableData } = TableSlice.actions;

export default TableSlice.reducer;
