import { Avatar, Button, Paper, Stack, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Image from "../asset/image/bandicam-2021-02-02-21-19-47-932.jpg";
import { auth } from "../../firebase.js";
import { IError, ILogin, InputType } from "../../common/interfaces/login";
import {
  initError,
  initLogin,
  onCheckValidation,
  serviceOnChangeInput,
} from "../../services/login";
import "./signup.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginState, setLoginState] = useState<ILogin>(initLogin());
  const [errorState, setErrorState] = useState<IError>(initError());

  const onChangeInput = (
    type: InputType,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    serviceOnChangeInput(type, e, loginState, setLoginState);
  };

  const onClickLogin = async () => {
    if (onCheckValidation(loginState, setErrorState)) {
      return false;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        loginState.email,
        loginState.password
      );

      navigate("/itemboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container className="signup-container">
      <Paper className="signup-paper">
        <Avatar alt="icon" src={Image} className="icon" />
        <h3>ようこそ買い物メモへ</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form className="input-form">
          <Stack spacing={3}>
            <TextField
              fullWidth
              required
              error={errorState.email}
              helperText={errorState.email && errorState.emailErrorMessage}
              type="email"
              id="outlined-basic"
              label="メールアドレス"
              variant="outlined"
              value={loginState?.email}
              onChange={(e) => {
                onChangeInput(InputType.EMAIL, e);
              }}
            />
            <TextField
              fullWidth
              required
              error={errorState.password}
              helperText={
                errorState.password && errorState.passwordErrorMessage
              }
              id="outlined-basic"
              label="パスワード"
              type="password"
              variant="outlined"
              value={loginState?.password}
              onChange={(e) => {
                onChangeInput(InputType.PASS, e);
              }}
            />
          </Stack>
          <Button
            className="mt-3"
            variant="contained"
            fullWidth
            onClick={onClickLogin}
          >
            ログイン
          </Button>
          <Button className="mt-2" variant="text" fullWidth>
            パスワードを忘れた場合
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
