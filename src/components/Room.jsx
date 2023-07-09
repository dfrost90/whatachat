import { db, collection, query, orderBy } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useRef } from 'react';

import { useGlobalContext } from '../context/global_context';
import { ListWrapper } from './wrappers';
import { SendForm, Message, Loading } from '.';

const Room = () => {
  const { room } = useGlobalContext();

  const [messages, loading, error] = useCollection(
    query(collection(db, 'rooms', room?.id, 'messages'), orderBy('createdAt'))
  );

  const messagesRef = useRef(null);

  const messagesClass = !messages?.empty ? '' : 'empty-chat';

  const scrollChat = () => {
    const lastChild = messagesRef.current?.lastElementChild;
    lastChild?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollChat();
  }, [messages]);

  return (
    <>
      <ListWrapper className={`${messagesClass}`}>
        <div className="container" ref={messagesRef}>
          {loading ? (
            <Loading />
          ) : messages && messages.docs.length > 0 ? (
            messages.docs.map((doc) => (
              <Message key={doc.id} message={doc.data()} />
            ))
          ) : (
            <span>no messages yet :(</span>
          )}
        </div>
      </ListWrapper>
      <SendForm />
    </>
  );
};

export default Room;
