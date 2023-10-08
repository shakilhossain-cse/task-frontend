import { Box, Typography, TextField, Button } from "@mui/material";
import { CommentProps, IReply } from "../interfaces/type";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createReplay } from "../api/commentReplayApi";

const Comment: React.FC<CommentProps> = ({ comments, refetch }) => {
    const [replyInputs, setReplyInputs] = useState<{ [commentId: number]: string }>({});
    const { mutateAsync } = useMutation<
    void,
    Error,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: any; postId: number }
  >(({ data, postId }) => createReplay(data, postId));

    const handleAddReply = async(commentId: number) => {
        const replyInput = replyInputs[commentId];
      
        if (!replyInput) return;

        try {
          await mutateAsync({ data: { body: replyInput }, postId: Number(commentId) });
          refetch();
        } catch (error) {
          console.error("Error creating replay:", error);
        }
      
        setReplyInputs({ ...replyInputs, [commentId]: '' });
      };

      console.log(comments)
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Box p={2} border={1} borderColor="grey.200" marginBottom={2}>
          <Typography variant="h6">{comment.user.name}</Typography>
            <Typography variant="body1">{comment.body}</Typography>
          </Box>
          <Box sx={{width:"80%"}}>
            <TextField
              label="Add a Replay"
              variant="outlined"
              sx={{ marginTop: "5px" }}
              fullWidth
              multiline
              value={replyInputs[comment.id] || ""}
              onChange={(e) =>
                setReplyInputs({ ...replyInputs, [comment.id]: e.target.value })
              }
              rows={1}
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
                <Box
                  key={reply.id}
                  pl={4}
                  pr={2}
                  border={1}
                  borderColor="grey.200"
                  marginBottom={1}
                >
                  <Typography variant="h6">{reply.user.name}</Typography>
                  <Typography variant="body1">{reply.body}</Typography>
                </Box>
              ))}
          </Box>
        </div>
      ))}
    </div>
  );
};

export default Comment;
