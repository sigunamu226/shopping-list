export interface Item {
  id: string;
  recentItem: recentItem[];
  nextTimeItem: nextTimeItem[];
}

export interface nextTimeItem {
  id: number;
  name: string;
  status: string;
  checked: boolean;
}

export interface recentItem {
  id: number;
  name: string;
  status: string;
  checked: boolean;
}
