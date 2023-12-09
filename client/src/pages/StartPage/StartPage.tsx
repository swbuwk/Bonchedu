import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { MainTitle, StartPageWrapper } from "./styles";

export const StartPage = () => {
  const navigate = useNavigate();

  return (
    <StartPageWrapper>
      <MainTitle>Bonchedu</MainTitle>
      <Button whiteTheme onClick={() => navigate("/courses")}>
        Начать
      </Button>
    </StartPageWrapper>
  );
};
