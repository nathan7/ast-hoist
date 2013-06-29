# es-hoist 

  Hoists your variable and function declarations.
  Consumes/produces Mozilla ASTs.

## API

### Hoist()

  Returns a visitor that hoists everything in the given AST.
  You probably want to use it with [estraverse](https://github.com/Constellation/estraverse).
