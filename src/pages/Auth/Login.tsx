import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RoutePaths } from "../../enums/routes";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/authApi";
import { useAuthActions } from "../../store/auth/Provider";

export default function Login() {
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutateAsync, isLoading } = useMutation(loginUser, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      // Extract the error message from the server response
      const responseError =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(responseError);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const data = await mutateAsync(userData);
    signIn(data.user, () => {
      navigate(RoutePaths.CreateFeed);
    });
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      {errorMessage && (
        <Typography color="error" variant="body2" gutterBottom>
          {errorMessage}
        </Typography>
      )}
      <Stack gap={1.5}>
        <TextField
          fullWidth
          label="Phone/Email"
          name="email"
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
          endIcon={isLoading ? <CircularProgress size="1rem" /> : undefined}
        >
          Login
        </Button>
      </Stack>

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
