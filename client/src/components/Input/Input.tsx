import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { Error, InputTopText, InputWrapper, Label } from "./styles";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
  boxShadow?: boolean
  fs?: string
}

export const Input: FC<InputProps> = ({
  label,
  fullWidth = true,
  required,
  error,
  boxShadow,
  fs,
  ...props
}) => {
  return (
    <InputWrapper boxShadow={boxShadow} fs={fs} fullWidth={fullWidth}>
      <InputTopText>
        {label && (
          <Label>
            {label} <span>{required && "*"}</span>
          </Label>
        )}
        {error && <Error>{error}</Error>}
      </InputTopText>
      <input {...props} />
    </InputWrapper>
  );
};
