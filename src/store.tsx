import { configureStore } from "@reduxjs/toolkit";

// SLICES
import { AppMechanics } from "./slices/AppMechanics";
import { EventSlice } from "./slices/EventSlice";
import { UserSlice } from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    AppMechanics: AppMechanics.reducer,
    EventSlice: EventSlice.reducer,
    UserSlice: UserSlice.reducer,
  },
});

export default store;
