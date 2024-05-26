import { FC, useMemo } from "react";
import { Input } from "../../../../components/Input/Input";
import { InferType, object, string } from "yup";
import { useFormik } from "formik";
import { Textbox } from "../../../../components/Textbox/Textbox";
import Button from "../../../../components/Button";
import {
  ModalName,
  SharedModalProps,
} from "../../../../store/slices/modalSlice";
import { useModal } from "../../../../hooks/useModal";
import { useToasts } from "../../../../hooks/useToasts";
import { CreateChapterWrapper } from "./styles";
import { useParams } from "react-router-dom";
import { useAddChapterMutation } from "../../../../store/api";

const addChapterSchema = object({
  name: string().required("Введите название"),
  description: string().required("Опишите главу"),
});

interface AddChapterFormValues extends InferType<typeof addChapterSchema> {}

enum addChapterFormFields {
  name = "name",
  description = "description",
}

const addChapterFormInit: AddChapterFormValues = {
  [addChapterFormFields.name]: "",
  [addChapterFormFields.description]: "",
};

export interface CreateChapterModalProps extends SharedModalProps {
  name: ModalName.createChapter;
}

export const CreateChapterModal: FC<CreateChapterModalProps> = ({}) => {
  const { id: courseId } = useParams<{ id: string }>();
  const modal = useModal();
  const toasts = useToasts();
  const [addChapter] = useAddChapterMutation();
  
  const handleSubmit = (values: AddChapterFormValues) => {
    if (!courseId) return;
    addChapter({ ...values, courseId })
      .then(() => {
        modal.close();
        toasts.success("Глава успешно создана");
      })
      .catch(() => {
        toasts.error("Ошибка при создании главы");
      });
  };

  const formik = useFormik({
    initialValues: addChapterFormInit,
    validationSchema: addChapterSchema,
    onSubmit: handleSubmit,
  });

  const hasEmptyField = useMemo(
    () =>
      Object.keys(formik.values).some((key) => !(formik.values as any)[key]),
    [formik.values]
  );

  return (
    <CreateChapterWrapper onSubmit={formik.handleSubmit}>
      <Input
        id={addChapterFormFields.name}
        label="Название главы"
        required
        value={formik.values.name}
        error={formik.errors.name}
        onChange={formik.handleChange}
        onClick={() => formik.setFieldTouched(addChapterFormFields.name)}
      />
      <Textbox
        id={addChapterFormFields.description}
        label="Описание"
        required
        value={formik.values.description}
        error={formik.errors.description}
        onChange={formik.handleChange}
        onClick={() => formik.setFieldTouched(addChapterFormFields.description)}
      />
      <Button disabled={hasEmptyField || !formik.isValid} type="submit">
        Создать главу
      </Button>
    </CreateChapterWrapper>
  );
};
