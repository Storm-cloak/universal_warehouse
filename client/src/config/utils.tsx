import cloneDeep from "lodash/cloneDeep";
export function reshapeData(data: any) {
  const copyData: any = cloneDeep(data?.warehouses?.nodes);
  const idMapping = copyData?.reduce((acc: any, el: any, i: any) => {
    acc[el.id] = i;
    return acc;
  }, {});
  let root;
  copyData.forEach((el: any) => {
    // Handle the root element
    if (el.parentId === null) {
      root = el;
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = copyData[idMapping[el.parentId]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });

  return root;
}
