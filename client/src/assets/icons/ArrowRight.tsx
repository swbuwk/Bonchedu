import { FC } from "react";
import { IconProps, IconWrapper } from "./IconProps";

export const ArrowRight: FC<IconProps> = ({ fill, ...props }) => {
  return (
    <IconWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="512"
        height="512"
        fill={fill}
      >
        <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
      </svg>
    </IconWrapper>
  );
};