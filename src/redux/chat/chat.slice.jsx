import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openChat: {
    isChatSupport: false,
    isConversationSupport: false,
  },
  supportList: [],
  supportMessages: [],
  supportConversationSelected: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSupportList(state, action) {
      state.supportList = action.payload;
    },
    setSupportMessages(state, action) {
      state.supportMessages = action.payload;
    },
    setOpenChat(state, action) {
      const { key, value } = action.payload;
      state.openChat = {
        ...state.openChat,
        [key]: value,
      };
    },
    setUserOnlines(state, action) {
      state.userOnlines = action.payload;
    },
    setSupportConversationSelected(state, action) {
      state.supportConversationSelected = action.payload;
    },
  },
});

export const ChatActions = chatSlice.actions;
export default chatSlice.reducer;
