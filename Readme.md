# ast-hoist 

  Hoists your variable and function declarations.
  Consumes/produces Mozilla ASTs.

## API

### hoist(Node, recurse = false) -> Node

  Returns a new AST with all variable declarations hoisted into a single var statement at the start of the scope, and all function declarations hoisted right after it.
  If recurse is truthy, it will recurse to cover every scope in the AST.

