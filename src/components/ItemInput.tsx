import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { updateItem } from "../services/iteminput";
import { Item } from "../common/interfaces/item";
import "./iteminput.scss";

interface ItemInputProps {
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemInput: React.FC<ItemInputProps> = ({ item, setItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemStatus, setItemStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setItemStatus(event.target.value);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const onAddItems = () => {
    updateItem(itemName, itemStatus, item, setItem);
  };

  const isItemInclude = (inputItem: string) => {
    return Boolean(
      inputItem === "" ||
        itemStatus === "" ||
        item.some((i) => i.name === inputItem)
    );
  };

  return (
    <Container className="mt-md-4 input-container">
      <Row className="input-row">
        <Col className="">
          <TextField
            className="input-item"
            label="買いたいもの"
            type="text"
            value={itemName}
            onChange={onChangeName}
          />
        </Col>
      </Row>
      <Row className="input-row">
        <Col className="">
          <FormControl className="select-status">
            <InputLabel id="demo-simple-select-label">買う時期</InputLabel>
            <Select
              id="demo-simple-select-autowidth"
              value={itemStatus}
              onChange={handleChange}
              autoWidth
              label="買う時期"
              native={true}
            >
              <option value="" selected hidden></option>
              <option value="直近">直近</option>
              <option value="その内">その内</option>
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row className="input-row">
        <Col className="add-button-wrapper">
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
