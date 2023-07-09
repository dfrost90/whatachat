import { styled } from 'styled-components';
import Logo from './Logo';
import { useAuthContext } from '../context/auth_context';

const Welcome = () => {
  const { userSignIn } = useAuthContext();

  return (
    <Wrapper>
      <Logo />
      <h1>
        what a <span>Chat</span>
      </h1>
      <button type="button" onClick={() => userSignIn()}>
        Sign in with Google
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;

  img {
    width: 100px;
  }

  h1 {
    color: var(--clr-palette-w);
    letter-spacing: 1px;
    margin: 16px 0;
    text-shadow: 1px 3px 0 var(--clr-palette-b);
    -webkit-text-stroke: 1px var(--clr-palette-b);
  }

  span {
    color: var(--clr-palette-3);
  }

  button {
    margin-top: auto;
  }
`;

export default Welcome;
