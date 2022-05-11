import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Col } from "react-bootstrap";
import { Item } from "../interfaces/item";

const ItemList: React.FC<{
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
}> = ({ item, setItem }) => {
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    setChecked([...checked, false]);
  }, [item]);

  const onCheck = (key: number) => {
    setChecked(checked.map((c, i) => (i === key ? !c : c)));
  };

  return (
    <Col className="item-list-">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {item.map((item, i) => {
          const labelId = `checkbox-list-label-${i}`;

          return (
            <ListItem
              key={i}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                dense
                onClick={() => {
                  onCheck(i);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked={checked[i]}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Col>
  );
};

export default ItemList;
