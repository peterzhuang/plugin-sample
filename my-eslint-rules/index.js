const { isBlock, disallowedMethods, looksLike, isPrimitive } = require("./helper");
module.exports = {
    rules: {
        "async-func-name": {
            create: function (context) {
                return {
                    FunctionDeclaration(node) {
                        if (node.async && !/Async$/.test(node.id.name)) {
                            context.report({
                                node,
                                  message: "Async function name must end in 'Async'"
                            });
                        }
                    }
                  };
            }
        },
        "if-else-block-statement": {
            create: function (context) {
                return {
                    IfStatement(node) {
                            if (isBlock(node.consequent) && isBlock(node.alternate)) {
                                return;       	
                            }
                              if (!isBlock(node.consequent)) {
                                context.report({
                                  node: node.consequent,
                                  message: 'y u no block?'
                                });
                            } else if (!isBlock(node.alternate)) {
                                context.report({
                                  node: node.alternate,
                                  message: 'y u no block?'
                                });
                            }
                    }
                };
            }
        },
        "no-console-1": {
            create(context) {
                return {
                  Identifier(node) {
                    if (node.name !== 'console') {
                      return
                    }
                    context.report({
                      node,
                      message: 'Using console is not allowed',
                    })
                  },
                }
              },
        },
        "no-console-2": {
          create(context) {
            return {
              Identifier(node) {
                if (
                  !looksLike(node, {
                    name: 'console',
                    parent: {
                      type: 'MemberExpression',
                      parent: {type: 'CallExpression'},
                      property: {
                        name: val => disallowedMethods.includes(val),
                      },
                    },
                  })
                ) {
                  return
                }
                context.report({
                  node: node.parent.property,
                  message: 'Using console is not allowed',
                })
              },
            }
          },
      },      
    }
};