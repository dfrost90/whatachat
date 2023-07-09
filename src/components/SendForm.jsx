import { useState } from 'react';
import { useAuthContext } from '../context/auth_context';
import { addDoc, serverTimestamp, collection, db } from '../firebase';
import { RiSendPlaneFill } from 'react-icons/ri';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useGlobalContext } from '../context/global_context';
import EmojiPicker from 'emoji-picker-react';
import { isTouchDevice } from '../utils/helpers';
import { useOutsideClick } from '../hooks/hooks';
import { SendFormWrapper } from './wrappers';

const SendForm = () => {
  const { user } = useAuthContext();
  const { room } = useGlobalContext();

  const [showEmoji, setShowEmoji] = useState(false);
  const [formValue, setFormValue] = useState('');

  const handleEmoji = (emoji) => {
    setFormValue(formValue + emoji.emoji);
  };

  const hideEmoji = () => {
    setShowEmoji(false);
  };

  const emojiPickerRef = useOutsideClick(hideEmoji);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (/^\s/.test(formValue) || !formValue) {
      return;
    }

    const { uid, photoURL } = user;

    await addDoc(collection(db, 'rooms', `${room.id}/messages`), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
  };

  return (
    <SendFormWrapper>
      <div className="container">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            className={`${!isTouchDevice() && 'no-touch'}`}
            value={formValue}
            placeholder="Send message"
            required={true}
            onChange={(e) => setFormValue(e.target.value)}
          />
          {!isTouchDevice() && (
            <button
              type="button"
              className="btn-emoji btn-type-3"
              onClick={(e) => {
                e.stopPropagation();
                setShowEmoji(!showEmoji);
              }}
            >
              <MdOutlineEmojiEmotions />
            </button>
          )}
          {formValue && formValue.length > 0 && !/^\s/.test(formValue) && (
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

export default SendForm;
