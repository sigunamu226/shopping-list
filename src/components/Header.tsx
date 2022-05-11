import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            買う物メモ
          </Typography>
          <Button color="inherit">ログアウト</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
