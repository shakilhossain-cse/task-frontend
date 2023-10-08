import { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RoutePaths } from "../../enums/routes";
import { registerUser } from "../../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useAuthActions } from "../../store/auth/Provider";

function Register() {
  const { signUp } = useAuthActions();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutateAsync, isLoading } = useMutation(registerUser, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error:any) => {
      // Extract the error message from the server response
      const responseError =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(responseError);
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("re_password"),
    };

    const data = await mutateAsync(userData);
    signUp(data, () => {
      navigate(RoutePaths.CreateFeed);
    });
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>
      {errorMessage && (
        <Typography color="error" variant="body2" gutterBottom>
          {errorMessage}
        </Typography>
      )}
      <Stack gap={1.5}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          type="text"
          required
        />

        <TextField
          fullWidth
          label="Email"
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

        <TextField
          fullWidth
          label="Retype Password"
          name="re_password"
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
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress size="1rem" /> : undefined}
        >
          Register
        </Button>
      </Stack>

      <Typography marginY={1.5}>
        Already have an Account? <Link to={RoutePaths.Login}>Login here</Link>
      </Typography>
    </form>
  );
}

export default Register;
