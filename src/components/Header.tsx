import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            買う物メモ
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
