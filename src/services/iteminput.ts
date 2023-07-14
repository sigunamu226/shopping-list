import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Item } from "../common/interfaces/item";
import { auth, db } from "../firebase";
import uuid4 from "uuid4";

export const updateItem = async (
  itemName: string,
  itemStatus: string,
  item: Item[],
  setItem: React.Dispatch<React.SetStateAction<Item[]>>
): Promise<void> => {
  const docRef = doc(db, "users", auth.currentUser!.uid);
  const newItem = {
    id: uuid4(),
    name: itemName,
    status: itemStatus,
    checked: false,
  };

  setItem([...item, newItem]);

  await updateDoc(docRef, {
    item: arrayUnion(newItem),
  });
};
