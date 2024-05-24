import { capitalizeFirstLetter } from "./capitalize"

export const generateFormData = (data: any) => {
  const formData = new FormData()
  Object.keys(data).forEach(key => {
    formData.append(capitalizeFirstLetter(key), data[key])
  })
  return formData
}