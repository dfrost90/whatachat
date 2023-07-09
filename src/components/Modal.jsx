import { PropTypes } from 'prop-types';
import { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context/global_context';
import { MdClose } from 'react-icons/md';
import { ModalWrapper } from './wrappers';

const Modal = ({ children, title }) => {
  const { modal, setModal } = useGlobalContext();
  const modalRef = useRef();

  useEffect(() => {
    if (modal) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [modal]);

  return (
    <ModalWrapper ref={modalRef} onCancel={() => setModal(null)}>
      {title && <h3 className="title">{title}</h3>}
      {children}
      <button
        type="button"
        className="close-btn"
        autoFocus
        onClick={() => setModal(null)}
      >
        <MdClose />
      </button>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
