import React from "react";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CommentIcon from "@mui/icons-material/Comment";

import { IPostFeed } from "../interfaces/type";
import { Link } from "react-router-dom";
import { RoutePaths } from "../enums/routes";
import UserProfile from "./UserProfile";
import Reaction from "./Reaction";
import { useReaction } from "../store/reaction/Provider";
import ReactionCount from "./ReactionCount";

const PostFeed: React.FC<IPostFeed> = ({ post }) => {
  const { reactions, addPostReaction } = useReaction();

  const handelAddPostReaction = async (id: number) => {
    await addPostReaction(Number(post.id), id);
  };


  return (
    <Card>
      <UserProfile data={post.user} created_at={post.created_at} />
      {post.images.length ? (
        <CardMedia
          component="img"
          height="194"
          image={post.images[0]}
          alt="Paella dish"
        />
      ) : (
        ""
      )}
      <Link to={`${RoutePaths.PostDetails}/${post.id}`}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.title}
          </Typography>
        </CardContent>
      </Link>
        {post.reactionsData && post.reactionsData.map(reaction =>  <ReactionCount reaction={reaction} />)}
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {reactions && <Reaction onAddReaction={handelAddPostReaction} selectedReactions={post.reactionsData} />}
        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default PostFeed;
