import React, { ChangeEvent, useState } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { previewImage } from "./helpers";
import Image from "next/image";

type props = {
  title?: string;
  showPreview?: boolean;
  onSelect: (file: File, preview?: string, base64?: any) => void;
};

export default function InputFile(props: props) {
  const classes = useStyles();

  const [imagePreview, setImagePreview] = useState<string>();
  const fileExt = "image/png, image/jpeg, image/jpg";

  const handleDisplayImage = (e: ChangeEvent) => {
    const { files } = e.target as HTMLInputElement;

    if (files?.length) {
      const file = (files as FileList)[0];
      const imagePreview = previewImage(file);

      setImagePreview(imagePreview);

      getBase64(file)
        .then((base64) => {
          props.onSelect(file, imagePreview, base64);
        })
        .catch((err) => {
          props.onSelect(file, imagePreview, null);
        });

      
    }
  };

  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const renderPreview = () => {
    return (
      <Box>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Upload Assignment Cover"
            className={classes.imageFit}
          />
        )}
      </Box>
    );
  };

  return (
    <Box>
      {!props.showPreview ? null : renderPreview()}

      <Box
        sx={{
          padding: "0.5rem",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          color: "#7B7D8C",
        }}>
        <Typography>Choose Cover Image</Typography>
        <IconButton>
          <CameraAlt />
          <input
            type="file"
            className={classes.inputUpload}
            accept={fileExt}
            onChange={(e) => {
              handleDisplayImage(e);
            }}
          />
        </IconButton>
        {/* <span className="ml-1">{!title ? "Upload Photo" : title}</span> */}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    height: "230px",
  },

  inputUpload: {
    position: "absolute",
    marginTop: "55px",
    height: "100px",
    width: "50px",
    opacity: "0",
    "&:hover": {
      zIndex: "0",
    },
  },

  imageFit: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
