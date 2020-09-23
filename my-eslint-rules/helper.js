function isBlock(node) {
    return !node || node.type === 'BlockStatement';
}

const disallowedMethods = ['log', 'info', 'warn', 'error', 'dir']

function looksLike(a, b) {
    return (
      a &&
      b &&
      Object.keys(b).every(bKey => {
        const bVal = b[bKey]
        const aVal = a[bKey]
        if (typeof bVal === 'function') {
          return bVal(aVal)
        }
        return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
      })
    )
  }
  
  function isPrimitive(val) {
    return val == null || /^[sbn]/.test(typeof val)
  }

exports.isBlock = isBlock;
exports.disallowedMethods = disallowedMethods;
exports.looksLike = looksLike;
exports.isPrimitive = isPrimitive;