export default function ChecksTypesAndNull(value: string | unknown[] | object) {
  if (!value) {
    return true
  }

  if (typeof value === 'string') {
    if (!value.trim()) {
      return true
    }
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true
    }
  }

  if (typeof value === 'object') {
    if (Object.keys(value).length === 0) {
      return true
    }
  }

  return false
}
