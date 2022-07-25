import { Grid } from "@mui/material";
import Image from "next/image";
import * as React from "react";

function Footer() {
  return (
    <Grid
      component="footer"
      justifyContent="center"
      alignItems="center"
      sx={{
        display: "flex",
        padding: "2rem 0",
        borderTop: "1px solid #eaeaea",
      }}
    >
      <span
        style={{
          marginRight: "8px",
        }}
      >
        Made by <strong>jonatasoc</strong>{" "}
      </span>
      <a
        href="https://github.com/jonatasoc"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="https://avatars.githubusercontent.com/u/16616459?v=4"
          alt="Jonatasoc Image"
          width={40}
          height={40}
          style={{
            borderRadius: "13px",
          }}
        />
      </a>
    </Grid>
  );
}

export default React.memo(Footer);
