import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openChat: {
    isChatSupport: false,
    isChatCustomer: false,
    isConversationSupport: false,
    isConversationCustomer: false,
  },
  supportList: [],
  customerList: [],
  supportMessages: [],
  supportConversationSelected: null,
  customerConversationSelected: null,
  isAction: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSupportList(state, action) {
      const data = action.payload;

      const sortedData = [...data].sort((a, b) => {
        const dateA = a?.conversation?.updatedAt
          ? new Date(a.conversation.updatedAt)
          : 0;
        const dateB = b?.conversation?.updatedAt
          ? new Date(b.conversation.updatedAt)
          : 0;
        return dateB - dateA;
      });

      state.supportList = sortedData;
    },
    setCustomerList(state, action) {
      const data = action.payload;
      const sortedData = [...data].sort((a, b) => {
        const dateA = a?.conversation?.updatedAt
          ? new Date(a.conversation.updatedAt)
          : 0;
        const dateB = b?.conversation?.updatedAt
          ? new Date(b.conversation.updatedAt)
          : 0;
        return dateB - dateA;
      });
      state.customerList = sortedData;
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
    setOpenChatAll(state, action) {
      state.openChat = action.payload;
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
