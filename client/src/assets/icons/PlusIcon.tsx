import { FC } from "react";
import { IconProps, IconWrapper } from "./IconProps";

export const PlusIcon: FC<IconProps> = ({ fill, ...props }) => {
  return (
    <IconWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        width="512"
        height="512"
        fill={fill}
      >
        <g>
          <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
        </g>
      </svg>
    </IconWrapper>
  );
};
