import { Box, TextField, Button } from "@mui/material";
import { CommentProps, } from "../interfaces/type";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../api/commentReplayApi";
// import Reaction from "./Reaction";
import Comment from "./Comment";

const Comments: React.FC<CommentProps> = ({ comments, postid, refetch }) => {
  const [comment, setComment] = useState<string>("");


  const { mutateAsync: createCommentMutation } = useMutation<
    void,
    Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: any; postId: number }
  >(({ data, postId }) => createComment(data, postId));

  const handelAddComment = async (event:React.FormEvent) => {
    event.preventDefault()
    if (!comment) return;
console.log('hit from ');

    try {
      await createCommentMutation({
        data: { body: comment },
        postId: Number(postid),
      });
      setComment("");
      refetch();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handelAddComment}>
        <TextField
          label="Add a comment"
          variant="outlined"
          sx={{ marginTop: "10px" }}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          type="submit"
        >
          Comment
        </Button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} refetch={refetch}/>
        </div>
      ))}
    </div>
  );
};

export default Comments;
