import { Button } from "@mui/material";
import React from "react";
import "./itemfilter.scss";
import { Col, Row } from "react-bootstrap";
import classNames from "classnames";

interface IItemFilterProps {
  filter: String;
  setFilter: React.Dispatch<React.SetStateAction<String>>;
}

export const ItemFilter: React.FC<IItemFilterProps> = (props) => {
  return (
    <Row className="justify-content-center mb-2">
      <Col md={9}>
        <div className="filter-container">
          <Button
            className={classNames({ "button-hover": props.filter === "全て" })}
            color="secondary"
            variant="outlined"
            onClick={() => props.setFilter("全て")}
          >
            全て
          </Button>
          <Button
            color="secondary"
            className={classNames("mx-2", {
              "button-hover": props.filter === "直近",
            })}
            variant="outlined"
            onClick={() => props.setFilter("直近")}
          >
            直近
          </Button>
          <Button
            className={classNames({
              "button-hover": props.filter === "その内",
            })}
            color="secondary"
            variant="outlined"
            onClick={() => props.setFilter("その内")}
          >
            その内
          </Button>
        </div>
      </Col>
    </Row>
  );
};
