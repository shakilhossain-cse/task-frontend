import { HttpClient } from "../utils/axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registerUser = async (userData: any) => {
  const response = await HttpClient.post("/register", userData);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loginUser = async (userData: any) => {
  const response = await HttpClient.post("/login", userData);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logoutUser = async () => {
  const response = await HttpClient.post("/logout");
  return response.data;
};


const sendResetPasswordLink = async (userData: any) => {
  const response = await HttpClient.post("/forget-password", userData);
  return response.data;
};


const resetPassword = async (userData: any) => {
  const response = await HttpClient.post("/password/reset", userData);
  return response.data;
};

export { registerUser, loginUser, logoutUser, sendResetPasswordLink ,resetPassword};
