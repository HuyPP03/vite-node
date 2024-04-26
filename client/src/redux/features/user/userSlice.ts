import { createSlice } from "@reduxjs/toolkit";

interface UserSlice {
  name: string | null;
  email: string | null;
  token: string | null;
}

const initialState: UserSlice = {
  name: null,
  email: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state) => {
      const data = localStorage.getItem("user");
      if (data) {
        state.name = JSON.parse(data).name;
        state.email = JSON.parse(data).email;
        state.token = JSON.parse(data).token;
      } else {
        state.name = null;
        state.email = null;
        state.token = null;
      }
    },
  },
});

export const { userInfo } = userSlice.actions;

export default userSlice.reducer;
