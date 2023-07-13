import { PropTypes } from 'prop-types';
import { RiChatPrivateLine } from 'react-icons/ri';
import { useGlobalContext } from '../context/global_context';
import { RoomItemWrapper } from './wrappers';
import moment from 'moment';
import { useAuthContext } from '../context/auth_context';

const RoomItem = (props) => {
  const { user } = useAuthContext();
  const { setRoom } = useGlobalContext();
  const {
    id,
    lastSeen,
    lastMessage,
    lastUpdate,
    title,
    privateRoom,
    participants,
    createdBy,
  } = props.data;

  return (
    <RoomItemWrapper>
      <button
        type="button"
        onClick={() => {
          const roomObj = { id, title, privateRoom, participants, createdBy };
          setRoom(roomObj);
          sessionStorage.setItem('room', JSON.stringify(roomObj));
        }}
      >
        <div className="icon">{privateRoom && <RiChatPrivateLine />}</div>
        <div className="room-title">
          <h4 className="title">{title}</h4>
          <div className="last-message">{lastMessage}</div>
        </div>
        <div className="info">
          {!lastSeen?.includes(user.uid) && <span className="new">new</span>}
          <div className="date">{moment(lastUpdate?.toDate()).toNow()}</div>
        </div>
      </button>
    </RoomItemWrapper>
  );
};

RoomItem.propTypes = {
  data: PropTypes.object,
};

export default RoomItem;
