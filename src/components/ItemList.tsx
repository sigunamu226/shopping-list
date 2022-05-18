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
import { Col } from "react-bootstrap";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Item } from "../interfaces/item";
import "./itemlist.scss";

const ItemList: React.FC<{
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
}> = ({ item, setItem }) => {
  const [checked, setChecked] = useState<boolean[]>([]);
  const [boxHeight, setBoxHeight] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    setChecked([...checked, false]);
    setBoxHeight(document.getElementById("item-list-box")!.clientHeight);
    setBoxWidth(document.getElementById("item-list-box")!.clientWidth);
  }, [item]);

  const onCheck = (key: number) => {
    setChecked(checked.map((c, i) => (i === key ? !c : c)));
  };

  const onClickDelete = (deleteItem: Item) => {
    setItem(item.filter((i) => i !== deleteItem));
  };

  return (
    <Col className="item-list">
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
    </Col>
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
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              checked={checked[index]}
              inputProps={{ "aria-labelledby": "aaa" }}
            />
          </ListItemIcon>
          <ListItemText id="aaa" primary={item[index].name} />
        </ListItemButton>
      </ListItem>
    );
  }
};

export default ItemList;
