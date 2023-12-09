import { ChangeEvent, FC, useState } from "react";
import { ImageUploaderTitle, ImageUploaderWrapper } from "./styles";
import { ImageIcon } from "../../assets/icons/ImageIcon";

interface ImageUploaderProps {
  onUpload?: (image: Blob) => void;
  uploadOnServer?: boolean;
}

export const ImageUploader: FC<ImageUploaderProps> = ({
  onUpload,
  // uploadOnServer,
}) => {
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

    if (e.target.files[0].type !== "image/jpeg") {
      // setError("Недопустимый формат файла");
      return;
    }

    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
    });
    onUpload && onUpload(e.target.files[0]);
  };

  return (
    <ImageUploaderWrapper>
      <ImageIcon />
      <ImageUploaderTitle>Загрузите фото</ImageUploaderTitle>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      {image.preview && <img src={image.preview} />}
    </ImageUploaderWrapper>
  );
};
