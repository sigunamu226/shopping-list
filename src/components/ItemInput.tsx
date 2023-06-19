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
import { Col, Row } from "react-bootstrap";
import { updateItem } from "../services/utill";
import { Item } from "../common/interfaces/item";
import "./iteminput.scss";

const ItemInput: React.FC<{
  item: Item;
  setItem: React.Dispatch<React.SetStateAction<Item>>;
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
    updateItem(count, itemName, itemStatus, item, setItem);
    setCount(count + 1);
  };

  const isItemInclude = (inputItem: string) => {
    return (
      inputItem === "" ||
      itemStatus === "" ||
      item.recentItem.some((ri) => ri.name === inputItem) ||
      item.nextTimeItem.some((nti) => nti.name === inputItem)
    );
  };

  return (
    <Container className="mt-5 input-container">
      <Row className="text-center">
        <Col className="col-5 col-md-8">
          <TextField
            className="input-item"
            label="買いたいもの"
            type="text"
            value={itemName}
            onChange={onChangeName}
          />
        </Col>
        <Col className="col-4 col-md-2">
          <FormControl className="select-status">
            <InputLabel id="demo-simple-select-autowidth-label">
              いつ
            </InputLabel>
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
        </Col>
        <Col className="col-3 col-md-2">
          <Button
            className="add-button"
            variant="contained"
            onClick={onAddItems}
            disabled={isItemInclude(itemName)}
          >
            追加
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemInput;
