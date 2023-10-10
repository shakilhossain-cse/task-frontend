import React, { createContext, useState, useEffect } from "react";
import { IReaction } from "../../interfaces/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCommentReaction,
  createPostReaction,
  createReplayReaction,
  getAllReaction,
} from "../../api/reactionApi";

interface ReactionContextType {
  reactions: IReaction[];
  addPostReaction: (postId: number, id: number) => void;
  addCommentReaction: (commentId: number, reactionId: number) => void;
  addReplayReaction: (replayId: number, reactionId: number) => void;
}

const initialReactionContext: ReactionContextType = {
  reactions: [],
  addPostReaction: () => {},
  addCommentReaction: () => {},
  addReplayReaction: () => {},
};

const ReactionContext = createContext<ReactionContextType>(
  initialReactionContext
);

const ReactionProvider: React.FC<React.PropsWithChildren> = (props) => {
  const queryClient = useQueryClient()
  const [reactions, setReactions] = useState<IReaction[]>([]);
  const { data, status } = useQuery({
    queryKey: ["getAllReactions"],
    queryFn: getAllReaction,
  });

  useEffect(() => {
    if (status === "success") {
      setReactions(data);
    }
  }, [status, data]);

  const { mutateAsync: createPostReactionMutation } = useMutation<
    void,
    Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { postId: number; reactionId: number }
  >({
    mutationFn: ({ postId, reactionId }) =>
      createPostReaction(postId, reactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPostData"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllData"],
      });
    },
  });

  const { mutateAsync: createCommentReactionMutation } = useMutation<
    void,
    Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { commentId: number; reactionId: number }
  >({
    mutationFn: ({ commentId, reactionId }) =>
      createCommentReaction(commentId, reactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPostData"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllData"],
      });
    },
  });

  const { mutateAsync: createReplayReactionMutation } = useMutation<
    void,
    Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { replayId: number; reactionId: number }
  >({
    mutationFn: ({ replayId, reactionId }) =>
      createReplayReaction(replayId, reactionId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getPostData"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllData"],
      });
    },
  });

  const addPostReaction = async (postId: number, id: number) => {
    try {
      await createPostReactionMutation({
        postId: Number(postId),
        reactionId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addCommentReaction = async (commentId: number, id: number) => {
    try {
      await createCommentReactionMutation({
        commentId: Number(commentId),
        reactionId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addReplayReaction = async (replayId: number, id: number) => {
    try {
      await createReplayReactionMutation({
        replayId: Number(replayId),
        reactionId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue: ReactionContextType = {
    reactions,
    addPostReaction,
    addCommentReaction,
    addReplayReaction,
  };

  return (
    <ReactionContext.Provider value={contextValue}>
      {props.children}
    </ReactionContext.Provider>
  );
};

export const useReaction = () => React.useContext(ReactionContext);
export default ReactionProvider;