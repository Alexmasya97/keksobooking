const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarContainer = document.querySelector('.ad-form-header__preview');
const imagesChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  avatarPreview.innerHTML = '';
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
    avatarPreview.style.width = '70px';
    avatarPreview.style.height = '70px';
    avatarContainer.style.padding = '0';
    avatarPreview.style.backgroundSize = 'cover';
    avatarPreview.style.borderRadius = '5px';
    avatarPreview.style.outline = 'none';
  }
}
);

imagesChooser.addEventListener('change', () => {
  imagePreview.innerHTML = '';
  const file = imagesChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.style.width = '70px';
    img.style.height = '70px';
    img.style.borderRadius = '5px';
    imagePreview.appendChild(img);
  }
}
);
