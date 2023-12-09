import { useNavigate, useParams } from "react-router-dom";
import { AuthPageTitle, AuthPageWrapper, AuthRedirect } from "./styles";
import ContentBlock from "../../components/ContentBlock";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

enum AUTH_OPTIONS {
  LOGIN = "login",
  REGISTRATION = "registration",
}

export const AuthPage = () => {
  const { option } = useParams();
  const navigate = useNavigate()

  return (
    <AuthPageWrapper>
      <AuthPageTitle>
        {option === AUTH_OPTIONS.LOGIN ? "Войти" : "Давайте начнем!"}
      </AuthPageTitle>
      <ContentBlock w="500px" padding="48px">
        {option === AUTH_OPTIONS.LOGIN ? <LoginForm /> : <RegistrationForm />}
      </ContentBlock>
      <AuthRedirect
        onClick={() => navigate(option === AUTH_OPTIONS.LOGIN ? "/auth/registration" : "/auth/login")}
        >{option === AUTH_OPTIONS.LOGIN ? "Перейти к регистрации" : "Вернуться ко входу"}
      </AuthRedirect>
    </AuthPageWrapper>
  );
};
