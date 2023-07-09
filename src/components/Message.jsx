import { PropTypes } from 'prop-types';
import { useAuthContext } from '../context/auth_context';
import { styled } from 'styled-components';

const Message = (props) => {
  const { user } = useAuthContext();
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === user?.uid ? 'sent' : 'received';

  return (
    <Wrapper className={`${messageClass}`}>
      {uid !== user?.uid && <img src={photoURL} />}
      <div className="message">
        <p>{text}</p>
      </div>
    </Wrapper>
  );
};

Message.propTypes = {
  message: PropTypes.object,
};

const Wrapper = styled.div`
  align-items: end;
  color: var(--clr-text);
  display: flex;
  justify-content: start;
  margin: 10px 0;
  padding: 0 10px;

  &.sent {
    justify-content: end;
  }

  .message {
    align-items: start;
    background-color: var(--clr-message-received);
    border-radius: 16px 16px 16px 0;
    color: var(--clr-message-text-received);
    display: flex;
    padding: 8px 12px;
    max-width: 80%;
    word-break: break-word;
  }

  &.sent .message {
    background-color: var(--clr-message-sent);
    border-radius: 10px 10px 0 10px;
    color: var(--clr-message-text-sent);
  }

  img {
    border-radius: 4px;
    margin-right: 4px;
    max-width: 30px;
  }
`;

export default Message;
