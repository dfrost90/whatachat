import { BarLoader } from 'react-spinners';
import { styled } from 'styled-components';

const Loading = () => {
  return (
    <Wrapper>
      <BarLoader color="var(--clr-loading)" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export default Loading;
