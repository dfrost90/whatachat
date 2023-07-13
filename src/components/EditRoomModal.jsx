import React, { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';

import Modal from './Modal';
import { useGlobalContext } from '../context/global_context';
import FormRow from './FormRow';
import { useAuthContext } from '../context/auth_context';
import { FormRowWrapper } from './wrappers';
import { MdRemoveCircleOutline } from 'react-icons/md';

const EditRoomModal = () => {
  const { user } = useAuthContext();
  const { modal, setModal, room, setRoom } = useGlobalContext();

  const [tempRoom, setTempRoom] = useState(room);
  const [contact, setContact] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const modalRef = useRef();
  useEffect(() => {
    if (modal?.type === 'edit') {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modal]);

  const contactRef = useRef(null);
  const addContact = () => {
    if (tempRoom.participants.includes(contact)) {
      return;
    }
    if (contact && contactRef.current?.checkValidity()) {
      setTempRoom({
        ...tempRoom,
        participants: [...tempRoom.participants, contact],
      });
      setContact('');
    }
  };

  const removeContact = (c) => {
    setTempRoom({
      ...tempRoom,
      participants: tempRoom.participants.filter((user) => user !== c),
    });
  };

  const handleCancel = () => {
    setModal(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, 'rooms', room.id), {
      ...tempRoom,
    });
    setRoom({ ...tempRoom });

    setModal(null);
  };

  const handleRemove = async () => {
    await deleteDoc(doc(db, 'rooms', room.id));
    sessionStorage.removeItem('room');
    setRoom(null);
    setModal(null);
  };

  return (
    <Modal title="Edit new room" innerRef={modalRef}>
      <form className="edit-form" onSubmit={handleSubmit}>
        <FormRow
          label="Title"
          type="text"
          id="roomId"
          placeholder="enter room name (max 100)"
          value={tempRoom.title}
          maxLength="100"
          required={true}
          handleChange={(e) =>
            setTempRoom({ ...tempRoom, title: e.target.value })
          }
        />
        <FormRow
          label="Private"
          type="checkbox"
          id="private"
          checked={tempRoom.privateRoom}
          handleChange={(e) =>
            setTempRoom({
              ...tempRoom,
              privateRoom: e.target.checked,
              participants: [user.email],
            })
          }
        />
        {tempRoom.privateRoom && (
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
                required={!tempRoom.participants.length}
              />
              <button type="button" className="btn-type-2" onClick={addContact}>
                add
              </button>
            </div>
            {tempRoom.participants.length > 0 && (
              <div className="contact-list">
                Room: {''}
                {tempRoom.participants.map((tempUser, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ', '}
                    <div className="contact-item">
                      <span className="contact-item">{tempUser}</span>
                      {user.email !== tempUser && tempUser !== 'all' && (
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
        <FormRowWrapper className="form-row delete-row">
          {!deleteConfirm ? (
            <button
              type="button"
              className="btn-type-3 delete-btn"
              onClick={() => setDeleteConfirm(true)}
            >
              Delete room
            </button>
          ) : (
            <>
              <span>Are you sure?</span>
              <button
                type="button"
                className="btn-type-2"
                onClick={handleRemove}
              >
                Ok
              </button>
              <button
                type="button"
                className="btn-type-2"
                onClick={() => setDeleteConfirm(false)}
              >
                No
              </button>
            </>
          )}
        </FormRowWrapper>

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

export default EditRoomModal;
