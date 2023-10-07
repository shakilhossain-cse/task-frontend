import Stack from '@mui/material/Stack';
import PostFeed from "../components/Feed"


function Home() {
  return (
    <Stack gap={2}>
        <PostFeed/>
        <PostFeed/>
        <PostFeed/>
        <PostFeed/>
    </Stack>
  )
}

export default Home