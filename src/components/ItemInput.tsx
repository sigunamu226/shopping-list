import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Item } from "../interfaces/item";
import "./iteminput.scss";

const ItemInput: React.FC<{
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
}> = ({ item, setItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [count, setCount] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setItemStatus(event.target.value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const onAddItems = () => {
    setItem([...item, { id: count, name: itemName, status: itemStatus }]);
    setCount(count + 1);
  };

  const isItemInclude = (inputItem: string) => {
    return item.some((i) => i.name === inputItem);
  };

  return (
    <Container className="mt-5">
      <div className="text-center">
        <TextField
          className="input-item"
          label="買いたいもの"
          type="text"
          value={itemName}
          onChange={onChangeName}
        />
        <FormControl className="select-status" sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">いつ</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={itemStatus}
            onChange={handleChange}
            autoWidth
            label="いつ"
          >
            <MenuItem value="直近">直近</MenuItem>
            <MenuItem value="その内">その内</MenuItem>
          </Select>
        </FormControl>
        <Button
          className="add-button"
          variant="contained"
          onClick={onAddItems}
          disabled={itemName === "" || isItemInclude(itemName)}
        >
          追加
        </Button>
      </div>
    </Container>
  );
};

export default ItemInput;
