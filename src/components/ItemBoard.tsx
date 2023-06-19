import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { Item } from "../common/interfaces/item";
import Header from "./Header";
import "./itemboard.scss";
import ItemInput from "./ItemInput";
import ItemList from "./ItemList";

const ItemBoard: React.FC = () => {
  const { user } = useAuthContext();
  const [item, setItem] = useState<Item>({
    id: "",
    recentItem: [],
    nextTimeItem: [],
  });

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", auth.currentUser!.uid);
      const docSnap = await getDoc(docRef);
      setItem(docSnap.data() as Item);
    })();
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Header />
      <ItemInput item={item} setItem={setItem} />
      <Container className="mt-5 item-list-container" fluid>
        <div className="item-list-wrapper">
          <ItemList
            item={item}
            setItem={setItem}
            listTitle="直近で欲しい物リスト"
          />
          <ItemList
            item={item}
            setItem={setItem}
            listTitle="その内欲しい物リスト"
          />
        </div>
      </Container>
    </>
  );
};

export default ItemBoard;
