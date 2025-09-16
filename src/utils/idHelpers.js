// src/utils/idHelpers.js
export const normalizeId = (id) => {
  if (id === null || id === undefined || id === '') return null
  return typeof id === 'string' ? parseInt(id) : id
}

export const ensureNumericId = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      id: normalizeId(item.id),
      authorId: item.authorId ? normalizeId(item.authorId) : undefined
    }))
  }
  
  if (typeof data === 'object' && data !== null) {
    return {
      ...data,
      id: normalizeId(data.id),
      authorId: data.authorId ? normalizeId(data.authorId) : undefined
    }
  }
  
  return data
}