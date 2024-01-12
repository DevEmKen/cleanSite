import { configureStore } from "@reduxjs/toolkit";
import FileTreeSlice from "./components/Redux/FileTreeSlice";

const store = configureStore({
  reducer: { fileTreeReds: FileTreeSlice.reducer },
});

export default store;
