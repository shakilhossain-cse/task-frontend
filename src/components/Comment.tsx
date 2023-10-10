import React, { useState } from "react";
import { IComment, IReply } from "../interfaces/type";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReplay } from "../api/commentReplayApi";
import Replay from "./Replay";
import Reaction from "./Reaction";
import ReactionCount from "./ReactionCount";
import { createCommentReaction } from "../api/reactionApi";

interface ICommentProp {
  comment: IComment;
  refetch: () => void;
}

const Comment: React.FC<ICommentProp> = ({ comment, refetch }) => {
  const queryClient = useQueryClient()

  const [replyInputs, setReplyInputs] = useState<{
    [commentId: number]: string;
  }>({});
  const { mutateAsync } = useMutation<
    void,
    Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: any; postId: number }
  >({
    mutationFn : ({ data, postId }) => createReplay(data, postId),
  });


// comment Reaction mutation 

  const { mutateAsync: createCommentReactionMutation } = useMutation<
  void,
  Error,
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



const handelAddCommentReaction = async (id: number) => {
  const commentId = Number(comment.id);
  createCommentReactionMutation({ commentId, reactionId:id });
};



  const handleAddReply = async (commentId: number) => {
    const replyInput = replyInputs[commentId];

    if (!replyInput) return;

    try {
      await mutateAsync({
        data: { body: replyInput },
        postId: Number(commentId),
      });
    } catch (error) {
      console.error("Error creating replay:", error);
    }

    setReplyInputs({ ...replyInputs, [commentId]: "" });
    refetch()
  };

  return (
    <>
      <Box p={2} border={1} borderColor="grey.200" marginBottom={2}>
        <Typography variant="h6">{comment.user.name}</Typography>
        <Typography variant="body1">{comment.body}</Typography>
        {comment.reactionsData &&
          comment.reactionsData.map((reaction) => (
            <ReactionCount reaction={reaction} />
          ))}
        <Reaction
          onAddReaction={handelAddCommentReaction}
          selectedReactions={comment.reactionsData}
        />
       
      </Box>

      <Box sx={{ width: "80%" }}>
        <TextField
          label="Add a Replay"
          variant="outlined"
          sx={{ marginTop: "5px" }}
          fullWidth
         
          value={replyInputs[comment.id] || ""}
          onChange={(e) =>
            setReplyInputs({ ...replyInputs, [comment.id]: e.target.value })
          }
         
        />
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={() => handleAddReply(comment.id)}
        >
          Replay
        </Button>

        {comment.replies &&
          comment.replies.map((reply: IReply) => (
            <Replay replay={reply} key={reply.id} />
          ))}
      </Box>
    </>
  );
};

export default Comment;
