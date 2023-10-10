export interface IPost {
  id: number;
  user?: {
    name: string;
  };
  title: string;
  images: string[];
  created_at: string;
  comments: IComment[];
  reactionsData : IUserReaction[];
}
export interface IReaction {
  id: number;
  title: string;
}

export interface IUserReaction {
  title:string;
  count:number
}

export interface IPostFeed {
  post: IPost;
}

export interface IReply {
  id: number;
  body: string;
  user: {
    name: string;
  };
  reactionsData : IUserReaction[];
}

export interface IComment {
  id: number;
  body: string;
  user: {
    name: string;
  };
  replies: IReply[];
  reactionsData : IUserReaction[];
}

export interface CommentProps {
  comments: IComment[];
  postid:number,
  refetch: () => void;
}
