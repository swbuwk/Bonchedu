import { FC, useMemo, useState } from "react";
import { CreateCourseWrapper } from "./styles";
import { Input } from "../../../../components/Input/Input";
import { InferType, object, string } from "yup";
import { useFormik } from "formik";
import { Textbox } from "../../../../components/Textbox/Textbox";
import Button from "../../../../components/Button";
import ImageUploader from "../../../../components/ImageUploader";
import { ModalName, SharedModalProps } from "../../../../store/slices/modalSlice";
import { useAddCourseMutation, useLazyGetCoursesQuery } from "../../../../store/services/course";
import { useModal } from "../../../../hooks/useModal";
import { useToasts } from "../../../../hooks/useToasts";

const addCourseSchema = object({
  name: string().required("Введите название"),
  description: string().required("Опишите курс"),
});

interface AddCourseFormValues extends InferType<typeof addCourseSchema> { }

enum addCourseFormFields {
  name = "name",
  description = "description",
}

const addCourseFormInit: AddCourseFormValues = {
  [addCourseFormFields.name]: "",
  [addCourseFormFields.description]: "",
};

export interface CreateCourseModalProps extends SharedModalProps {
  name: ModalName.createCourse
}

export const CreateCourseModal: FC<CreateCourseModalProps> = ({ }) => {
  const [image, setImage] = useState<Blob | null>(null);
  const modal = useModal()
  const toasts = useToasts()
  const [addCourse] = useAddCourseMutation()
  const [getCourses] = useLazyGetCoursesQuery()
  const handleSubmit = (values: AddCourseFormValues) => {
    addCourse({ ...values, cover: image }).then(() => {
      getCourses(undefined)
      modal.close()
      toasts.success("Курс успешно создан")
    }).catch(() => {
      toasts.error("Ошибка при создании курса")
    })
  };

  const formik = useFormik({
    initialValues: addCourseFormInit,
    validationSchema: addCourseSchema,
    onSubmit: handleSubmit,
  });

  const hasEmptyField = useMemo(
    () =>
      Object.keys(formik.values).some((key) => !(formik.values as any)[key]),
    [formik.values]
  );

  return (
    <CreateCourseWrapper onSubmit={formik.handleSubmit}>
      <ImageUploader onUpload={(img) => setImage(img)} />
      <Input
        id={addCourseFormFields.name}
        label="Название курса"
        required
        value={formik.values.name}
        error={formik.errors.name}
        onChange={formik.handleChange}
        onClick={() => formik.setFieldTouched(addCourseFormFields.name)}
      />
      <Textbox
        id={addCourseFormFields.description}
        label="Описание"
        required
        value={formik.values.description}
        error={formik.errors.description}
        onChange={formik.handleChange}
        onClick={() => formik.setFieldTouched(addCourseFormFields.description)}
      />
      <Button
        disabled={!image || hasEmptyField || !formik.isValid}
        type="submit"
      >
        Создать курс
      </Button>
    </CreateCourseWrapper>
  );
};
