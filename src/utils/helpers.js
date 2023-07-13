export const getStorageTheme = () => {
  let theme = 'theme-default';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

export const getStorageRoom = () => {
  let room = null;
  if (sessionStorage.getItem('room')) {
    room = JSON.parse(sessionStorage.getItem('room'));
  }

  return room;
};

export const getStorageTexture = () => {
  let texture = '';
  if (localStorage.getItem('texture')) {
    texture = localStorage.getItem('texture');
  }
  return texture;
};

export const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

export const insertAtCursor = (myField, myValue) => {
  if (document.selection) {
    myField.focus();
    let sel = document.selection.createRange();
    sel.text = myValue;
  } else if (myField.selectionStart || myField.selectionStart == '0') {
    let startPos = myField.selectionStart;
    let endPos = myField.selectionEnd;
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);
  } else {
    myField.value += myValue;
  }
};

export const getUrl =
  /(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))/g;
