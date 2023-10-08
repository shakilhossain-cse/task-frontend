import { IPostFeed } from "../interfaces/type";
import { HttpClient } from "../utils/axios";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createPost = async (data: any) => {
  const response = await HttpClient.post("/create", data);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllPost = async () => {
    const response = await HttpClient.get("/posts");
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPostData = async (id:number): Promise<IPostFeed> => {
  const response = await HttpClient.get(`/post/${id}`);
  return response.data;
}


export { createPost ,getAllPost, getPostData};
