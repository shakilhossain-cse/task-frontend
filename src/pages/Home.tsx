import Stack from '@mui/material/Stack';

import { useQuery } from '@tanstack/react-query';
import { getAllPost } from '../api/postApi';
import { IPost } from '../interfaces/type';
import PostFeed from '../components/Feed';


function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getAllData'],
    queryFn: getAllPost,
    initialData: { posts: [] , reactions:[] },
  });

  if (isLoading) return 'Loading...'

  if (isError) return 'An error has occurred: ';
  
   return (
    <Stack gap={2}>
    {data && data.posts.map((item: IPost, index: number) => (
      <PostFeed key={index} post={item} reactions={data.reactions} />
    ))}
  </Stack>
  )
}

export default Home