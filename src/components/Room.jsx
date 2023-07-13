import { useEffect, useRef, useState } from 'react';
import { query, orderBy, collection, limit } from 'firebase/firestore';
import { db } from '../firebase';

import { useGlobalContext } from '../context/global_context';
import { MessagesWrapper } from './wrappers';
import { SendForm, Message, Loading } from '.';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthContext } from '../context/auth_context';

const Room = () => {
  const { user } = useAuthContext();
  const { room } = useGlobalContext();
  const [allowScroll, setAllowScroll] = useState(true);
  const [edit, setEdit] = useState(null);
  const [lastMsg, setLastMsg] = useState(null);

  const [messages, loading, error] = useCollection(
    query(
      collection(db, 'rooms', room?.id, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(25)
    )
  );

  const messagesRef = useRef(null);
  const messagesClass = !messages?.empty ? '' : 'empty-chat';

  const handleScroll = async (e) => {
    // const scrollTopVal = e.target.scrollTop;
    // if (scrollTopVal < 100) {
    // const snapshot = await getCountFromServer(coll);
    // setCount(snapshot.data().count);
    // }
  };

  const scrollChat = () => {
    const lastChild = messagesRef.current?.lastElementChild;
    lastChild?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (allowScroll) {
      scrollChat();
    }

    const last = messages?.docs.reverse()[messages.docs.length - 1];
    if (user?.uid === last?.data().uid) {
      setLastMsg({ ...last.data(), id: last.id });
    }
  }, [messages]);

  return (
    <>
      <MessagesWrapper>
        <div className={`container ${messagesClass}`}>
          <div className="background-texture"></div>
          {loading ? (
            <Loading />
          ) : messages?.docs.length > 0 ? (
            <div className="messages" ref={messagesRef} onScroll={handleScroll}>
              {messages.docs.reverse().map((doc, index, messages) => {
                const last = index + 1 === messages.length;

                return (
                  <Message
                    key={doc.id}
                    message={{
                      ...doc.data(),
                      id: doc.id,
                      last,
                      setAllowScroll,
                      edit,
                      setEdit,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <span>no messages yet :(</span>
          )}
        </div>
      </MessagesWrapper>
      <SendForm
        setAllowScroll={setAllowScroll}
        edit={edit}
        setEdit={setEdit}
        lastMsg={lastMsg}
      />
    </>
  );
};

export default Room;
