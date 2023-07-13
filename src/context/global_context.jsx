import { PropTypes } from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

import {
  getStorageRoom,
  getStorageTheme,
  getStorageTexture,
} from '../utils/helpers';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStorageTheme());
  const [texture, setTexture] = useState(getStorageTexture());
  const [modal, setModal] = useState(null);
  const [room, setRoom] = useState(getStorageRoom());

  useEffect(() => {
    document.documentElement.className = `${theme} ${texture}`;
    localStorage.setItem('theme', theme);
    localStorage.setItem('texture', texture);
  }, [theme, texture]);

  return (
    <GlobalContext.Provider
      value={{
        modal,
        setModal,
        room,
        setRoom,
        texture,
        setTexture,
        theme,
        setTheme,
      }}
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
