export const colors = {
  taken: 0,
  hex: [
    '#5FB3B3', '#C594C5', '#EC5f67',
    '#6699CC', '#F99157', '#99C794',
    '#FAC863', '#65737E'
  ],
  assign() {
    if (this.taken === this.hex.length - 1) {
      this.taken = 0
    }
    return this.hex[this.taken++]
  }
}

export const getTime = () => {
  let hour = new Date().getHours()
  let minutes = new Date().getMinutes()
  minutes < 10 ?
    minutes = '0' + minutes :
    minutes
  if (hour > 12) {
    return `${hour - 12}:${minutes} PM`
  }
  return `${hour}:${minutes} AM`
}

export const stringify = (type, payload) => {
  return JSON.stringify({ type, payload })
}
