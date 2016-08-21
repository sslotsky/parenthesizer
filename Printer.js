import { Range, Repeat } from 'immutable'

export default class Printer {
  constructor(height, width) {
    this.screen = Range(0, height).map(() => Repeat(' ', width)).toJS()
  }

  insert(x, y, char) {
    this.screen[y][x] = char
  }

  print() {
    this.screen.reverse().forEach(row => {
      const text = row.join('')
      console.log(text)
    })
  }
}
