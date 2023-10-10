import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./store/auth/Provider";
import ReactionProvider from "./store/reaction/Provider";

export const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ReactionProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ReactionProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
