import { InferType, object, string } from "yup";
import { ContentWrapper, ErrorMessage, InputList } from "../styles";
import { Input } from "../../../components/Input/Input";
import Button from "../../../components/Button";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useProfile } from "../../../hooks/useProfile";

const registrationSchema = object({
  username: string().min(2, "Слишком короткий псведоним"),
  login: string().email("Невалидный адрес электронной почты"),
  password: string()
    .min(8, "Пароль слишком короткий")
    .max(32, "Пароль слишком длинный"),
  passwordRepeat: string().test({
    name: "is-match",
    message: "Пароли не совпадают",
    test(value, ctx) {
      return ctx.parent.password === value;
    },
  }),
});

interface RegistrationFormValues extends InferType<typeof registrationSchema> {}

enum RegFormFields {
  login = "login",
  password = "password",
  username = "username",
  passwordRepeat = "passwordRepeat",
}

const registrationFormInit: RegistrationFormValues = {
  [RegFormFields.username]: "",
  [RegFormFields.login]: "",
  [RegFormFields.password]: "",
  [RegFormFields.passwordRepeat]: "",
};

const RegistrationForm = () => {
  const profile = useProfile();
  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      await profile.registration(values as Required<RegistrationFormValues>);
    } catch (e) {
      formik.validateForm();
    }
  };

  const formik = useFormik({
    initialValues: registrationFormInit,
    validationSchema: registrationSchema,
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
          id={RegFormFields.username}
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched(RegFormFields.username)}
          error={formik.touched.username ? formik.errors.username : ""}
          label="Псевдоним"
          placeholder="John"
        />
        <Input
          id={RegFormFields.login}
          required
          value={formik.values.login}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched(RegFormFields.login)}
          error={formik.touched.login ? formik.errors.login : ""}
          label="Логин"
          placeholder="example@mail.ru"
        />
        <Input
          id={RegFormFields.password}
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched(RegFormFields.password)}
          error={formik.touched.password ? formik.errors.password : ""}
          type="password"
          label="Пароль"
          placeholder="От 8 символов"
        />
        <Input
          id={RegFormFields.passwordRepeat}
          required
          value={formik.values.passwordRepeat}
          onChange={formik.handleChange}
          onClick={() => formik.setFieldTouched(RegFormFields.passwordRepeat)}
          error={
            formik.touched.passwordRepeat ? formik.errors.passwordRepeat : ""
          }
          type="password"
          label="Повтор пороля"
          placeholder=""
        />
      </InputList>
      <ErrorMessage>{profile.error?.message}</ErrorMessage>
      <Button disabled={hasEmptyField || !formik.isValid} type="submit">
        Зарегистрироваться
      </Button>
    </ContentWrapper>
  );
};

export default RegistrationForm;
