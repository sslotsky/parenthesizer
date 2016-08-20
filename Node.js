export default class Node {
  constructor(value, ...childNodes) {
    this.value = value
    childNodes.forEach(n => {
      n.addParent(this)
    })

    this.children = childNodes
  }

  addParent(node) {
    this.parent = node
  }

  pathFromRoot() {
    const parentPath = this.parent && this.parent.pathFromRoot() || []
    return parentPath.concat([this])
  }
}
