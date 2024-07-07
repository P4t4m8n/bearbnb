const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Replace this with the actual path to your TSX file
const filePath = path.resolve(__dirname, '../components/svgs/amentiasSVG.tsx');

// Read the file content
const fileContent = fs.readFileSync(filePath, 'utf8');

// Parse the file content using Babel parser
const ast = parser.parse(fileContent, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
});

const svgComponents = [];

traverse(ast, {
  ExportNamedDeclaration(path) {
    const declaration = path.node.declaration;
    if (declaration.type === 'VariableDeclaration') {
      declaration.declarations.forEach((declarator) => {
        if (declarator.init && declarator.init.type === 'ArrowFunctionExpression') {
          const name = declarator.id.name;
          let viewBox = '';
          let svgPath = '';

          path.traverse({
            JSXElement(innerPath) {
              const openingElement = innerPath.node.openingElement;
              if (openingElement.name.name === 'svg') {
                openingElement.attributes.forEach((attribute) => {
                  if (attribute.name.name === 'viewBox') {
                    viewBox = attribute.value.value;
                  }
                });
              }

              innerPath.traverse({
                JSXOpeningElement(jsxPath) {
                  if (jsxPath.node.name.name === 'path') {
                    jsxPath.node.attributes.forEach((attr) => {
                      if (attr.name.name === 'd') {
                        svgPath = attr.value.value;
                      }
                    });
                  }
                },
              });
            },
          });

          svgComponents.push({
            name,
            path: svgPath,
            viewBox,
            category: 'Default', // Replace this with the actual category if needed
          });
        }
      });
    }
  },
});

console.log(svgComponents);
