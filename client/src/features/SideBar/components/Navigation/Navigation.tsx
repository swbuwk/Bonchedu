import { CourseIcon } from "../../../../assets/icons/nav/CourseIcon";
import { ExitIcon } from "../../../../assets/icons/nav/ExitIcon";
import { FriendsIcon } from "../../../../assets/icons/nav/FriendsIcon";
import { RatingIcon } from "../../../../assets/icons/nav/RatingIcon";
import { Colors } from "../../../../constants/Colors";
import { useProfile } from "../../../../hooks/useProfile";
import { NavItem } from "./NavItem";
import { NavigationBottom, NavigationTop, NavigationWrapper } from "./styles";

export const Navigation = () => {
  const profile = useProfile();

  return (
    <NavigationWrapper>
      <NavigationTop>
        <NavItem
          to="/courses"
          icon={<CourseIcon fill={Colors.blue} />}
          name="Курсы"
        />
        <NavItem
          to="/friends"
          icon={<FriendsIcon fill={Colors.blue} />}
          name="Друзья"
        />
        <NavItem
          to="/rating"
          icon={<RatingIcon fill={Colors.blue} />}
          name="Рейтинг"
        />
      </NavigationTop>
      <NavigationBottom>
        <NavItem
          onClick={profile.logout}
          icon={<ExitIcon fill={Colors.blue} />}
          name="Выйти"
        />
      </NavigationBottom>
    </NavigationWrapper>
  );
};
