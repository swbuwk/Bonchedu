import { ContentWrapper, ErrorMessage, InputList } from "../styles";
import { Input } from "../../../components/Input/Input";
import Button from "../../../components/Button";
import { InferType, object, string } from "yup";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useProfile } from "../../../hooks/useProfile";

const loginSchema = object({
  username: string(),
  password: string().max(32, "Пароль слишком длинный"),
});

interface LoginFormValues extends InferType<typeof loginSchema> {}

enum loginFormFields {
  username = "username",
  password = "password",
}

const loginFormInit: LoginFormValues = {
  [loginFormFields.username]: "",
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
          id={loginFormFields.username}
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched(loginFormFields.username)}
          error={formik.touched.username ? formik.errors.username : ""}
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
