export const transformArr = (old, updated) => old.concat(updated.slice(old.length))

export const date = () => {
  return new Date().toLocaleString(
    navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    }
  )
}
