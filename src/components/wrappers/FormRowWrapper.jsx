import { styled } from 'styled-components';

const FormRowWrapper = styled.div`
  line-height: 24px;
  padding: 16px 0;
  position: relative;

  &:not(:first-child) {
    border-top: 1px solid var(--clr-modal-divider);
  }

  input:not(input[type='checkbox']) {
    margin-top: 5px;
  }
  input[type='checkbox'] {
    margin-left: 10px;
  }

  .add-contact {
    margin-top: 5px;
    position: relative;

    input:not(input[type='checkbox']) {
      margin-top: 0;
    }

    input {
      padding-right: 60px;
    }

    button {
      border-radius: 0 4px 4px 0;
      height: 100%;
      max-width: 60px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .contact-list {
    font-size: 14px;
    font-style: italic;
    margin-top: 5px;
    line-height: 1.2;
  }
`;

export default FormRowWrapper;
