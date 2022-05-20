export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const imports = new Set();

  root.find(j.CallExpression, { callee: { object: { name: "_" } } }).replaceWith(p => {
    imports.add(p.value.callee.property.name);
    return j.callExpression(j.identifier(p.value.callee.property.name), p.value.arguments);
  });

  root
    .find(j.ImportDeclaration, {
      specifiers: [{ local: { name: "_" } }],
      source: { value: "lodash-es" }
    })
    .replaceWith(p => {
      const specifier = Array.from(imports).map(importStr => j.importSpecifier(j.identifier(importStr)));

      return j.importDeclaration(specifier, p.value.source);
    });

  return root.toSource();
}
