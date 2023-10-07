import { Navigate, Outlet } from "react-router-dom";
import { Box, Card, Container, styled } from "@mui/material";
import { useAuth } from "../../store/auth/Provider";
import { RoutePaths } from "../../enums/routes";

function AuthLayout() {
  const { user } = useAuth();
  if (user?.id) {
   return <Navigate to={RoutePaths.Home} />;
  }

  
  return (
    <CardContainer>
      <Container sx={{ py: 2 }} maxWidth="sm">
        <Card sx={{ py: 4, px: 2, m: 2 }}>
          <Outlet />
        </Card>
      </Container>
    </CardContainer>
  );
}

const CardContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
});

export default AuthLayout;
