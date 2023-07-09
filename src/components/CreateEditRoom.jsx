import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/global_context';
import FormRow from './FormRow';
import Modal from './Modal';
import { addDoc, collection, db, serverTimestamp } from '../firebase';
import { useAuthContext } from '../context/auth_context';
import { FormRowWrapper } from './wrappers';

const CreateEditRoom = () => {
  const { modal, setModal, room } = useGlobalContext();
  const { user } = useAuthContext();
  const [contact, setContact] = useState('');

  let roomFields = {
    title: room?.title || '',
    privateRoom: room?.privateRoom || false,
    participants: room?.participants || [],
  };

  const [roomLocal, setRoomLocal] = useState({
    ...roomFields,
  });

  const contactRef = useRef(null);

  const addContact = () => {
    if (contactRef.current?.checkValidity()) {
      setRoomLocal({
        ...roomLocal,
        participants: [...roomLocal.participants, contact],
      });
      setContact('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'rooms'), {
      ...roomLocal,
      participants: !roomLocal.privateRoom
        ? ['all']
        : [...roomLocal.participants],
      createdAt: serverTimestamp(),
      createdBy: user.uid,
    });

    setRoomLocal({
      ...roomFields,
    });
    setModal(null);
  };

  const handleCancel = () => {
    setRoomLocal({
      ...roomFields,
    });
    setModal(null);
  };

  return (
    <Modal
      title={`${modal?.type === 'create' ? 'Create new room' : 'Edit room'}`}
    >
      <form className="create-form" onSubmit={handleSubmit}>
        <FormRow
          label="Title"
          type="text"
          id="roomId"
          placeholder="enter room name"
          value={roomLocal.title}
          maxLength="40"
          required={true}
          handleChange={(e) =>
            setRoomLocal({ ...roomLocal, title: e.target.value })
          }
        />
        <FormRow
          label="Private"
          type="checkbox"
          id="private"
          checked={roomLocal.privateRoom}
          handleChange={(e) =>
            setRoomLocal({
              ...roomLocal,
              privateRoom: e.target.checked,
              participants: [user.email],
            })
          }
        />
        {roomLocal.privateRoom && (
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
                required={!roomLocal.participants.length}
              />
              <button type="button" className="btn-type-2" onClick={addContact}>
                add
              </button>
            </div>
            {roomLocal.participants.length > 0 && (
              <div className="contact-list">
                Room: {''}
                {roomLocal.participants.map((user, index) => (
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

CreateEditRoom.propTypes = {
  title: PropTypes.string,
  privateRoom: PropTypes.bool,
  participants: PropTypes.array,
};

export default CreateEditRoom;
