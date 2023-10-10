import { Box, TextField, Button } from "@mui/material";
import { CommentProps, } from "../interfaces/type";
import { useState } from "react";
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

  const handelAddComment = async () => {
    if (!comment) return;

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
      <Box>
        <TextField
          label="Add a comment"
          variant="outlined"
          sx={{ marginTop: "10px" }}
          fullWidth
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={1}
        />
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={handelAddComment}
        >
          Comment
        </Button>
      </Box>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} refetch={refetch}/>
        </div>
      ))}
    </div>
  );
};

export default Comments;
