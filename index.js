module.exports = exports = Hoist
exports.Hoist = Hoist

function Hoist() {
  var visitors = []
    , visitor
  return (
  { enter: function(node, parent) {
      var ret = visitor && visitor.enter && visitor.enter.apply(this, arguments)
      if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration' || node.type === 'Program')
        visitors.push(visitor = HoistScope())
      return ret
    }
  , leave: function(node, parent) {
      var ret = visitor && visitor.leave && visitor.leave.apply(this, arguments)
      if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration' || node.type === 'Program')
        visitor = visitors.pop()
      return ret
    }
  })
}

function HoistScope() {
  var variables = []
    , functions = []
  return (
  { enter: function(node, parent) { switch (node.type) {
      case 'VariableDeclaration':
        ;[].push.apply(variables, node.declarations)

        expression =
          { type: 'SequenceExpression'
          , expressions: node.declarations.map(function(declaration) {
              if (declaration.init)
                return (
                { type: 'AssignmentExpression'
                , operator: '='
                , left: declaration.id
                , right: declaration.init
                })
              else if (node === parent.left)
                return declaration.id
            })
          }

        if (parent.type === 'BlockStatement' && expression.expressions.length === 0) {
          if ((index = parent.body.indexOf(node)) !== -1)
            parent.body.splice(index, 1)
          return
        }

        return (node === parent.left || node === parent.init)
          ? expression
          : { type: 'ExpressionStatement', expression: expression }

      break
      case 'FunctionDeclaration':
        functions.push(node)
        if ((index = parent.body.indexOf(node)) !== -1)
          parent.body.splice(index, 1)

      break
    } }
  , leave: function(node, parent) {
      if (node.type !== 'FunctionExpression' && node.type !== 'FunctionDeclaration' && node.type !== 'Program') return
      if (variables.length) node.body.body.unshift(
        { type: 'VariableDeclaration'
        , kind: 'var'
        , declarations: variables.map(function(variable) { return { type: 'VariableDeclarator', id: variable.id } })
        })
      ;[].unshift.apply(node.body.body, functions)
    }
  })
}
