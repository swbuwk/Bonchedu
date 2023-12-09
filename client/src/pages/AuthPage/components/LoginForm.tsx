import { ContentWrapper, ErrorMessage, InputList } from "../styles";
import { Input } from "../../../components/Input/Input";
import Button from "../../../components/Button";
import { InferType, object, string } from "yup";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useProfile } from "../../../hooks/useProfile";

const loginSchema = object({
  login: string().email("Невалидный адрес электронной почты"),
  password: string().max(32, "Пароль слишком длинный"),
});

interface LoginFormValues extends InferType<typeof loginSchema> {}

enum loginFormFields {
  login = "login",
  password = "password",
}

const loginFormInit: LoginFormValues = {
  [loginFormFields.login]: "",
  [loginFormFields.password]: "",
};

const LoginForm = () => {
  const profile = useProfile();
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await profile.login(values as Required<LoginFormValues>);
    } catch (e) {
      formik.validateForm();
    }
  };

  const formik = useFormik({
    initialValues: loginFormInit,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
    isInitialValid: true,
    validateOnChange: true,
  });

  const hasEmptyField = useMemo(
    () =>
      Object.keys(formik.values).some((key) => !(formik.values as any)[key]),
    [formik.values]
  );

  return (
    <ContentWrapper onSubmit={formik.handleSubmit}>
      <InputList>
        <Input
          id={loginFormFields.login}
          required
          value={formik.values.login}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched(loginFormFields.login)}
          error={formik.touched.login ? formik.errors.login : ""}
          label="Логин"
        />
        <Input
          id={loginFormFields.password}
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched(loginFormFields.password)}
          error={formik.touched.password ? formik.errors.password : ""}
          type="password"
          label="Пароль"
        />
      </InputList>
      <ErrorMessage>
        {profile.error?.statusCode !== 401 ? profile.error?.message : ""}
      </ErrorMessage>
      <Button disabled={hasEmptyField || !formik.isValid} type="submit">
        Войти
      </Button>
    </ContentWrapper>
  );
};

export default LoginForm;
