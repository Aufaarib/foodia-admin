import { Box, CircularProgress } from "@mui/material";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

interface Url {
  url: any;
  width?: any;
}

const ImageHandler: React.FC<Url> = ({ url, width }) => {
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loadingOccurred, setLoadingOccurred] = useState(true);
  const [src, setSrc] = useState("");

  useEffect(() => {
    setSrc(`${url}`);
  });

  const handleImageError = () => {
    setErrorOccurred(true);
    // setSrc(`${url}`);
  };

  const handleImageLoading = () => {
    console.log("dsadasdsafsafwf");
    setLoadingOccurred(false);
    // setSrc(`${url}`);
  };
  return (
    <>
      {loadingOccurred && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {
        // errorOccurred ? (
        //   <Box
        //     sx={{
        //       display: "flex",
        //       flexDirection: "column",
        //       alignItems: "center",
        //     }}
        //   >
        //     <Typography sx={{ color: "red" }}>Image Error</Typography>
        //     <Image
        //       width={70}
        //       height={70}
        //       src={logo}
        //       alt="Fallback"
        //       onLoad={handleImageLoading}
        //     />
        //   </Box>
        // ) :
        <Image
          style={{ borderRadius: "10px" }}
          src={`${process.env.NEXT_PUBLIC_FILE}${src}`}
          alt="Error"
          width={500} // Adjust width according to your container size
          height={400} // Adjust height according to your container size
          objectFit="contain" // Maintain aspect ratio and cover container
          onError={handleImageError}
          onLoadingComplete={handleImageLoading}
        />
      }
    </>
  );
};

export default ImageHandler;
