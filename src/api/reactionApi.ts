import { HttpClient } from "../utils/axios";

export const createPostReaction = async (postId:number, reactionId:number): Promise<void> => {
    const response = await HttpClient.post(`posts/${postId}/react/${reactionId}`);
    return response.data;
  };


  export const createCommentReaction = async (commentId:number, reactionId:number): Promise<void> => {
    const response = await HttpClient.post(`comments/${commentId}/react/${reactionId}`);
    return response.data;
  };


  export const createReplayReaction = async (replyId:number, reactionId:number): Promise<void> => {
    const response = await HttpClient.post(`replies/${replyId}/react/${reactionId}`);
    return response.data;
  };

export const getAllReaction = async () =>{
  const response = await HttpClient.get('reactions');
  return response.data;
}