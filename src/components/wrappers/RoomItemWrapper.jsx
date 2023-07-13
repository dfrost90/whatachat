import { styled } from 'styled-components';

const RoomItemWrapper = styled.li`
  border-bottom: 1px solid var(--clr-divider);
  width: 100%;

  button {
    align-items: center;
    appearance: none;
    background: none;
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
  }

  .icon {
    flex: 0 0 40px;
    font-size: 24px;
    text-align: center;
  }

  .room-title {
    flex: 1 1 auto;
    padding: 0 10px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .last-message {
    color: var(--clr-last-message-text);
    font-size: 12px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info {
    flex: 0 0 100px;
    font-size: 12px;
    width: 60px;
    text-align: right;
  }

  .new {
    background-color: var(--clr-accent-1);
    border-radius: 4px;
    color: var(--clr-palette-w);
    font-weight: bold;
    padding: 2px 4px;
    text-transform: uppercase;
  }
`;

export default RoomItemWrapper;
