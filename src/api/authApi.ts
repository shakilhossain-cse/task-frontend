import { HttpClient } from "../utils/axios";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registerUser = async (userData: any) => {
  const response = await HttpClient.post("/register", userData);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loginUser = async (userData:any) => {
    const response = await HttpClient.post("/login", userData);
    return response.data;
}
export { registerUser ,loginUser};