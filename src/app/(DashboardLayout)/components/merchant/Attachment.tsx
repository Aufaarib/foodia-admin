import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

import DetailCard from "../shared/DetailCard";
import ImageHandler from "../shared/ImageHandler";
import { ModalPopupFilesDetail } from "../shared/ModalPopup";

interface ChildProps {
  data: {
    self_photo: string;
    ktp_photo: string;
    ktp_number: string;
    oauth: { fullname: string; email: string; phone: string };
  };
}

const Attachment: React.FC<ChildProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");

  const onViewImage = (file: string) => {
    setIsOpen(true);
    setFile(file);
  };

  const onCloseView = () => {
    setIsOpen(false);
  };
  return (
    <>
      <DetailCard title="Merchant Documents">
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => onViewImage(data.self_photo)}
              variant="contained"
              size="small"
              sx={{
                padding: 0,
                width: "250px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <ImageHandler url={data.self_photo} />
            </Button>
            <Typography>Self Photo</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => onViewImage(data.ktp_photo)}
              variant="contained"
              size="small"
              sx={{
                padding: 0,
                width: "250px",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
            >
              <ImageHandler url={data.ktp_photo} />
            </Button>
            <Typography>KTP Photo</Typography>
          </Box>
        </Box>
      </DetailCard>
      <ModalPopupFilesDetail
        open={isOpen}
        image_url={file}
        handleClose={onCloseView}
      />
    </>
  );
};

export default Attachment;
