import {
  Button,
  Typography,
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../enums/routes";

function Register() {
  const isMutating = false;
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>

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
          disabled={isMutating}
          endIcon={isMutating ? <CircularProgress size="1rem" /> : undefined}
        >
          Register
        </Button>
      </Stack>

      <Typography align="center" marginX={1}>
        or
      </Typography>

      <Typography marginY={1.5}>
        Already have an Account? <Link to={RoutePaths.Login}>Login here</Link>
      </Typography>
    </form>
  );
}

export default Register;
