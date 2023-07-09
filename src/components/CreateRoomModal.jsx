import React, { useRef, useState } from 'react';
import Modal from './Modal';
import FormRow from './FormRow';
import { useAuthContext } from '../context/auth_context';
import { useGlobalContext } from '../context/global_context';
import { FormRowWrapper } from './wrappers';

const CreateRoomModal = () => {
  const { user } = useAuthContext();
  const { setModal } = useGlobalContext();
  const [contact, setContact] = useState('');

  const [room, setRoom] = useState({
    title: '',
    privateRoom: false,
    participants: [],
  });

  const contactRef = useRef(null);
  const addContact = () => {
    if (contactRef.current?.checkValidity()) {
      setRoom({
        ...room,
        participants: [...room.participants, contact],
      });
      setContact('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    setModal(null);
  };

  return (
    <Modal title="Create new room">
      <form className="create-form" onSubmit={handleSubmit}>
        <FormRow
          label="Title"
          type="text"
          id="roomId"
          placeholder="enter room name"
          value={room.title}
          maxLength="40"
          required={true}
          handleChange={(e) => setRoom({ ...room, title: e.target.value })}
        />
        <FormRow
          label="Private"
          type="checkbox"
          id="private"
          checked={room.privateRoom}
          handleChange={(e) =>
            setRoom({
              ...room,
              privateRoom: e.target.checked,
              participants: [user.email],
            })
          }
        />

        {room.privateRoom && (
          <FormRowWrapper className="form-row">
            <label htmlFor="usermail">Add contact:</label>
            <div className="add-contact">
              <input
                type="email"
                id="usermail"
                className="form-input"
                name="usermail"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="enter user gmail"
                maxLength={320}
                ref={contactRef}
                required={!room.participants.length}
              />
              <button type="button" className="btn-type-2" onClick={addContact}>
                add
              </button>
            </div>
            {room.participants.length > 0 && (
              <div className="contact-list">
                Room: {''}
                {room.participants.map((user, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ', '}
                    <span className="contact-item">{user}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </FormRowWrapper>
        )}

        <div className="footer">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Ok</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRoomModal;
