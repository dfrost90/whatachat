import { HeaderWrapper } from './wrappers';
import { useAuthContext } from '../context/auth_context';
import { useGlobalContext } from '../context/global_context';
import { MdOutlineColorLens } from 'react-icons/md';
import { BiChat, BiArrowBack, BiEditAlt } from 'react-icons/bi';
import { PiSignOutFill } from 'react-icons/pi';
import CustomizeModal from './CustomizeModal';

const Header = () => {
  const { user, userSignOut } = useAuthContext();
  const { setModal, room, setRoom } = useGlobalContext();

  return (
    <HeaderWrapper>
      <div className="container">
        <div className="account">
          {room ? (
            <button
              type="button"
              className="btn-type-2"
              onClick={() => {
                setRoom(null);
                sessionStorage.removeItem('room');
              }}
            >
              <BiArrowBack />
            </button>
          ) : (
            <img
              className="account-image"
              src={user?.photoURL}
              alt={user?.displayName}
            />
          )}
          <button
            className="theme-toggle btn-type-2"
            type="button"
            onClick={() => setModal({ type: 'customize' })}
          >
            <MdOutlineColorLens />
          </button>
        </div>
        {room && (
          <div className="room-title">
            <h3>{room.title}</h3>
            <div className="room-info">
              {room.privateRoom
                ? `${room.participants.length} participants`
                : 'public'}
            </div>
          </div>
        )}
        <div className="actions">
          {room ? (
            room.createdBy === user.uid && (
              <button
                type="button"
                className="btn-type-2"
                onClick={() => setModal({ type: 'edit' })}
              >
                <BiEditAlt />
              </button>
            )
          ) : (
            <button
              className="create-room btn-type-2"
              type="button"
              onClick={() => setModal({ type: 'create' })}
            >
              <BiChat />
            </button>
          )}
          <button type="button" className="btn-type-2" onClick={userSignOut}>
            <PiSignOutFill />
          </button>
        </div>
      </div>
      <CustomizeModal />
    </HeaderWrapper>
  );
};

export default Header;
