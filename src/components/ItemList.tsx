import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { nextTimeItem } from "../interfaces/nextTimeItem";
import { recentItem } from "../interfaces/recentItem";
import "./itemlist.scss";

const ItemList: React.FC<{
  item: recentItem[] | nextTimeItem[];
  setItem: React.Dispatch<React.SetStateAction<recentItem[] | nextTimeItem[]>>;
  listTitle: string;
}> = ({ item, setItem, listTitle }) => {
  const [checked, setChecked] = useState<boolean[]>([]);
  const [boxHeight, setBoxHeight] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    setChecked([...checked, false]);
    setBoxHeight(document.getElementById("item-list-box")!.clientHeight);
    setBoxWidth(document.getElementById("item-list-box")!.clientWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onCheck = (key: number) => {
    setChecked(checked.map((c, i) => (i === key ? !c : c)));
  };

  const onClickDelete = (deleteItem: recentItem | nextTimeItem) => {
    setItem(item.filter((i) => i !== deleteItem));
  };

  return (
    <div className="col-12 col-md-6 item-list">
      <div className="list-title">【{listTitle}】</div>
      <Box className="item-list-box" id="item-list-box">
        <FixedSizeList
          height={boxHeight}
          width={boxWidth}
          itemSize={46}
          itemCount={item.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => {
              onClickDelete(item[index]);
            }}
            className="list-item-delete-icon"
          >
            <DeleteIcon />
          </IconButton>
        }
        style={style}
        className="list-item"
      >
        <ListItemButton
          role={undefined}
          dense
          onClick={() => {
            onCheck(index);
          }}
          className="list-item-button"
        >
          <ListItemIcon className="list-item-icon">
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              checked={checked[index]}
              inputProps={{ "aria-labelledby": "aaa" }}
            />
          </ListItemIcon>
          <ListItemText
            className="list-item-text"
            id="aaa"
            primary={item[index].name}
          />
        </ListItemButton>
      </ListItem>
    );
  }
};

export default ItemList;
