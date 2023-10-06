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

export default function Login() {

  const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
const isDesiable = false;
  return (
    <form onSubmit={handleLogin}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      <Stack gap={1.5}>
        <TextField
          fullWidth
          label="Phone/Email"
          name="username"
          variant="outlined"
          type="text"
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          variant="outlined"
          type="password"
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

      <Typography align="center" marginY={1}>
        or
      </Typography>

      <Box marginY={1.5}>
        <Typography gutterBottom>
          {`Don't have an Account? `}

          <Link to={RoutePaths.Register}>Register here</Link>
        </Typography>

        <Link to={RoutePaths.ForgetPassword}>Forget Password?</Link>
      </Box>
    </form>
  );
}
