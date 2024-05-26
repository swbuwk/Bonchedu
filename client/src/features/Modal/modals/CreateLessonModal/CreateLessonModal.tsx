import { InferType, number, object, string } from "yup";
import { ModalName, SharedModalProps } from "../../../../store/slices/modalSlice";
import { FC, useMemo } from "react";
import { CreateLessonWrapper } from "./styles";
import { Input } from "../../../../components/Input/Input";
import Button from "../../../../components/Button";
import { useFormik } from "formik";
import { Difficulties } from "../../../../api/types/entities/Lesson";
import RadioButton from "../../../../components/RadioButton";
import { IRadioButtonItem } from "../../../../components/RadioButton/RadioButton";
import { useToasts } from "../../../../hooks/useToasts";
import { useModal } from "../../../../hooks/useModal";
import { useParams } from "react-router-dom";
import { useAddLessonMutation } from "../../../../store/api";

const addLessonSchema = object({
  name: string().required("Введите название"),
  gainedExperience: number().required("Введите количество опыта").moreThan(0, "Введите положительное число"),
  difficulty: string().required("Выберите сложность")
});

interface AddLessonFormValues extends InferType<typeof addLessonSchema> {}

enum addLessonFormFields {
  name = "name",
  gainedExperience = "gainedExperience",
  difficulty = "difficulty"
}

const addLessonFormInit: AddLessonFormValues = {
  [addLessonFormFields.name]: "",
  [addLessonFormFields.gainedExperience]: 0,
  [addLessonFormFields.difficulty]: Difficulties.medium,
};

export interface CreateLessonModalProps extends SharedModalProps {
  name: ModalName.createLesson;
}

export const CreateLessonModal: FC<CreateLessonModalProps> = () => {
  const { id: chapterId } = useParams<{ id: string }>()
  const [addLesson] = useAddLessonMutation()
  const toasts = useToasts()
  const modal = useModal()

  const handleSubmit = (values: AddLessonFormValues) => {
    console.log(chapterId)
    if (!chapterId) return
    addLesson({ ...values, chapterId })
      .then(() => {
        modal.close();
        toasts.success("Занятие успешно создано");
      })
      .catch(() => {
        toasts.error("Ошибка при создании занятия");
      });
  };

  const formik = useFormik({
    initialValues: addLessonFormInit,
    validationSchema: addLessonSchema,
    onSubmit: handleSubmit,
  });

  const hasEmptyField = useMemo(
    () =>
      Object.keys(formik.values).some((key) => !(formik.values as any)[key] ),
    [formik.values]
  );

  const radioButtonItems: IRadioButtonItem[] = [
    {
      id: Difficulties.easy,
      name: "Лёгкая"
    },
    {
      id: Difficulties.medium,
      name: "Средняя"
    },
    {
      id: Difficulties.hard,
      name: "Сложная"
    }
  ] 

  const handleDiffChange = (item: IRadioButtonItem) => {
    formik.setFieldValue(addLessonFormFields.difficulty, item.id)
  }

  return (
    <CreateLessonWrapper onSubmit={formik.handleSubmit}>
      <Input
        id={addLessonFormFields.name}
        label="Название занятия"
        required
        value={formik.values.name}
        error={formik.errors.name}
        onChange={formik.handleChange}
        onClick={() => formik.setFieldTouched(addLessonFormFields.name)}
      />
      <Input
        id={addLessonFormFields.gainedExperience}
        label="Количество опыта за ответ"
        required
        value={formik.values.gainedExperience}
        error={formik.errors.gainedExperience}
        onChange={formik.handleChange}
        type="number"
        min={0}
        placeholder="30"
        onClick={() => formik.setFieldTouched(addLessonFormFields.gainedExperience)}
      />
      <RadioButton
        activeId={formik.values.difficulty}
        items={radioButtonItems}
        onSelect={handleDiffChange}
      />
      <Button disabled={hasEmptyField || !formik.isValid} type="submit">
        Создать занятие
      </Button>
    </CreateLessonWrapper>
  )
}
