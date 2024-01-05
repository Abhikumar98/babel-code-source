const abPath = require("path")

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      Program: {

        exit(path) {

          const importDeclaration = t.importDeclaration(
            [], t.stringLiteral(abPath.resolve(__dirname, './src/keylog.js'))
          )

          path.node.body.unshift(importDeclaration)
        }

      },
      JSXText(path, state) {
        const nodes = path.container;
        nodes.forEach((node) => {

          if (node.value && !node.value.trim()) return;

          if (!node.loc?.start?.line || !node.loc?.start?.column) return;

          if (node.type === "JSXText") {
            const attribute = t.jsxAttribute(
              t.jsxIdentifier("data-source"),
              t.stringLiteral(
                `${state.file.opts.filename}:${node.loc?.start?.line}:${node.loc?.start?.column}`
              )
            );
            path.parent.openingElement.attributes.push(attribute);
          }
        });
      },
      JSXElement(path, state) {
        const { children } = path.node;

        if (path.node.openingElement.name.name === "a") return;

        children.forEach((child) => {
          if (child.type === "JSXText") {
            const isValidMeme = state.opts.memes.find((meme) =>
              child.value.toLowerCase().includes(meme.literal.toLowerCase())
            );

            if (!isValidMeme) return;

            const splitText = child.value.split(isValidMeme.literal);

            const preMemeText = t.stringLiteral(splitText[0]);
            const postMemeText = t.stringLiteral(splitText[1]);


            const anchorElement = t.jSXElement(
              t.jSXOpeningElement(t.jSXIdentifier("a"), [
                t.jSXAttribute(
                  t.jSXIdentifier("href"),
                  t.stringLiteral(isValidMeme.value)
                ),
                t.jSXAttribute(
                  t.jSXIdentifier("target"),
                  t.stringLiteral("_blank")
                ),
                t.jsxAttribute(
                  t.jsxIdentifier("data-source"),
                  t.stringLiteral(
                    `${state.file.opts.filename}:${child.loc?.start?.line}:${child.loc?.start?.column}`
                  ))
              ]),
              t.jSXClosingElement(t.jSXIdentifier("a")),
              [t.jSXText(isValidMeme.literal)],
              false
            );

            const newChildren = [preMemeText, anchorElement, postMemeText];

            path.node.children = [...newChildren];
          }
        });
      }
    }
  };
}
