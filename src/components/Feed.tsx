import React from 'react'
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CommentIcon from "@mui/icons-material/Comment";

import {IPostFeed } from '../interfaces/type';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../enums/routes';
import UserProfile from './UserProfile';


const PostFeed: React.FC<IPostFeed> = ({post,reactions}) => {

  return (
    <Card>
      <UserProfile data={post.user} created_at={post.created_at}/>
      {post.images.length ? (
        <CardMedia
          component="img"
          height="194"
          image={post.images[0]}
          alt="Paella dish"
        />
      ) : (
        ''
      )}
      <Link to={`${RoutePaths.PostDetails}/${post.id}`}>
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.title}
        </Typography>
      </CardContent>
      </Link>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {reactions.map((reaction) => (
          <IconButton aria-label="add to favorites" key={reaction.id}>
            {reaction.title}
          </IconButton>
        ))}

        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
 export default  PostFeed