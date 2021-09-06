let postEditForm = document.getElementById('postEditForm');

postEditForm.addEventListener('submit', (event) => {
  // find number of image uploads
  let imageUploads = document.querySelector('.imageUploads').files.length;

  // find number of  existing images
  let existingImages = document.querySelectorAll(
    '.imagesDeleteCheckbox',
  ).length;

  // find number of deletions
  let imageDeletions = document.querySelectorAll(
    '.imagesDeleteCheckbox:checked',
  ).length;

  let newTotal = existingImages + imageUploads - imageDeletions;
  if (newTotal > 4) {
    event.preventDefault();

    alert(
      `You need to delete at least ${newTotal - 4} more image${
        newTotal === 5 ? '' : 's'
      }`,
    );
  }
});
