import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./store/auth/Provider";
import AppProvider from "./store/app/Provider";

export const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
