import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Item } from "../common/interfaces/item";
import { auth, db } from "../firebase";

export const onClickDelete = async (
  index: number,
  item: Item[],
  setItem: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  const docRef = doc(db, "users", auth.currentUser!.uid);
  item.splice(index, 1);

  await updateDoc(docRef, {
    item: item,
  });

  setItem([...item]);
};

export const onCheckUpdate = async (
  index: number,
  item: Item[],
  setItem: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  const docRef = doc(db, "users", auth.currentUser!.uid);
  item[index] = { ...item[index], checked: !item[index].checked };

  await updateDoc(docRef, {
    item: item,
  });

  setItem([...item]);
};
