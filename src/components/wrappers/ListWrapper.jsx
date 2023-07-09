import { styled } from 'styled-components';

const ListWrapper = styled.div`
  flex: 1 1 auto;
  overflow: hidden;

  .container {
    overflow-y: auto;
    padding: 0;
    transition: var(--transition);
    transition-property: background-color, color;
  }

  &.empty-chat .container {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 10px;
  }
`;

export default ListWrapper;
