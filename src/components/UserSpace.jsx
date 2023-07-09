import { MainWrapper } from './wrappers';
import Header from './Header';
import Room from './Room';
import RoomsList from './RoomsList';
import { useGlobalContext } from '../context/global_context';
import CreateRoomModal from './CreateRoomModal';
import EditRoomModal from './EditRoomModal';

const UserSpace = () => {
  const { room } = useGlobalContext();

  return (
    <MainWrapper>
      <Header options={{ chat: true }} />
      {room ? (
        <>
          <Room />
          <EditRoomModal />
        </>
      ) : (
        <>
          <RoomsList />
          <CreateRoomModal />
        </>
      )}
    </MainWrapper>
  );
};

export default UserSpace;
