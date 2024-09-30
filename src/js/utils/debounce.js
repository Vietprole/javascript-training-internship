// debounce function to reset timeout when the mainFunction is called again
function debounce(mainFunction, delay) {
  let timeoutId;
  return function doSomething(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
}

export default debounce;
