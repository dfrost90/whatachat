import { PropTypes } from 'prop-types';
import moment from 'moment/moment';
import { getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { useAuthContext } from '../context/auth_context';
import { MessageWrapper } from './wrappers';
import { getUrl } from '../utils/helpers';
import { BsTrash3 } from 'react-icons/bs';
import { useGlobalContext } from '../context/global_context';
import ReactLinkify from 'react-linkify';
import { Img } from 'react-image';
import { BiEditAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const Message = (props) => {
  const {
    id,
    last,
    text,
    uid,
    photoURL,
    createdAt,
    edited,
    setAllowScroll,
    edit,
    setEdit,
  } = props.message;

  const { user } = useAuthContext();
  const { room } = useGlobalContext();
  const [roomSnap, setRoomSnap] = useState(null);

  const messageClass = uid === user?.uid ? 'sent' : 'received';
  const editClass = edit?.id === id && edit?.active ? 'edit-mode' : '';

  const links = text.match(getUrl) || [];

  // const [roomSnap] = useDocumentOnce(doc(db, 'rooms', room?.id));

  useEffect(() => {
    const getRoom = async () => {
      const tempRoom = await getDoc(doc(db, 'rooms', room?.id));
      setRoomSnap(tempRoom);
    };
    getRoom();
  }, []);

  const updateVisits = async () => {
    await updateDoc(doc(db, 'rooms', room.id), {
      lastMessage: text,
      lastUpdate: createdAt,
      lastSeen: [...roomSnap.data().lastSeen, user.uid],
    });
  };

  const updateLast = async () => {
    await updateDoc(doc(db, 'rooms', room.id), {
      lastMessage: text,
      lastUpdate: createdAt,
    });
  };

  if (last && roomSnap?.exists()) {
    updateLast();

    if (!roomSnap.data().lastSeen?.includes(user.uid)) {
      updateVisits();
    }
  }

  const handleRemove = async () => {
    setAllowScroll(false);
    await deleteDoc(doc(db, 'rooms', room.id, 'messages', id));
  };

  const handleEdit = () => {
    setAllowScroll(false);

    if (edit) {
      setEdit(null);
    } else {
      setEdit({ id, text, uid, photoURL, createdAt, active: true });
    }
  };

  return (
    <MessageWrapper className={`${messageClass}`}>
      {uid !== user?.uid ? (
        <img src={photoURL} />
      ) : (
        <div className="controls">
          {edited && (
            <>
              <span className="edited-label">
                <BiEditAlt />
                edited
              </span>
              <br />
            </>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="btn-type-3 btn-remove"
          >
            <BsTrash3 />
          </button>
          <span className="time">
            {moment(createdAt?.toDate()).format('HH:mm')}
          </span>
        </div>
      )}
      <div className={`message ${editClass}`}>
        <div className="message-container">
          <p>
            <ReactLinkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a
                  key={key}
                  target="blank"
                  rel="noopener noreferrer"
                  href={decoratedHref}
                >
                  {decoratedText}
                </a>
              )}
            >
              {text}
            </ReactLinkify>
          </p>

          {links.length > 0 &&
            links.map((url, index) => {
              return (
                <Img
                  key={index}
                  className="message-image"
                  src={url}
                  container={(children) => {
                    return <div className="image-wrapper">{children}</div>;
                  }}
                />
              );
            })}
        </div>
        {user.uid === uid && (
          <button
            type="button"
            className="btn-edit btn-type-4"
            onClick={handleEdit}
          >
            <BiEditAlt />
            <span>{edit?.id === id && edit.active ? 'Cancel' : 'Edit'}</span>
          </button>
        )}
      </div>
      {uid !== user?.uid && (
        <div className="controls">
          {edited && (
            <>
              <span className="edited-label">
                <BiEditAlt />
                edited
              </span>
              <br />
            </>
          )}
          <span className="time">
            {moment(createdAt?.toDate()).format('HH:mm')}
          </span>
        </div>
      )}
    </MessageWrapper>
  );
};

Message.propTypes = {
  message: PropTypes.object,
};

export default Message;
