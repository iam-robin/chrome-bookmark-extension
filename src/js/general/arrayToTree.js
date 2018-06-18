// format array as tree
export default function arrayToTree(arr, separator) {
  let formatted = {};

  for (let i = 0; i < arr.length; i++) {
    let category = arr[i],
      parts = category.split(separator),
      current = formatted;

    for (let e = 0; e < parts.length; e++) {
      let lvl = parts[e];

      if (!current[lvl]) {
        current[lvl] = {};
      }

      current = current[lvl];
    }
  }
  return formatted;
}