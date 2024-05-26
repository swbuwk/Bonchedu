import { ChangeEvent, FC, useState } from "react";
import { ImageUploaderTitle, ImageUploaderWrapper } from "./styles";
import { ImageIcon } from "../../assets/icons/ImageIcon";
import { Endpoints } from "../../api";
import { useToasts } from "../../hooks/useToasts";

interface ImageUploaderProps {
  onUpload?: (image: Blob) => void;
  resizableHeight?: boolean
  defaultValue?: string
}

export const ImageUploader: FC<ImageUploaderProps> = ({
  onUpload,
  resizableHeight,
  defaultValue
}) => {
  const toasts = useToasts()
  const [image, setImage] = useState<{
    preview: string;
  }>({
    preview: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (e.target.files[0].size > 5242880) {
      // setError("Размер файла должен быть не больше 5МБ");
      return;
    }

    if (!["image/jpeg", "image/png", "image/gif"].includes(e.target.files[0].type)) {
      toasts.error("Недопустимый формат файла");
      return;
    }

    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
    });
    onUpload && onUpload(e.target.files[0]);
  };

  return (
    <ImageUploaderWrapper resizableHeight={resizableHeight}>
      {!image.preview && !defaultValue ? 
        <>
          <ImageIcon />
          <ImageUploaderTitle>Загрузите фото</ImageUploaderTitle>
        </> : <></>
      }
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      {(image.preview || defaultValue) && <img src={image.preview || (Endpoints.files + defaultValue)} />}
    </ImageUploaderWrapper>
  );
};
