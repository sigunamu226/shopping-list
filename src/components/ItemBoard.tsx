import { Container } from "@mui/material";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Item } from "../interfaces/item";
import Header from "./Header";
import ItemInput from "./ItemInput";
import ItemList from "./ItemList";

const ItemBoard: React.FC = () => {
  const [item, setItem] = useState<Item[]>([]);

  return (
    <>
      <Header />
      <ItemInput item={item} setItem={setItem} />
      <Container className="mt-5" maxWidth="xl">
        <Row>
          <ItemList item={item} setItem={setItem} />
          <ItemList item={item} setItem={setItem} />
        </Row>
      </Container>
    </>
  );
};

export default ItemBoard;
