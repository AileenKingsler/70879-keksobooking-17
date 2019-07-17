'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var avatarChooser = adForm.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var avatarInitialSrc = avatarPreview.src;

  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var photoChooser = photoContainer.querySelector('.ad-form__upload input[type=file]');
  var photo = photoContainer.querySelector('.ad-form__photo');

  var Photo = {
    WIDTH: photo.offsetWidth + 'px',
    HEIGHT: photo.offsetHeight + 'px'
  };

  var isAttachedFiles;

  var checkType = function (file) {
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var renderPreview = function (file, preview) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var onAvatarChooserChange = function () {
    var avatarFile = avatarChooser.files[0];

    if (checkType(avatarFile)) {
      renderPreview(avatarFile, avatarPreview);
    }
  };

  var onPhotoChooserChange = function () {
    window.files.resetPhoto();

    var fragment = document.createDocumentFragment();

    var files = Array.from(photoChooser.files);

    files.forEach(function (file, index) {
      if (checkType(file)) {
        if (index === 0) {
          var photoImg = document.createElement('img');
          photoImg.style.maxWidth = Photo.WIDTH;
          photoImg.style.maxHeight = Photo.HEIGHT;

          photo.appendChild(photoImg);

          renderPreview(file, photoImg);

          fragment.appendChild(photo);
        } else {
          var newPhoto = photo.cloneNode(true);

          renderPreview(file, newPhoto.querySelector('img'));

          fragment.appendChild(newPhoto);
        }

        isAttachedFiles = true;
      }
    });

    photoContainer.appendChild(fragment);
  };

  avatarChooser.addEventListener('change', onAvatarChooserChange);

  photoChooser.addEventListener('change', onPhotoChooserChange);

  window.files = {
    resetAvatar: function () {
      avatarPreview.src = avatarInitialSrc;
    },
    resetPhoto: function () {
      if (isAttachedFiles) {
        photoContainer.querySelectorAll('.ad-form__photo').forEach(function (element, index) {
          if (index === 0) {
            (element.querySelector('img')).remove();
          } else {
            element.remove();
          }
        });

        isAttachedFiles = false;
      }
    }
  };

})();
