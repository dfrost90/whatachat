import { styled } from 'styled-components';

const ListWrapper = styled.div`
  flex: 1 1 100%;
  overflow: hidden;

  .container {
    overflow-y: auto;
    padding: 0;
    position: relative;
    transition: var(--transition);
    transition-property: background-color, color;
  }
`;

export default ListWrapper;
