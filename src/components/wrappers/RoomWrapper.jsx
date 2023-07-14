import { styled } from 'styled-components';

const RoomWrapper = styled.div`
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

  .prev-container {
    background: linear-gradient(var(--clr-primary-1) 0%, transparent 100%);
    align-items: center;
    display: flex;
    justify-content: center;
    height: 60px;
    padding: 10px;
  }
`;

export default RoomWrapper;
