import { styled } from 'styled-components';

const ModalWrapper = styled.dialog`
  background-color: var(--clr-modal-background);
  border: 0;
  color: var(--clr-modal-text);
  position: absolute;
  left: 50%;
  top: 50%;
  min-height: 120px;
  width: 80%;
  max-width: 400px;
  padding: 20px;
  text-align: left;
  transition: var(--transition);
  transform: translate(-50%, -50%);
  z-index: 999;

  &::backdrop {
    background: #00000088;
  }

  .title {
    border-bottom: 1px solid var(--clr-modal-header-border);
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .close-btn {
    appearance: none;
    background: transparent;
    border-radius: 0;
    color: var(--clr-modal-text);
    font-size: 32px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    text-align: center;
    height: 60px;
    width: 60px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-row {
    border-color: var(--clr-modal-divider);
  }

  .delete-row {
    padding: 10px 0;
  }

  .delete-btn {
    padding: 0;
  }

  .contact-item {
    display: inline-block;
  }

  .remove-contact-btn {
    display: inline-block;
    padding: 4px;
  }

  .footer {
    display: flex;
    gap: 20px;
    justify-content: end;
  }
`;

export default ModalWrapper;
