import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Card,
  Box,
} from "@mui/material";
import {  useQuery } from "@tanstack/react-query";
import { getPostData } from "../api/postApi";
import { IPostFeed } from "../interfaces/type";
import Comments from "../components/Comments";
import Reaction from "../components/Reaction";
import { useReaction } from "../store/reaction/Provider";
import ReactionCount from "../components/ReactionCount";

function PostDetails() {
  const { addPostReaction } = useReaction();

  const { postId } = useParams();


  const { data, isLoading, isError, refetch } = useQuery<IPostFeed>(
    ["getPostData", postId],
    () => getPostData(Number(postId))
  );
  

  if (isLoading) return "Loading...";

  if (isError) return "An error occurred.";

 

  const handelAddPostReaction = async (id: number) => {
    addPostReaction(Number(postId), id);
    refetch()
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
        <Box>
          {data.post.reactionsData && data.post.reactionsData.map((reaction, index) => <ReactionCount key={index} reaction={reaction}/>)}
          </Box>
        <CardActions>
          <Reaction onAddReaction={handelAddPostReaction} selectedReactions={data.post.reactionsData}/>
        </CardActions>
      </Card>

      {data.post.comments && (
        <Comments comments={data.post.comments} postid={data.post.id} refetch={refetch} />
      )}
    </Container>
  );
}

export default PostDetails;
