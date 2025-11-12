document.addEventListener('DOMContentLoaded', () => {
  const charNameOutput = document.querySelector('.char__name__output');
  const characterName = localStorage.getItem('characterName');
  if (characterName) {
    charNameOutput.textContent = characterName;
  }

  const editCharNameBtn = document.querySelector('.edit__char__btn');
  const inputCharNameEdit = document.querySelector('.char__name__edit');
  const charNameSettingsForm = document.querySelector('.char__name__settings');
  const invalidMessage = document.querySelector('.invalid__message');

  function validEditCharName() {
    if (!inputCharNameEdit.checkValidity()) {
      editCharNameBtn.disabled = true;
      inputCharNameEdit.classList.add('invalid');
      invalidMessage.textContent = inputCharNameEdit.title;
    } else {
      editCharNameBtn.disabled = false;
      inputCharNameEdit.classList.remove('invalid');
      invalidMessage.textContent = '';
    }
  }

  inputCharNameEdit.addEventListener('input', validEditCharName);

  editCharNameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (editCharNameBtn.textContent === 'Edit') {
      editCharNameBtn.textContent = 'Save';
      charNameOutput.classList.add('hiden');
      inputCharNameEdit.classList.remove('hiden');
      inputCharNameEdit.value = charNameOutput.textContent;
      validEditCharName();
    } else {
      if (inputCharNameEdit.checkValidity()) {
        localStorage.setItem('characterName', inputCharNameEdit.value);
        charNameOutput.textContent = inputCharNameEdit.value;
        charNameOutput.classList.remove('hiden');
        inputCharNameEdit.classList.add('hiden');
        editCharNameBtn.textContent = 'Edit';
        editCharNameBtn.disabled = false;
      }
    }
  });
});
