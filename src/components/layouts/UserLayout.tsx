import { Navigate, Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "../Navbar";
import { RoutePaths } from "../../enums/routes";
import { useAuth } from "../../store/auth/Provider";

function UserLayout() {

  const { user } = useAuth();
  if (!user) {
     return <Navigate to={RoutePaths.Login} />;
  }
  
  return (
    <Box>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}

export default UserLayout;
