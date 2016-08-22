import { Set, List } from 'immutable'
import Node from './Node'
import Printer from './Printer'

function balancedLeaves(...values) {
  const leaves = []

  function* balancedPermutations(balance, ...values) {
    if (balance < 0) {
      return
    }

    if (!values.length && balance > 0) {
      return
    }

    const visited = {}
    for (var i = 0; i < values.length; i++) {
      const v = values[i]
      if (visited[v]) {
        continue
      }
      visited[v] = true

      const nextBalance = v ? balance + 1 : balance - 1
      const headValues = List(values).take(i)
      const tailValues = List(values).skip(i + 1)

      const nextList = headValues.concat(tailValues)
      const node = new Node(v, ...balancedPermutations(nextBalance, ...nextList))

      if (nextList.size === 0 && nextBalance === 0) {
        leaves.push(node)
      }

      yield node
    }
  }

  const tree = [...balancedPermutations(0, ...values)]

  return { tree, leaves }
}

function setup(n) {
  const values = []
  for (var i = 0; i < n; i++) {
    values.push(true)
    values.push(false)
  }

  return balancedLeaves(...values)
}

export function parenthesize(n) {
  const { leaves } = setup(n)
  const paths = leaves.map(leaf =>
    leaf.pathFromRoot().map(node => node.value ? '(' : ')').join('')
  )
  console.log(paths)
}

export function latticePaths(n) {
  const { leaves } = setup(n)
  const paths = leaves.map(leaf => leaf.pathFromRoot())
  const groups = paths.map(p => {
    let height = 0
    const numbers = []

    p.forEach(node => {
      if (node.value) {
        numbers.push(height)
      } else {
        height++
      }
    })

    return numbers
  })

  console.log(groups)
}

export function mountainRanges(n) {
  const { leaves } = setup(n)
  const paths = leaves.map(leaf => leaf.pathFromRoot())
  const printer = new Printer(n, 2 * n * paths.length + n + 1)
  let column = 0

  paths.forEach(p => {
    let row = 0
    let lastVisited = false

    p.forEach(node => {
      if (node.value === lastVisited) {
        if (node.value) {
          row++
        } else {
          row--
        }
      }

      lastVisited = node.value
      const char = node.value ? '/' : '\\'
      printer.insert(++column, row, char)
    })

    column++
  })

  printer.print()
}
