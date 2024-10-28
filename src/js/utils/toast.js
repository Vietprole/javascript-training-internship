// Toast functionality

function showToast(toast) {
  toast.classList.remove('hidden');
  toast.classList.add('flex');
}

function hideToast(toast) {
  toast.classList.remove('flex');
  toast.classList.add('hidden');
}

export { showToast, hideToast };
