import { styled } from 'styled-components';

const MessagesWrapper = styled.div`
  flex: 1 1 100%;
  overflow: hidden;

  .container {
    padding: 0;
    position: relative;
    overflow: hidden;
    transition: none;

    &.empty-chat {
      align-items: center;
      display: flex;
      justify-content: center;
      text-align: center;
      padding: 10px;
    }
  }

  .messages {
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
`;

export default MessagesWrapper;
