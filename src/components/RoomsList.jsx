import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';

import { ListWrapper } from './wrappers';
import RoomItem from './RoomItem';
import Loading from './Loading';
import { useAuthContext } from '../context/auth_context';

const RoomsList = () => {
  const { user } = useAuthContext();
  const [rooms, loading, error] = useCollection(
    query(
      collection(db, 'rooms'),
      where('participants', 'array-contains-any', ['all', user?.email])
    )
  );

  return (
    <ListWrapper>
      <div
        className={`${
          rooms?.docs.length === 0 ? 'container empty' : 'container'
        } main-content`}
      >
        <div className="background-texture"></div>
        {loading ? (
          <Loading />
        ) : rooms && rooms?.docs.length > 0 ? (
          <ul>
            {rooms.docs.map((doc) => {
              return (
                <RoomItem
                  key={doc.id}
                  data={{
                    ...doc.data(),
                    id: doc.id,
                  }}
                />
              );
            })}
          </ul>
        ) : (
          <span>no rooms yes :(</span>
        )}
      </div>
    </ListWrapper>
  );
};

export default RoomsList;
