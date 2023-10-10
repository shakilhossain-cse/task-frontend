import { HttpClient } from "../utils/axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createComment = async (data: {body:string}, postId: number): Promise<void> => {
    const response = await HttpClient.post(`posts/${postId}/comments`, data);
    return response.data;
  };


  export const createReplay = async (data: {body:string}, commentId: number): Promise<void> => {
    const response = await HttpClient.post(`comments/${commentId}/replies`, data);
    return response.data;
  };


  