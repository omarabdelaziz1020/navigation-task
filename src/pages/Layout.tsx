import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Container } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <Container sx={{ padding: "20px" }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
