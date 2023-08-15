import { useEffect, useRef, useState } from 'react';
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase';

import { useGlobalContext } from '../context/global_context';
import { RoomWrapper } from './wrappers';
import { SendForm, Message, Loading } from '.';

import { useAuthContext } from '../context/auth_context';
import { BarLoader } from 'react-spinners';

const Room = () => {
  const { user } = useAuthContext();
  const { room } = useGlobalContext();
  const [allowScroll, setAllowScroll] = useState(true);
  const [edit, setEdit] = useState(null);
  const [lastMsg, setLastMsg] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loadLimit, setLoadLimit] = useState(25);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'rooms', room?.id, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(loadLimit)
    );

    const unsubscribe = onSnapshot(q, (documents) => {
      const tempMessages = [];
      documents.forEach((document) => {
        tempMessages.push({
          id: document.id,
          ...document.data(),
        });
      });
      setLoading(false);
      setMessages(tempMessages.toReversed());

      // if (loadLimit === tempMessages.length) {
      setLoadLimit(loadLimit + 10);
      // }

      if (user?.uid === documents?.docs[0]?.data().uid) {
        setLastMsg({ ...documents.docs[0].data(), id: documents.docs[0].id });
      } else {
        setLastMsg(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const messagesRef = useRef(null);
  const loadingRef = useRef(null);

  const handlePrev = () => {
    setAllowScroll(false);

    if (loadLimit - messages?.length <= 10) {
      setLoadLimit(loadLimit + 10);
    }

    const q = query(
      collection(db, 'rooms', room?.id, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(loadLimit)
    );

    const unsubscribe = onSnapshot(q, (documents) => {
      const tempMessages = [];
      documents.forEach((document) => {
        tempMessages.push({
          id: document.id,
          ...document.data(),
        });
      });

      updateState(documents);
    });
    return () => unsubscribe();
  };

  const scrollChat = () => {
    const lastChild = messagesRef.current?.lastElementChild;
    lastChild?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (allowScroll) {
      scrollChat();
    }
  }, [messages]);

  const updateState = (documents) => {
    if (!documents.empty) {
      const tempMessages = [];
      documents.forEach((document) => {
        tempMessages.push({
          id: document.id,
          ...document.data(),
        });
      });

      setMessages(tempMessages.toReversed());
    }
  };

  return (
    <>
      <RoomWrapper>
        <div
          className={`${
            messages.length === 0 ? 'container empty-chat' : 'container'
          }`}
        >
          <div className="background-texture"></div>
          {loading ? (
            <Loading />
          ) : messages?.length > 0 ? (
            <div className="messages" ref={messagesRef}>
              {loadLimit - messages.length <= 10 && (
                <div className="prev-container" ref={loadingRef}>
                  <button
                    type="button"
                    className="btn-type-1 edit-btn"
                    onClick={handlePrev}
                  >
                    Load more
                  </button>
                </div>
              )}
              {messages.map((doc, index, messages) => {
                const last = index + 1 === messages.length;

                return (
                  <Message
                    key={doc.id}
                    message={{
                      ...doc,
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
      </RoomWrapper>
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
