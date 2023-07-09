import { useGlobalContext } from '../context/global_context';
import { MainWrapper } from './wrappers';
import Header from './Header';
import Room from './Room';
import RoomsList from './RoomsList';
import CreateEditRoom from './CreateEditRoom';

const UserSpace = () => {
  const { room } = useGlobalContext();

  return (
    <MainWrapper>
      <Header options={{ chat: true }} />
      {room ? <Room /> : <RoomsList />}
      <CreateEditRoom {...room} />
    </MainWrapper>
  );
};

export default UserSpace;
