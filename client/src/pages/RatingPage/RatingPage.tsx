import { useGetRatingQuery } from "../../store/services/user";
import UserBlock from "./components/UserBlock";
import { RatingPageTitle, RatingPageWrapper } from "./styles";

export const RatingPage = () => {
  const {data: users} = useGetRatingQuery(undefined)

  return <RatingPageWrapper>
    <RatingPageTitle>Общий рейтинг</RatingPageTitle>
    {users ? users.map((user, idx) => (
      <UserBlock key={user.id} place={idx+1} user={user}/>
    )) : <></>}
  </RatingPageWrapper>;
};
