import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";
import { Item, nextTimeItem, recentItem } from "../interfaces/item";

export const updateItem = async (
  count: number,
  itemName: string,
  itemStatus: string,
  item: Item,
  setItem: React.Dispatch<React.SetStateAction<Item>>
) => {
  const docRef = doc(db, "users", auth.currentUser!.uid);
  setItem({
    id: item.id,
    recentItem:
      itemStatus === "直近"
        ? [
            ...item.recentItem,
            { id: count, name: itemName, status: itemStatus, checked: false },
          ]
        : item.recentItem,
    nextTimeItem:
      itemStatus === "直近"
        ? item.nextTimeItem
        : [
            ...item.nextTimeItem,
            { id: count, name: itemName, status: itemStatus, checked: false },
          ],
  });

  await updateDoc(docRef, {
    recentItem:
      itemStatus === "直近"
        ? [
            ...item.recentItem,
            { id: count, name: itemName, status: itemStatus, checked: false },
          ]
        : item.recentItem,
    nextTimeItem:
      itemStatus === "直近"
        ? item.nextTimeItem
        : [
            ...item.nextTimeItem,
            { id: count, name: itemName, status: itemStatus, checked: false },
          ],
  });
};

export const onClickDelete = async (
  deleteItem: recentItem | nextTimeItem,
  listTitle: string,
  item: Item,
  setItem: React.Dispatch<React.SetStateAction<Item>>
) => {
  const docRef = doc(db, "users", auth.currentUser!.uid);
  setItem({
    id: item.id,
    recentItem:
      listTitle === "直近で欲しい物リスト"
        ? item.recentItem.filter((i) => i !== deleteItem)
        : item.recentItem,
    nextTimeItem:
      listTitle === "直近で欲しい物リスト"
        ? item.nextTimeItem
        : item.nextTimeItem.filter((i) => i !== deleteItem),
  });

  await updateDoc(docRef, {
    id: item.id,
    recentItem:
      listTitle === "直近で欲しい物リスト"
        ? item.recentItem.filter((i) => i !== deleteItem)
        : item.recentItem,
    nextTimeItem:
      listTitle === "直近で欲しい物リスト"
        ? item.nextTimeItem
        : item.nextTimeItem.filter((i) => i !== deleteItem),
  });
};

export const onCheckUpdate = async (
  key: number,
  listTitle: string,
  item: Item,
  setItem: React.Dispatch<React.SetStateAction<Item>>
) => {
  const docRef = doc(db, "users", auth.currentUser!.uid);
  setItem({
    id: item.id,
    recentItem:
      listTitle === "直近で欲しい物リスト"
        ? item.recentItem.map((c, i) => {
            return {
              id: c.id,
              name: c.name,
              status: c.status,
              checked: i === key ? !c.checked : c.checked,
            };
          })
        : item.recentItem,
    nextTimeItem:
      listTitle === "直近で欲しい物リスト"
        ? item.nextTimeItem
        : item.nextTimeItem.map((c, i) => {
            return {
              id: c.id,
              name: c.name,
              status: c.status,
              checked: i === key ? !c.checked : c.checked,
            };
          }),
  });

  await updateDoc(docRef, {
    id: item.id,
    recentItem:
      listTitle === "直近で欲しい物リスト"
        ? item.recentItem.map((c, i) => {
            return {
              id: c.id,
              name: c.name,
              status: c.status,
              checked: i === key ? !c.checked : c.checked,
            };
          })
        : item.recentItem,
    nextTimeItem:
      listTitle === "直近で欲しい物リスト"
        ? item.nextTimeItem
        : item.nextTimeItem.map((c, i) => {
            return {
              id: c.id,
              name: c.name,
              status: c.status,
              checked: i === key ? !c.checked : c.checked,
            };
          }),
  });
};
