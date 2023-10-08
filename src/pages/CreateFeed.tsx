import { FC, ChangeEvent, useRef, useState } from "react";
import { Stack, TextField, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/postApi";
import { RoutePaths } from "../enums/routes";
import { useNavigate } from "react-router-dom";

const CreateFeed: FC = () => {
  const { mutateAsync } = useMutation(createPost);
  const [title, setTitle] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const navigate= useNavigate();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

  
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            console.log('reader.result:', reader.result);
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });
  
      Promise.all(newImages).then((images) => {
        setSelectedImages(images);
      });
    }
  };
  
  

  const clearImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const openImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    selectedImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    console.log(formData);
    try {
      await mutateAsync(formData);
      navigate(RoutePaths.Home);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
    
  };




  return (
    <form onSubmit={handelSubmit}>
      <Stack gap={1.5} sx={{ marginTop: "1rem" }}>
        <TextField
          fullWidth
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          multiline
          minRows={4}
        />
        <label htmlFor="image-input" style={{ display: "none" }}>
          <input
            id="image-input"
            type="file"
            onChange={handleImageChange}
            ref={imageInputRef}
            style={{ display: "none" }}
            multiple
          />
        </label>
        <Box display="flex" sx={{ cursor: "pointer" }} onClick={openImageInput}>
          <AddIcon />
          <Typography fontWeight={600}>Select Images</Typography>
        </Box>
        <Stack gap={1} direction="row">
          {selectedImages.map((image, index: number) => (
            <Box sx={{ position: "relative" }} key={index}>
              <img
                src={image}
                alt={`selected image ${index + 1}`}
                style={{ height: "80px" }}
              />
              <ClearIcon
                sx={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "20px",
                  p: "3px",
                  cursor: "pointer",
                }}
                onClick={() => clearImage(index)}
              />
            </Box>
          ))}
        </Stack>
        <Button type="submit" variant="contained">Create</Button>
      </Stack>
    </form>
  );
};

export default CreateFeed;
