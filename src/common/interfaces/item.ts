export interface ItemDocument {
  id: string;
  item: Item[];
}

export interface Item {
  id: string;
  name: string;
  status: string;
  checked: boolean;
}
