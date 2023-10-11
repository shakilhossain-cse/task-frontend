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
import { Link, useParams } from "react-router-dom";
import { RoutePaths } from "../../enums/routes";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/authApi";

function ResetPassword() {
    const { token } = useParams();
    const [alert, setAlert] = useState<{
      type: "success" | "error";
      message: string;
    } | null>(null);
  
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { mutateAsync: resetUserPassword, isLoading } = useMutation(
    resetPassword,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: () => {
        setAlert({ type: "success", message: "Password reset successfully" });
      },
      onError: (error: any) => {
        const responseError =
          error.response?.data?.message || "An error occurred";

        setAlert({ type: "error", message: responseError });
      },
    }
  );

  const handleSendResetPassword = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setAlert({ type: 'error', message: 'Passwords do not match' });
        return;
      }

      try {
        await resetUserPassword({ token, password });
        setAlert({ type: 'error', message: "password Change successfully " });
      } catch (error) {
        const responseError = error.response?.data?.message || 'An error occurred';
        setAlert({ type: 'error', message: responseError });

      }
  };

  return (
    <form onSubmit={handleSendResetPassword}>
      <Typography variant="h4" gutterBottom align="center">
        Reset Password
      </Typography>
      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
      <Stack gap={1.5}>
        <TextField
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Change Password
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

export default ResetPassword;
