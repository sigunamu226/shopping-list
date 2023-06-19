import { IError, ILogin, InputType } from "../common/interfaces/login";

export const initLogin = () => {
  return { email: "", password: "" };
};

export const initError = () => {
  return {
    email: false,
    password: false,
    emailErrorMessage: "",
    passwordErrorMessage: "",
  };
};

export const serviceOnChangeInput = (
  type: InputType,
  { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  { email, password }: ILogin,
  setData: React.Dispatch<React.SetStateAction<ILogin>>
) => {
  const { value } = target;
  setData({
    email: type === InputType.EMAIL ? value : email,
    password: type === InputType.PASS ? value : password,
  });
};

export const onCheckValidation = (
  loginState: ILogin,
  setErrorState: React.Dispatch<React.SetStateAction<IError>>
) => {
  let emailError = false;
  let passwordError = false;
  let emailErrorMessage = "";
  let passwordErrorMessage = "";

  if (loginState.email === "") {
    emailError = true;
    emailErrorMessage = "メールアドレスは必須だよ";
  }

  if (loginState.password === "") {
    passwordError = true;
    passwordErrorMessage = "パスワードは必須だよ";
  }
  setErrorState({
    email: emailError,
    password: passwordError,
    emailErrorMessage,
    passwordErrorMessage,
  });

  if (emailError || passwordError) {
    return true;
  }
  return false;
};
