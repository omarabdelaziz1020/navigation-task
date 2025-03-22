import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  TextField,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDrag, useDrop } from "react-dnd";
import { NavItem as NavItemType } from "../context/NavContext";

interface EditNavItemProps {
  item: NavItemType;
  editMode: boolean;
  onEdit: (id: number, newTitle: string) => void;
  onToggleVisibility: (id: number) => void;
  onMove: (fromId: number, toId: number) => void;
}

const EditNavItem: React.FC<EditNavItemProps> = ({
  item,
  editMode,
  onEdit,
  onToggleVisibility,
  onMove,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const navigate = useNavigate();
  const ref = useRef<HTMLLIElement>(null);

  const toggleExpand = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleSaveEdit = () => {
    onEdit(item.id, title);
    setIsEditing(false);
  };

  const handleClick = () => {
    if (!editMode) {
      navigate(item.target ?? item.title.toLowerCase());
    }
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "NAV_ITEM",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: "NAV_ITEM",
    hover: (draggedItem: { id: number }, monitor) => {
      if (draggedItem.id === item.id) return;

      const dragIndex = draggedItem.id;
      const hoverIndex = item.id;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      if (!hoverBoundingRect) return;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      draggedItem.id = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <>
      <ListItem
        ref={ref}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: editMode ? "move" : "pointer",
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isDragging ? "#f0f0f0" : "transparent",
          userSelect: "none",
        }}
        onClick={handleClick}
      >
        {editMode && (
          <IconButton>
            <DragHandleIcon />
          </IconButton>
        )}
        {isEditing ? (
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            variant="outlined"
            onBlur={handleSaveEdit}
            onKeyPress={(e) => e.key === "Enter" && handleSaveEdit()}
            autoFocus
            sx={{ flex: 1 }}
          />
        ) : (
          <ListItemText primary={title} />
        )}
        {item.children && (
          <IconButton size="small" onClick={toggleExpand}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
        {editMode && (
          <>
            <IconButton onClick={toggleEdit}>
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton onClick={() => onToggleVisibility(item.id)}>
              {item.visible !== false ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </IconButton>
          </>
        )}
      </ListItem>

      {item.children && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {item.children.map((child) => (
              <EditNavItem
                key={child.id}
                item={child}
                editMode={editMode}
                onEdit={onEdit}
                onToggleVisibility={onToggleVisibility}
                onMove={onMove}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default EditNavItem;
