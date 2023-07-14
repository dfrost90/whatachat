import { styled } from 'styled-components';

const MessageWrapper = styled.div`
  align-items: end;
  color: var(--clr-text);
  display: flex;
  justify-content: start;
  margin: 10px 0;
  padding: 0 10px;

  &:hover {
    .btn-remove,
    .btn-edit {
      opacity: 1;
      visibility: visible;
    }
  }

  &.sent {
    justify-content: end;
  }

  .message {
    --borderWidth: 3px;
    border-radius: 16px 16px 16px 0;
    color: var(--clr-message-text-received);
    position: relative;
    min-width: 100px;
    max-width: calc(100% - 100px);
    word-break: break-word;
    z-index: 0;

    &.edit-mode::after {
      content: '';
      position: absolute;
      top: calc(-1 * var(--borderWidth));
      left: calc(-1 * var(--borderWidth));
      height: calc(100% + var(--borderWidth) * 2);
      width: calc(100% + var(--borderWidth) * 2);
      background: linear-gradient(
        60deg,
        #f79533,
        #f37055,
        #ef4e7b,
        #a166ab,
        #5073b8,
        #1098ad,
        #07b39b,
        #6fba82
      );
      border-radius: 12px 12px 12px 0;
      z-index: -1;
      animation: animatedgradient 3s ease alternate infinite;
      background-size: 300% 300%;
    }

    p {
      white-space: pre-line;
    }
  }

  .message-container {
    background-color: var(--clr-message-received);
    border-radius: 10px 10px 10px 0;
    padding: 8px 12px;
  }

  &.sent .message.edit-mode::after {
    border-radius: 12px 12px 0 12px;
  }

  &.sent .message-container {
    background-color: var(--clr-message-sent);
    color: var(--clr-message-text-sent);
    border-radius: 10px 10px 0 10px;
  }

  img {
    border-radius: 4px;
    margin-right: 4px;
    max-width: 30px;
  }

  .image-wrapper {
    margin-top: 5px;
  }

  .message-image {
    border-radius: 4px;
    background: var(--img-placeholder) no-repeat scroll center center;
    background-size: cover;
    max-width: 100%;
    width: 376px;
    min-width: 40px;
  }

  .controls {
    padding: 0 5px;
    font-size: 12px;
  }

  &.sent .controls {
    text-align: right;
  }

  .time {
    color: var(--clr-text-2);
    display: inline-block;
    line-height: 1;
    font-weight: bold;
    white-space: pre;
    margin-right: 8px;
  }

  &.sent .time {
    margin-left: 8px;
    margin-right: 0;
  }

  .btn-remove {
    padding: 0;
    opacity: 0;
    visibility: hidden;
  }

  .btn-edit {
    font-size: 12px;
    position: absolute;
    right: 2px;
    bottom: 2px;
    opacity: 0;
    padding: 5px;
    text-align: center;
    visibility: hidden;
    white-space: nowrap;

    span {
      display: inline-block;
      overflow: hidden;
      width: 0;
      transition: var(--transition);
    }

    &:hover {
      span {
        width: 50px;
      }
    }
  }

  .edit-mode .btn-edit {
    opacity: 1;
    visibility: visible;

    span {
      width: 50px;
    }
  }

  .edited-label {
    font-size: 12px;
  }
`;

export default MessageWrapper;
