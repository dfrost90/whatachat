import { PropTypes } from 'prop-types';
import { useGlobalContext } from '../context/global_context';
import { MdClose } from 'react-icons/md';
import { ModalWrapper } from './wrappers';

const Modal = ({ children, title, innerRef }) => {
  const { setModal } = useGlobalContext();

  return (
    <ModalWrapper onCancel={() => setModal(null)} ref={innerRef}>
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
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Modal;
