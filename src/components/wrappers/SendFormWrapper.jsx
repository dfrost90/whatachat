import { styled } from 'styled-components';

const SendFormWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  height: 60px;

  .container {
    border-top: 1px solid var(--clr-divider);
    padding: 10px;
    position: relative;
  }

  form {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;

    input {
      flex: 1 0 auto;
      padding-right: 90px;

      &.no-touch {
        padding-left: 50px;
      }
    }

    .btn-emoji,
    .btn-send {
      bottom: 0;
      position: absolute;
      text-align: center;
      top: 0;
    }

    .btn-emoji {
      align-items: center;
      border-radius: 4px 0 0 4px;
      display: flex;
      justify-content: center;
      font-size: 20px;
      left: 0;
      padding: 0;
      width: 50px;
    }

    .btn-send {
      border-radius: 0 4px 4px 0;
      right: 0;

      span {
        opacity: 0;
        transition: var(--transition);
      }

      &:hover span {
        opacity: 1;
      }

      svg {
        margin-left: 4px;
      }
    }
  }

  .emoji-picker {
    bottom: 100%;
    left: 10px;
    position: absolute;
  }
`;

export default SendFormWrapper;
