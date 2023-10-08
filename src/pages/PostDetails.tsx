import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  TextField,
  Card,
  Box,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostData } from "../api/postApi";
// import UserProfile from "../components/UserProfile";
import { IPostFeed } from "../interfaces/type";
import Comment from "../components/Comment";
import { useState } from "react";
import { createComment } from "../api/commentReplayApi";



function PostDetails() {

  const { mutateAsync } = useMutation<
    void,
    Error,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { data: any; postId: number }
  >(({ data, postId }) => createComment(data, postId));
  const { postId } = useParams();
  const [comment, setComment] = useState<string>("");

  const { data, isLoading, isError,refetch } = useQuery<IPostFeed>(
    ["getPostData", postId],
    () => getPostData(Number(postId)),
   
  );

  
  if (isLoading) return "Loading...";

  if (isError) return "An error occurred.";

  const handelAddComment = async () => {
    if (!comment) return;

    try {
      await mutateAsync({ data: { body: comment }, postId: Number(postId) });
      setComment('');
      refetch();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  

  // Now you can use the 'data' in your component

  return (
    <Container>
      <Card>
        <CardActionArea>
          {data.post.images &&
            data.post.images.map((image) => (
              <CardMedia
                key={image}
                component="img"
                height="140"
                image={image}
                alt="green iguana"
              />
            ))}
          {/* <UserProfile data={data.post?.user} created_at={data.post.created_at}/> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data.post.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {data.reactions &&
            data.reactions.map((reaction) => (
              <Button size="small" color="primary">
                {reaction.title}
              </Button>
            ))}
        </CardActions>
      </Card>
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
      {data.post.comments && <Comment comments={data.post.comments} refetch={refetch} />}
    
    </Container>
  );
}

export default PostDetails;
