import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openChat: {
    isChatSupport: false,
    isConversationSupport: false,
    isConversationCustomer: false,
  },
  supportList: [],
  customerList: [],
  supportMessages: [],
  supportConversationSelected: null,
  customerConversationSelected: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSupportList(state, action) {
      const data = action.payload;
      const res = data.sort((a, b) => {
        const dateA = a?.conversation?.updatedAt
          ? new Date(a.conversation.updatedAt)
          : 0;
        const dateB = b?.conversation?.updatedAt
          ? new Date(b.conversation.updatedAt)
          : 0;
        return dateB - dateA;
      });

      state.supportList = res;
    },
    setCustomerList(state, action) {
      const data = action.payload;
      const res = data.sort((a, b) => {
        const dateA = a?.conversation?.updatedAt
          ? new Date(a.conversation.updatedAt)
          : 0;
        const dateB = b?.conversation?.updatedAt
          ? new Date(b.conversation.updatedAt)
          : 0;
        return dateB - dateA;
      });

      state.customerList = res;
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
    setCustomerConversationSelected(state, action) {
      state.customerConversationSelected = action.payload;
    },
  },
});

export const ChatActions = chatSlice.actions;
export default chatSlice.reducer;
