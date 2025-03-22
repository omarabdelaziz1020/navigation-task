import React from "react";
import { MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";

const SortSelect: React.FC = () => {
  const [sort, setSort] = React.useState<string>("Top match");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <Typography variant="subtitle1">Sorting by:</Typography>
      <Select
        value={sort}
        onChange={handleChange}
        displayEmpty
        fullWidth
        variant="outlined"
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="Top match">Top match</MenuItem>
        <MenuItem value="Newest">Newest</MenuItem>
        <MenuItem value="Latest">Latest</MenuItem>
      </Select>
    </div>
  );
};

export default SortSelect;
