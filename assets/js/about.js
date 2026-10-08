const storyFiles = Array.from(document.querySelectorAll('.story-file'));
const filePreviews = Array.from(document.querySelectorAll('.file-preview'));
const selectedFileName = document.querySelector('#selected-file-name');

function selectStoryFile(file, revealOnMobile = false) {
  storyFiles.forEach((item) => {
    const selected = item === file;
    item.classList.toggle('is-selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });

  filePreviews.forEach((preview) => {
    preview.hidden = preview.id !== file.getAttribute('aria-controls');
  });

  if (selectedFileName) {
    selectedFileName.textContent = file.querySelector('.file-name strong').textContent;
  }

  if (revealOnMobile && window.matchMedia('(max-width: 760px)').matches) {
    document.querySelector('.preview-area').scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start'
    });
  }
}

storyFiles.forEach((file, index) => {
  file.addEventListener('click', () => selectStoryFile(file, true));
  file.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const offset = event.key === 'ArrowDown' ? 1 : -1;
    const nextFile = storyFiles[(index + offset + storyFiles.length) % storyFiles.length];
    nextFile.focus();
    selectStoryFile(nextFile);
  });
});
