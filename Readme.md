# ast-hoist 

  Hoists your variable and function declarations.
  Consumes/produces Mozilla ASTs.

## API

### Hoist(recurse = false)

  Returns a visitor that hoists everything in the top-level scope in the given AST.
  If recurse is truthy, it will recurse to cover every scope in the AST.
  You probably want to use it with [estraverse](https://github.com/Constellation/estraverse).
