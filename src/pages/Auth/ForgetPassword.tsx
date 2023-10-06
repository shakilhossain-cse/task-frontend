import {
    Button,
    Typography,
    Box,
    TextField,
    CircularProgress,
    Stack,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  import { RoutePaths } from "../../enums/routes";

  function ForgetPassword() {
  
    const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
    };
  const isDesiable = false;
    return (
      <form onSubmit={handleLogin}>
        <Typography variant="h4" gutterBottom align="center">
        Forget Password
        </Typography>
  
        <Stack gap={1.5}>  
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            required
          />
  
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="info"
            endIcon={isDesiable ? <CircularProgress size="1rem" /> : undefined}
          >
            Login
          </Button>
        </Stack>
        <Box marginY={1.5}>
          <Typography gutterBottom>
            {`Login your Account? `}
            <Link to={RoutePaths.Login}>Login here</Link>
          </Typography>
        </Box>
      </form>
    );
  }
  

  export default ForgetPassword