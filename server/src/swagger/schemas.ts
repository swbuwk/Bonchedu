import { ApiBodyOptions } from "@nestjs/swagger"

export const uploadFileSchema: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
      
    },
  },
}

export const addCourseSchema: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
      name: {
        type: 'string',
        format: 'text'
      },
      description: {
        type: 'string',
        format: 'text'
      }
    },
  },
}