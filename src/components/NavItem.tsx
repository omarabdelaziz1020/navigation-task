import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { NavItem as NavItemType } from "../context/NavContext";

interface NavItemProps {
  item: NavItemType;
  editMode?: boolean;
  onToggleVisibility?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  editMode = false,
  onToggleVisibility,
}) => {
  return (
    <>
      <ListItem onClick={onToggleVisibility} sx={{ pl: 2, cursor: "pointer" }}>
        <ListItemText primary={item.title} />
        {editMode && (
          <IconButton
            onClick={onToggleVisibility}
            aria-label="toggle visibility"
          >
            {item.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        )}
      </ListItem>
      {item.children && (
        <List component="div" disablePadding>
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} editMode={editMode} />
          ))}
        </List>
      )}
    </>
  );
};

export default NavItem;
