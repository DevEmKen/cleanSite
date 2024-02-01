import { configureStore } from "@reduxjs/toolkit";
import FileTreeSlice from "./components/Redux/FileTreeSlice";
import TableSlice from "./components/Redux/TableSlice.tsx";

const store = configureStore({
  reducer: { FileTreeSlice, TableSlice },
});

export default store;
