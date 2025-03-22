import React from "react";
import { Typography } from "@mui/material";

const EmptyPage: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Empty Page
      </Typography>
      <Typography variant="body1">
        {title ?? "This"} page is currently empty.
      </Typography>
    </div>
  );
};

export default EmptyPage;
