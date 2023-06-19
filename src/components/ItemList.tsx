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
import { Item, nextTimeItem, recentItem } from "../common/interfaces/item";
import { onCheckUpdate, onClickDelete } from "../services/utill";
import "./itemlist.scss";

const ItemList: React.FC<{
  item: Item;
  setItem: React.Dispatch<React.SetStateAction<Item>>;
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

  const onCheck = (key: number, listTitle: string) => {
    onCheckUpdate(key, listTitle, item, setItem);
  };

  const onClick = (deleteItem: recentItem | nextTimeItem) => {
    onClickDelete(deleteItem, listTitle, item, setItem);
  };

  return (
    <div className="col-12 col-md-6 item-list">
      <div className="list-title">【{listTitle}】</div>
      <Box className="item-list-box" id="item-list-box">
        <FixedSizeList
          height={boxHeight}
          width={boxWidth}
          itemSize={46}
          itemCount={
            listTitle === "直近で欲しい物リスト"
              ? item.recentItem.length
              : item.nextTimeItem.length
          }
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
              onClick(
                listTitle === "直近で欲しい物リスト"
                  ? item.recentItem[index]
                  : item.nextTimeItem[index]
              );
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
            onCheck(index, listTitle);
          }}
          className="list-item-button"
        >
          <ListItemIcon className="list-item-icon">
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              checked={
                listTitle === "直近で欲しい物リスト"
                  ? item.recentItem[index].checked
                  : item.nextTimeItem[index].checked
              }
              inputProps={{ "aria-labelledby": "aaa" }}
            />
          </ListItemIcon>
          <ListItemText
            className="list-item-text"
            id="aaa"
            primary={
              listTitle === "直近で欲しい物リスト"
                ? item.recentItem[index].name
                : item.nextTimeItem[index].name
            }
          />
        </ListItemButton>
      </ListItem>
    );
  }
};

export default ItemList;
