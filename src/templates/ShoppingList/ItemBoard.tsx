import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import { Item, ItemDocument } from "../../common/interfaces/item";
import Header from "../Header/Header";
import "./itemboard.scss";
import ItemList from "../../components/ItemList";
import ItemInput from "../../components/ItemInput";

const ItemBoard: React.FC = () => {
  const { user } = useAuthContext();
  const [item, setItem] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", auth.currentUser!.uid);
      const docSnap = await getDoc(docRef);
      const documentData = docSnap.data() as ItemDocument;
      setItem(documentData.item);
    })();
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Header />
      <ItemInput item={item} setItem={setItem} />
      <Container className="item-list-container">
        <ItemList item={item} setItem={setItem} />
      </Container>
    </>
  );
};

export default ItemBoard;
