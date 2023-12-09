import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import { Error, Label, TextboxTopText, TextboxWrapper } from "./styles";

interface TextboxProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const Textbox: FC<TextboxProps> = ({
  label,
  fullWidth = true,
  required,
  error,
  ...props
}) => {
  return (
    <TextboxWrapper fullWidth={fullWidth}>
      <TextboxTopText>
        {label && (
          <Label>
            {label} <span>{required && "*"}</span>
          </Label>
        )}
        {error && <Error>{error}</Error>}
      </TextboxTopText>
      <textarea {...props} />
    </TextboxWrapper>
  );
};
