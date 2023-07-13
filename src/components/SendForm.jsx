import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../context/auth_context';
import {
  addDoc,
  serverTimestamp,
  collection,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import TextareaAutosize from 'react-textarea-autosize';
import { RiSendPlaneFill } from 'react-icons/ri';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useGlobalContext } from '../context/global_context';
import EmojiPicker from 'emoji-picker-react';
import { insertAtCursor, isTouchDevice } from '../utils/helpers';
import { useOutsideClick } from '../hooks/hooks';
import { SendFormWrapper } from './wrappers';

const SendForm = ({ setAllowScroll, edit, setEdit, lastMsg }) => {
  const { user } = useAuthContext();
  const { room } = useGlobalContext();

  const [showEmoji, setShowEmoji] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const formRef = useRef();
  const inputRef = useRef();

  const handleEmoji = (emoji) => {
    insertAtCursor(inputRef.current, emoji.emoji);
    setFormValue(inputRef.current?.value);
    hideEmoji();
  };

  const hideEmoji = () => {
    setShowEmoji(false);
  };

  const emojiPickerRef = useOutsideClick(hideEmoji);

  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
    if (e.keyCode === 38) {
      // setFormValue(lastMsg?.text);
      setEdit({ ...lastMsg, active: true });
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (/^\s/.test(formValue) || !formValue) {
      return;
    }

    const { uid, photoURL } = user;
    const timestamp = serverTimestamp();

    if (edit) {
      await updateDoc(doc(db, 'rooms', room.id, 'messages', edit.id), {
        text: formValue,
        createdAt: edit.createdAt,
        uid: edit.uid,
        photoURL: edit.photoURL,
        edited: true,
      });
    } else {
      await addDoc(collection(db, 'rooms', `${room.id}/messages`), {
        text: formValue,
        createdAt: timestamp,
        uid,
        photoURL,
      });
    }

    setFormValue('');
    setEdit(null);
    setAllowScroll(true);
  };

  useEffect(() => {
    const escListener = (e) => {
      if (e.key === 'Escape') {
        setEdit(null);
        setFormValue('');
      }
    };

    if (edit?.active) {
      document.addEventListener('keydown', escListener);
      setFormValue(edit.text);
    } else {
      document.removeEventListener('keydown', escListener);
      setFormValue('');
    }
  }, [edit]);

  return (
    <SendFormWrapper style={{ flexBasis: `${inputHeight + 20}px` }}>
      <div className="container">
        <form onSubmit={sendMessage} ref={formRef}>
          <TextareaAutosize
            className={`${!isTouchDevice() ? 'no-touch' : ''}`}
            value={formValue}
            placeholder="Send message"
            required={true}
            ref={inputRef}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
            onHeightChange={(h) => {
              if (h > 120) {
                return;
              }
              setInputHeight(h);
            }}
            onKeyDown={handleEnterPress}
          />
          <button
            type="button"
            className={`${
              !isTouchDevice()
                ? 'btn-emoji btn-type-3 no-touch'
                : 'btn-emoji btn-type-3'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowEmoji(!showEmoji);
            }}
          >
            <MdOutlineEmojiEmotions />
          </button>
          {formValue && !/^\s/.test(formValue) && (
            <button type="submit" className="btn-send btn-type-2">
              <span>Send</span>
              <RiSendPlaneFill />
            </button>
          )}
        </form>
        {showEmoji && (
          <div className="emoji-picker" ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={handleEmoji}
              searchDisabled={true}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
      </div>
    </SendFormWrapper>
  );
};

SendForm.propTypes = {
  setAllowScroll: PropTypes.func,
  edit: PropTypes.object,
  setEdit: PropTypes.func,
};

export default SendForm;
