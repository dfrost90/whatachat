import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from '../firebase';

import Modal from './Modal';
import FormRow from './FormRow';
import { useAuthContext } from '../context/auth_context';
import { useGlobalContext } from '../context/global_context';
import { FormRowWrapper } from './wrappers';
import { MdRemoveCircleOutline } from 'react-icons/md';

const CreateRoomModal = () => {
  const { user } = useAuthContext();
  const { modal, setModal } = useGlobalContext();
  const [contact, setContact] = useState('');

  const [room, setRoom] = useState({
    title: '',
    privateRoom: false,
    participants: [],
  });

  const contactRef = useRef(null);
  const addContact = () => {
    if (room.participants.includes(contact)) {
      return;
    }
    if (contact && contactRef.current?.checkValidity()) {
      setRoom({
        ...room,
        participants: [...room.participants, contact],
      });
      setContact('');
    }
  };

  const removeContact = (c) => {
    setRoom({
      ...room,
      participants: room.participants.filter((user) => user !== c),
    });
  };

  const modalRef = useRef();
  useEffect(() => {
    if (modal?.type === 'create') {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'rooms'), {
      ...room,
      participants: !room.privateRoom ? ['all'] : [...room.participants],
      createdAt: serverTimestamp(),
      createdBy: user.uid,
    });

    setRoom({
      title: '',
      privateRoom: false,
      participants: [],
    });
    setModal(null);
  };

  const handleCancel = () => {
    setModal(null);
  };

  return (
    <Modal title="Create new room" innerRef={modalRef}>
      <form className="create-form" onSubmit={handleSubmit}>
        <FormRow
          label="Title"
          type="text"
          id="roomId"
          placeholder="enter room name (max 100)"
          value={room.title}
          maxLength="100"
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
                placeholder="enter gmail and click 'add'"
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
                {room.participants.map((tempUser, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ', '}
                    <div className="contact-item">
                      <span className="contact-item">{tempUser}</span>
                      {user.email !== tempUser && (
                        <button
                          type="button"
                          className="btn-type-3 remove-contact-btn"
                          onClick={() => removeContact(tempUser)}
                        >
                          <MdRemoveCircleOutline />
                        </button>
                      )}
                    </div>
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
