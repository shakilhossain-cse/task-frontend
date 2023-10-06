
import Button from '@mui/material/Button';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <Button variant="contained">Hello world</Button>
     </QueryClientProvider>
    </>
  )
}

export default App
