import { PropTypes } from 'prop-types';
import { RiChatPrivateLine } from 'react-icons/ri';
import { useGlobalContext } from '../context/global_context';
import { RoomItemWrapper } from './wrappers';

const RoomItem = (props) => {
  const { setRoom } = useGlobalContext();
  const { id, title, createdAt, privateRoom, participants, createdBy } =
    props.data;

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
        <h4 className="title">{title}</h4>
        <div className="date">{createdAt?.toDate().toDateString()}</div>
      </button>
    </RoomItemWrapper>
  );
};

RoomItem.propTypes = {
  data: PropTypes.object,
};

export default RoomItem;
