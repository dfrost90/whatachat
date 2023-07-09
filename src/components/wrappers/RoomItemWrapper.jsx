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

  .title {
    flex: 1 1 auto;
    font-size: 16px;
    padding: 0 10px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .date {
    flex: 0 0 60px;
    font-size: 12px;
    width: 60px;
    text-align: right;
  }
`;

export default RoomItemWrapper;
