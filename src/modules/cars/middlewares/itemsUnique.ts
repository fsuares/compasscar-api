import { Joi } from 'celebrate'

export const itemsUnique = (value: string[], helpers: Joi.CustomHelpers) => {
  const hasDuplicates = value.length !== new Set(value).size
  if (hasDuplicates) {
    return helpers.error('array.unique')
  }
  return value
}
