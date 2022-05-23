import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { recentItem } from "../interfaces/recentItem";
import { nextTimeItem } from "../interfaces/nextTimeItem";
import Header from "./Header";
import ItemInput from "./ItemInput";
import ItemList from "./ItemList";
import "./itemboard.scss";

const ItemBoard: React.FC = () => {
  const [recentItem, setRecentItem] = useState<recentItem[]>([]);
  const [nextTimeItem, setNextTimeItem] = useState<nextTimeItem[]>([]);

  return (
    <>
      <Header />
      <ItemInput
        recentItemStates={{ recentItem, setRecentItem }}
        nextItemStates={{ nextTimeItem, setNextTimeItem }}
      />
      <Container className="mt-5 item-list-container" fluid>
        <div className="item-list-wrapper">
          <ItemList
            item={recentItem}
            setItem={setRecentItem}
            listTitle="直近で欲しい物リスト"
          />
          <ItemList
            item={nextTimeItem}
            setItem={setNextTimeItem}
            listTitle="その内欲しい物リスト"
          />
        </div>
      </Container>
    </>
  );
};

export default ItemBoard;
