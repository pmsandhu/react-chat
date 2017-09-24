export const colors = {
  taken: 0,
  hex: ['#5FB3B3', '#C594C5', '#EC5f67', '#6699CC',
        '#F99157', '#99C794', '#FAC863', '#65737E'],
  assign() {
    if (this.taken === this.hex.length - 1) this.taken = 0
    return this.hex[this.taken++]
  }
}

export const stringify = (type, payload) => JSON.stringify({ type, payload })

