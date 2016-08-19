import { Set, List } from 'immutable'
import Node from './Node'

export function balancedLeaves(...values) {
  const leaves = []

  function* balancedPermutations(balance, ...values) {
    if (balance < 0) {
      return
    }

    if (!values.length && balance > 0) {
      return
    }

    for (var i = 0; i < values.length; i++) {
      const v = values[i]
      const headValues = List(values).take(i)
      const tailValues = List(values).skip(i + 1)
      const nextBalance = v ? balance + 1 : balance - 1;
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

export function parenthesize(n) {
  const values = []
  for (var i = 0; i < n; i++) {
    values.push(true)
    values.push(false)
  }

  const { leaves } = balancedLeaves(...values)
  const paths = Set(leaves.map(leaf => leaf.pathFromRoot().join('')))
  console.log(paths.toJS())
}
