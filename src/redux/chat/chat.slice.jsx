import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openChat: {
    isChatDoctor: false,
    isChatSupport: false,
    isChatCustomer: false,
    isConversationSupport: false,
    isConversationCustomer: false,
    isConversationDoctor: false,
  },
  supportList: [],
  customerList: [],
  doctorList: [],
  supportMessages: [],
  doctorMessages: [],
  supportConversationSelected: null,
  customerConversationSelected: null,
  doctorConversationSelected: null,
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

    setDoctorList(state, action) {
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
      state.doctorList = sortedData;
    },
    setSupportMessages(state, action) {
      state.supportMessages = action.payload;
    },
    setDoctorMessages(state, action) {
      state.doctorMessages = action.payload;
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
    setDoctorConversationSelected(state, action) {
      state.doctorConversationSelected = action.payload;
    },
  },
});

export const ChatActions = chatSlice.actions;
export default chatSlice.reducer;
