import { Button, Box, TextField, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import defaultImage from "../assets/img/default-image.png";

function CreateFeed() {
  return (
    <form>
      <Stack gap={1.5} sx={{ marginTop: "1rem" }}>
        <TextField fullWidth placeholder="" multiline minRows={4} />
        <Box display={"flex"} sx={{ cursor: "pointer" }}>
          <AddIcon />
          <Typography fontWeight={600}>Select Image</Typography>
        </Box>
        <Stack gap={1} direction={"row"}>
          <Box sx={{position:"relative"}}>
            <img
              src={defaultImage}
              alt="selected image"
              style={{ height: "80px" }}
            />
            <ClearIcon sx={{position :"absolute", top: -5, right:-5, background:"red", color:"white", borderRadius:"50%", fontSize:"20px" , p:'3px', cursor: "pointer"}} />
          </Box>
          
        </Stack>
        <Button variant="contained">Create</Button>
      </Stack>
    </form>
  );
}

export default CreateFeed;
