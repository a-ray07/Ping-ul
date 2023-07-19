import axios from "axios";
import {
  getmessageUrl,
  personalmessageUrl,
} from "../axios.config/messageaxios.config";

export const personalmessageApi = async (
  token,
  conversationGroupId,
  messageText,
  senderId
) => {
  try {
    const response = await personalmessageUrl.post(
      "",
      {
        conversation_group_id: conversationGroupId,
        text: messageText,
        sender_id: senderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response for message sent successfully:", response.data);
    const rep = { isSuccess: true, data: response.data };
    return rep;
  } catch (error) {
    console.log(error);
    const errorResponse = {
      isSuccess: false,
      errorMessage: "Error occurred while sending message",
    };
    return errorResponse;
  }
};

export const getmessageApi = async (
  page,
  limit,
  conversationGroupId,
  token
) => {
  try {
    const response = await getmessageUrl.get(
      `/messages/${conversationGroupId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response for message fetched successfully:", response.data);
    const rep = { isSuccess: true, data: response.data };
    return rep;
  } catch (error) {
    console.log(error);
    const errorResponse = {
      isSuccess: false,
      errorMessage: "Error occurred while fetching message",
    };
    return errorResponse;
  }
};

export const deletemessageApi = async (messageId) => {
  try {
    const response = await axios.delete(
      `https://ping-ul-backend.loca.lt/api/messages/${messageId}`
    );
    console.log("Response for message deleted successfully:", response.data);
    const rep = { isSuccess: true, data: response.data };
    return rep;
  } catch (error) {
    console.log(error);
    const errorResponse = {
      isSuccess: false,
      errorMessage: "Error occurred while deleting the message",
    };
    return errorResponse;
  }
};
