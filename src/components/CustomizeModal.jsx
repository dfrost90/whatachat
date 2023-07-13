import { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context/global_context';
import Modal from './Modal';
import Swatches from './Swatches';
import { textures, themes } from '../utils/themes';

const CustomizeModal = () => {
  const { modal, setModal, texture, setTexture, theme, setTheme } =
    useGlobalContext();

  const modalRef = useRef();
  useEffect(() => {
    if (modal?.type === 'customize') {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modal]);

  const handleColor = (data) => {
    setTheme(data);
  };

  const handleBackground = (data) => {
    setTexture(data);
  };

  const handleClose = () => {
    setModal(null);
  };

  return (
    <Modal title="Appearance" innerRef={modalRef}>
      <div className="customize-content">
        <Swatches
          title="Color:"
          list={themes}
          current={theme}
          handleButton={handleColor}
        />
        <Swatches
          title="Background:"
          list={textures}
          current={texture}
          handleButton={handleBackground}
        />
        <div className="footer">
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomizeModal;
