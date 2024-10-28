// Loader functionality
const loader = document.querySelector('.loader-container');

function showLoader() {
  loader.classList.remove('hidden');
  loader.classList.add('flex');
}

function hideLoader() {
  loader.classList.remove('flex');
  loader.classList.add('hidden');
}

export { showLoader, hideLoader };
