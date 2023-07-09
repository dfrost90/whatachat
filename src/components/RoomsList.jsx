import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, db, query, where } from '../firebase';
import { ListWrapper } from './wrappers';
import RoomItem from './RoomItem';
import Loading from './Loading';
import { useAuthContext } from '../context/auth_context';

const RoomsList = () => {
  const { user } = useAuthContext();
  const [rooms, loading, error] = useCollection(
    query(
      collection(db, 'rooms'),
      where('participants', 'array-contains-any', ['all', user.email])
    )
  );

  return (
    <ListWrapper>
      <div className={`container ${rooms?.docs.length === 0 && 'empty'}`}>
        {loading ? (
          <Loading />
        ) : rooms ? (
          <ul>
            {rooms.docs.map((doc) => (
              <RoomItem key={doc.id} data={{ ...doc.data(), id: doc.id }} />
            ))}
          </ul>
        ) : (
          <span>no rooms yes :(</span>
        )}
      </div>
    </ListWrapper>
  );
};

export default RoomsList;
