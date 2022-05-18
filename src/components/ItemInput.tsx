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
import { nextTimeItem } from "../interfaces/nextTimeItem";
import { recentItem } from "../interfaces/recentItem";
import "./iteminput.scss";

type stateProps = {
  recentItemStates: {
    recentItem: recentItem[];
    setRecentItem: React.Dispatch<React.SetStateAction<recentItem[]>>;
  };
  nextItemStates: {
    nextTimeItem: recentItem[];
    setNextTimeItem: React.Dispatch<React.SetStateAction<nextTimeItem[]>>;
  };
};

const ItemInput: React.FC<stateProps> = ({
  recentItemStates: { recentItem, setRecentItem },
  nextItemStates: { nextTimeItem, setNextTimeItem },
}) => {
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
    if (itemStatus === "直近") {
      setRecentItem([
        ...recentItem,
        { id: count, name: itemName, status: itemStatus },
      ]);
    } else {
      setNextTimeItem([
        ...nextTimeItem,
        { id: count, name: itemName, status: itemStatus },
      ]);
    }
    setCount(count + 1);
  };

  const isItemInclude = (inputItem: string) => {
    return (
      (recentItem.some((ri) => ri.name === inputItem) ||
        nextTimeItem.some((nti) => nti.name === inputItem)) &&
      itemStatus !== ""
    );
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
