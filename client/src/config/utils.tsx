import cloneDeep from "lodash/cloneDeep";

export function reshapeData(data: any, searchValue: string) {
  const copyData: any = cloneDeep(data?.warehouses?.nodes);
  const TREE = makeTree(copyData, null);
  if (searchValue) {
    const filteredTree = searchInTree(TREE, searchValue);
    console.log(filteredTree);
    return [filteredTree];
  }
  return TREE;
}

function makeTree(nodes, parentId) {
  return nodes
    .filter((node) => node.parentId === parentId)
    .reduce(
      (tree, node) => [
        ...tree,
        {
          ...node,
          children: makeTree(nodes, node.id),
        },
      ],
      []
    );
}

function searchInTree(nodes, value) {
  let result;
  nodes.some((node) => {
    let children;
    if (node.title["AZ"].includes(value) || node.title2["AZ"].includes(value)) {
      return (result = node);
    }
    if (node.children && (children = searchInTree(node.children, value))) {
      return (result = Object.assign({}, node, [children]));
    }
  });

  return result;
}
