'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarInitialSrc = avatarPreview.src;

  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo');

  var isAttachedFile;

  var checkType = function (file) {
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  avatarChooser.addEventListener('change', function () {
    var avatarFile = avatarChooser.files[0];

    if (checkType(avatarFile)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatarFile);
    }
  });

  photoChooser.addEventListener('change', function () {
    var photoFile = photoChooser.files[0];

    if (checkType(photoFile)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (isAttachedFile) {
          window.files.resetPhoto();
        }

        var photoImg = document.createElement('img');
        photoImg.style.maxWidth = photoContainer.offsetWidth + 'px';
        photoImg.style.maxHeight = photoContainer.offsetHeight + 'px';
        photoImg.src = reader.result;

        photoContainer.appendChild(photoImg);
      });

      reader.readAsDataURL(photoFile);

      isAttachedFile = true;
    }
  });

  window.files = {
    resetAvatar: function () {
      avatarPreview.src = avatarInitialSrc;
    },
    resetPhoto: function () {
      photoContainer.innerHTML = '';
    }
  };

})();
