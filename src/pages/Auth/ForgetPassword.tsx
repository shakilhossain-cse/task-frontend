import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Stack,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../enums/routes";
import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordLink } from "../../api/authApi";

function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);


  const { mutateAsync:sendRestPasswordLink, isLoading } = useMutation(sendResetPasswordLink, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: () => {
      setAlert({ type: 'success', message: 'Password reset link sent successfully' });
    },
    onError: (error: any) => {
      // Extract the error message from the server response
      const responseError =
        error.response?.data?.message || "An error occurred";

      setAlert({ type: 'error', message: responseError });
      
    },
  });


  const handleSendResetPassword = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRestPasswordLink({ email });
  };

  return (
    <form onSubmit={handleSendResetPassword}>
      <Typography variant="h4" gutterBottom align="center">
        Forget Password
      </Typography>
      {alert && (
        <Alert severity={alert.type}>
          {alert.message}
        </Alert>
      )}
      <Stack gap={1.5}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
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
          Send Reset Password Link
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

export default ForgetPassword;
