import { PropTypes } from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

const getStorageTheme = () => {
  let themes = JSON.parse(localStorage.getItem('themes'));
  return themes?.findIndex((theme) => theme.selected === true) || 0;
};

const getStorageRoom = () => {
  let room = null;
  if (sessionStorage.getItem('room')) {
    room = JSON.parse(sessionStorage.getItem('room'));
  }

  return room;
};

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStorageTheme());
  const [modal, setModal] = useState(null);
  const [room, setRoom] = useState(getStorageRoom());

  const themes = [
    { name: 'theme-default', selected: true },
    { name: 'theme-1', selected: false },
    { name: 'theme-2', selected: false },
    { name: 'theme-3', selected: false },
    { name: 'theme-4', selected: false },
    { name: 'theme-5', selected: false },
    { name: 'theme-6', selected: false },
    { name: 'theme-7', selected: false },
    { name: 'theme-8', selected: false },
    { name: 'theme-9', selected: false },
    { name: 'theme-10', selected: false },
    { name: 'theme-11', selected: false },
    { name: 'theme-12', selected: false },
  ];

  const toggleTheme = () => {
    setTheme((theme) => (theme === themes.length - 1 ? 0 : theme + 1));
  };

  useEffect(() => {
    themes.forEach((t, index) => (t.selected = index === theme));

    document.documentElement.className = themes[theme]?.name;
    localStorage.setItem('themes', JSON.stringify(themes));
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{ toggleTheme, modal, setModal, room, setRoom }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};
