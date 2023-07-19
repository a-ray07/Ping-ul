import {
  deleteUserUrl,
  fetchUserUrl,
} from "../axios.config/contactaxios.config";

export const fetchuserApi = async () => {
  try {
    const response = await fetchUserUrl.get("");
    console.log(
      "Response for user contacts list fetched successfully:",
      response.data
    );
    const rep = { isSuccess: true, data: response.data };
    return rep;
  } catch (error) {
    console.log(error);
    const errorResponse = {
      isSuccess: false,
      errorMessage: "Error occurred while fetching contact list",
    };
    return errorResponse;
  }
};

export const deleteuserApi = async (userId) => {
  try {
    const response = await deleteUserUrl.put(`/${userId}`);
    console.log("Response for user deleted successfully:", response.data);
    const rep = { isSuccess: true, data: response.data };
    return rep;
  } catch (error) {
    console.log(error);
    const errorResponse = {
      isSuccess: false,
      errorMessage: "Error occurred deleting user",
    };
    return errorResponse;
  }
};
