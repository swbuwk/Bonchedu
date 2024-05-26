import { FC, useEffect } from "react"
import { Difficulties, Lesson } from "../../../../api/types/entities/Lesson"
import { LessonEditableWrapper } from "./styles"
import { number, object, string } from "yup";
import { useFormik } from "formik";
import { Input } from "../../../../components/Input/Input";
import RadioButton from "../../../../components/RadioButton";
import { IRadioButtonItem } from "../../../../components/RadioButton/RadioButton";
import { useDebouncedEffect } from "../../../../hooks/useDebouncedEffect";
import { useLazyGetLessonByIdQuery, useUpdateLessonMutation } from "../../../../store/api";

const addLessonSchema = object({
  name: string().required("Введите название"),
  gainedExperience: number().required("Введите количество опыта").moreThan(0, "Введите положительное число"),
  difficulty: number().required("Выберите сложность")
});

// interface AddLessonFormValues extends InferType<typeof addLessonSchema> {}

enum addLessonFormFields {
  name = "name",
  gainedExperience = "expirienceGain",
  difficulty = "difficulty"
}

// const addLessonFormInit: AddLessonFormValues = {
//   [addLessonFormFields.name]: "",
//   [addLessonFormFields.expirience]: 0,
//   [addLessonFormFields.difficulty]: Difficulties.medium,
// };

export interface LessonEditableProps {
  lesson: Lesson
}

export const LessonEditable: FC<LessonEditableProps> = ({ lesson }) => {
  const [updateLesson] = useUpdateLessonMutation()
  const [getLesson] = useLazyGetLessonByIdQuery()
  const [getChapterLessons] = useLazyGetLessonByIdQuery()

  const { name, gainedExperience, difficulty } = lesson
  const formInitital = { name, gainedExperience, difficulty }

  const formik = useFormik({
    initialValues: formInitital,
    validationSchema: addLessonSchema,
    onSubmit: () => {},
  });

  useDebouncedEffect(() => {
    const { entityType, ...rest } = lesson
    updateLesson({ ...rest, ...formik.values })
      .then(() => {
        getLesson(lesson.id)
      })
      .catch(() => {
        console.log("Error")
      });
  }, [formik.values], 700)

  useEffect(() => {
    return () => {
      getChapterLessons(lesson.chapterId, false)
    }
  }, [])

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
    <LessonEditableWrapper>
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
        disabled={lesson.finalized}
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
    </LessonEditableWrapper>
  )
}
