import { styled } from 'styled-components';

const HeaderWrapper = styled.div`
  height: 60px;

  .container {
    align-items: center;
    border-bottom: 1px solid var(--clr-divider);
    display: flex;
    gap: 10px;
  }

  .account {
    align-items: center;
    flex: 0 1 33%;
    display: flex;
    gap: 10px;
    justify-content: start;
    max-width: 50%;
  }

  .account-image {
    border-radius: 4px;
    max-width: 40px;
    vertical-align: middle;
  }

  .account-name {
    padding: 0 10px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room-title {
    flex: 1 1 100%;
    overflow: hidden;
    text-align: center;

    h3 {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .room-info {
    font-size: 12px;
  }

  .actions {
    display: flex;
    flex: 0 1 33%;
    gap: 5px;
    justify-content: end;
    margin-left: auto;
  }

  .account button,
  .actions button {
    font-size: 20px;
    height: 40px;
    min-width: 40px;
    overflow: hidden;
    padding: 5px 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default HeaderWrapper;
