import { configureStore } from "@reduxjs/toolkit";
import FileTreeSlice from "./components/Redux/FileTreeSlice";

const store = configureStore({
  reducer: { FileTreeSlice },
});

export default store;
