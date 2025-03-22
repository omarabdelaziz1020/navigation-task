import React, { useState } from "react";
import {
  Drawer,
  List,
  IconButton,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNav } from "../hooks/useNav";
import EditNavItem from "./EditNavItem";

const NavBar: React.FC = () => {
  const { navItems, setNavItems, saveNavItems } = useNav();
  const [editMode, setEditMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleSave = async () => {
    await saveNavItems();
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleEdit = (id: number, newTitle: string) => {
    setNavItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  };

  const handleToggleVisibility = (id: number) => {
    setNavItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, visible: item.visible === false ? true : false }
          : item
      )
    );
  };

  const handleMove = (fromId: number, toId: number) => {
    const updatedItems = [...navItems];
    const fromIndex = updatedItems.findIndex((item) => item.id === fromId);
    const toIndex = updatedItems.findIndex((item) => item.id === toId);
    if (fromIndex !== -1 && toIndex !== -1) {
      const [movedItem] = updatedItems.splice(fromIndex, 1);
      updatedItems.splice(toIndex, 0, movedItem);
      setNavItems(updatedItems);
    }
  };

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <>
      {/* Mobile Hamburger Icon */}
      {!isDrawerOpen && (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1300,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Full-Screen Drawer for Mobile */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100vw",
            height: "100vh",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton onClick={toggleDrawer}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Menu</Typography>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {!editMode && (
              <IconButton onClick={toggleEditMode}>
                <SettingsIcon />
              </IconButton>
            )}
            {editMode && (
              <>
                <IconButton
                  color="error"
                  onClick={handleCancel}
                  sx={{
                    border: "1px solid red",
                    borderRadius: "50%",
                    color: "red",
                    width: "28px",
                    height: "28px",
                  }}
                >
                  <ClearIcon />
                </IconButton>
                <IconButton
                  color="success"
                  onClick={handleSave}
                  sx={{
                    border: "1px solid green",
                    borderRadius: "50%",
                    color: "green",
                    width: "28px",
                    height: "28px",
                  }}
                >
                  <CheckIcon />
                </IconButton>
              </>
            )}
          </div>
        </div>
        <Divider />
        <List>
          {navItems
            .filter((item) => editMode || item.visible !== false)
            .map((item) => (
              <EditNavItem
                key={item.id}
                item={item}
                editMode={editMode}
                onEdit={handleEdit}
                onToggleVisibility={handleToggleVisibility}
                onMove={handleMove}
              />
            ))}
        </List>
      </Drawer>

      {/* Permanent Desktop Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", md: "block" },
          width: 240,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography variant="h6">Menu</Typography>
          {!editMode && (
            <IconButton onClick={toggleEditMode}>
              <SettingsIcon />
            </IconButton>
          )}
          {editMode && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton
                color="error"
                onClick={handleCancel}
                sx={{
                  border: "1px solid red",
                  borderRadius: "50%",
                  color: "red",
                  width: "28px",
                  height: "28px",
                }}
              >
                <ClearIcon />
              </IconButton>
              <IconButton
                color="success"
                onClick={handleSave}
                sx={{
                  border: "1px solid green",
                  borderRadius: "50%",
                  color: "green",
                  width: "28px",
                  height: "28px",
                }}
              >
                <CheckIcon />
              </IconButton>
            </div>
          )}
        </div>
        <Divider />
        <List>
          {navItems
            .filter((item) => editMode || item.visible !== false)
            .map((item) => (
              <EditNavItem
                key={item.id}
                item={item}
                editMode={editMode}
                onEdit={handleEdit}
                onToggleVisibility={handleToggleVisibility}
                onMove={handleMove}
              />
            ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
