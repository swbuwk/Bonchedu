import { FC, ReactNode } from "react";
import { NavItemIcon, NavItemTitle, NavItemWrapper } from "./styles";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  to?: string;
  onClick?: () => void;
  icon: ReactNode;
  name: string;
}

export const NavItem: FC<NavItemProps> = ({ to, icon, onClick, name }) => {
  const navigate = useNavigate();

  return (
    <NavItemWrapper onClick={onClick ? onClick : () => navigate(to ? to : "")}>
      <NavItemIcon>{icon}</NavItemIcon>
      <NavItemTitle>{name}</NavItemTitle>
    </NavItemWrapper>
  );
};
