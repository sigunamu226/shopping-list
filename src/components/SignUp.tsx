import { Avatar, Button, Paper, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Image from "../asset/image/bandicam-2021-02-02-21-19-47-932.jpg";
import {
  initError,
  initLogin,
  onCheckValidation,
  serviceOnChangeInput,
} from "../services/login";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./signup.scss";
import { IError, ILogin, InputType } from "../interfaces/login";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
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

    await createUserWithEmailAndPassword(
      auth,
      loginState.email,
      loginState.password
    );

    navigate("/itemboard");
  };

  return (
    <Container className="signup-container">
      <Paper className="signup-paper">
        <Avatar alt="icon" src={Image} className="icon" />
        <h3>ようこそ買い物メモへ</h3>
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
            登録
          </Button>
          <Button className="mt-2" variant="text" fullWidth>
            パスワードを忘れた場合
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default SignUp;
