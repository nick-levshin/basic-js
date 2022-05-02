const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr))
    throw new Error("'arr' parameter must be an instance of the Array!");

  const result = arr.slice().filter((item) => item);
  result.forEach((item, i) => {
    if (result[i] === '--double-next') {
      typeof result[i + 1] === 'number' && result[i + 1]
        ? result.splice(i, 1, result[i + 1])
        : result.splice(i, 1);
    } else if (result[i] === '--double-prev') {
      typeof result[i - 1] === 'number' && result[i - 1]
        ? result.splice(i, 1, result[i - 1])
        : result.splice(i, 1);
    } else if (result[i] === '--discard-next') {
      typeof result[i + 1] === 'number' && result[i + 1]
        ? result.splice(i, 2, null)
        : result.splice(i, 1);
    } else if (result[i] === '--discard-prev') {
      typeof result[i - 1] === 'number' && result[i - 1]
        ? result.splice(i - 1, 2, null)
        : result.splice(i, 1);
    }
  });

  return result.filter((item) => item);
}

module.exports = {
  transform,
};
