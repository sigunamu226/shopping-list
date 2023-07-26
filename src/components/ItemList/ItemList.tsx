import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Item } from "../../common/interfaces/item";
import { onCheckUpdate, onClickDelete } from "../../services/itemlist";
import "./itemlist.scss";
import { Col, Row } from "react-bootstrap";

interface ItemListProps {
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
  filter: String;
}

const ItemList: React.FC<ItemListProps> = ({ item, setItem, filter }) => {
  const onCheck = (index: number) => {
    onCheckUpdate(index, item, setItem);
  };

  const onClick = (index: number) => {
    onClickDelete(index, item, setItem);
  };

  return (
    <Row className="justify-content-center">
      <Col md={9}>
        <Box className="item-list-box">
          <List className="list">
            {item.map((i, index) => {
              if (filter === i.status || filter === "全て") {
                return (
                  <ListItem
                    className="list-item"
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          onClick(index);
                        }}
                        className="list-item-delete-icon"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      onClick={() => {
                        onCheck(index);
                      }}
                      className="list-item-button"
                    >
                      <ListItemIcon className="list-item-icon">
                        <Checkbox checked={i.checked} />
                      </ListItemIcon>
                      <ListItemText
                        className="list-item-text"
                        primary={i.name}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </Box>
      </Col>
    </Row>
  );
};

export default ItemList;
