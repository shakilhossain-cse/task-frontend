export interface IPost {
  id:number;
  user?: {
    name: string;
  };
  title: string;
  images: string[]; 
  created_at: string; 
  comments: IComment[];
}


export interface IPostFeed {
  post: IPost;
  reactions: {id:number,title:string}[]
}


export interface IReply {
  id: number;
  body: string;
  user: {
    name: string;
  };
}

export interface IComment {
  id: number;
  body: string;
  user: {
    name: string;
  };
  replies: IReply[];
}

export interface CommentProps {
  comments: IComment[];
  refetch: () => void
}