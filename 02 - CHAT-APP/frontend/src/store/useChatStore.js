import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [], // all the users except me
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  // Get all the users except me
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data }); // Getting all the users except me
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Get messages - userId - of the receiver
  // You are the sender if you are logged in
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send message to the selected user
  // * We don't need socket.io-client for the sender because we get the messages instantly on our side (Maybe)
  // We just need to worry about the receiver that's why we use socket.io (backend) and socket.io-client (frontend)
  sendMessage: async (messageData) => {
    set({ isSendingMessage: true });
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket; // from useAuthStore

    // Getting newMessage from backend (message.controller.js - sendMessage)
    // It only runs for the reciever

    socket.on("newMessage", (newMessage) => {
      // if (newMessage.senderId !== selectedUser._id) return;
      // if newMessage.senderId === selectedUser._id --> Set the message
      // if sender(vip - id - 34) === selectedUser(vip - id - 34) --> set the message
      // else if sender(vip - id - 34) !== seletedUser(emma - id - 35) --> Don't set the message - just return;
      // because if we set the message in second case - then let's see what happens --->
      // Inside ChatContainer.jsx --> sender - vip, selected - emma, authUser - jane
      //    selected - emma
      //    useEffect runs to getMessages
      //    As selected user is Emma that doesn't have any message history with the authUser (ChatContainer.jsx)
      //    that means messages = []
      //    then subscribeToMessages runs
      //    if there's a logic like -->
      //          if (newMessage.senderId (vip) !== selectedUser._id (emma)) return;
      //          we won't get any message.
      //          because if vip sent the message, then if we want to see the message, we'll have to select vip's profile only.
      //          if the profile is not the same,there's no use showing the messages.
      //    else if there's no logic -->
      //          newMessage will be set
      //          then the message will be shown in that selectedUser's chat section
      //          because message.senderId (vip) !== authUser._id (jane - suppose the authUser is jane)
      //          that means - the message will be set on the start with the profile photo of the selected user (this code is implemented inside ChatContainer.jsx)
      //          Second time, when the message is sent
      //          selected user is the same but message got changed
      //          again in getMessages(selectedUser._id) - we won't get any messages
      //          but when subscribeToMessages() runs
      //          We'll get the newMessage from backend sent to frontend
      //          It'll be set to messages.
      //    then same thing will keep going on....

      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
