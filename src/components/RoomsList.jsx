import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';

import { ListWrapper } from './wrappers';
import RoomItem from './RoomItem';
import Loading from './Loading';
import { useAuthContext } from '../context/auth_context';
import { useEffect, useState } from 'react';

const RoomsList = () => {
  const { user } = useAuthContext();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'rooms'),
      where('participants', 'array-contains-any', ['all', user?.email])
    );
    const unsubscribe = onSnapshot(q, (documents) => {
      const tempRooms = [];
      documents.forEach((document) => {
        tempRooms.push({
          id: document.id,
          ...document.data(),
        });
      });
      setLoading(false);
      setRooms(tempRooms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ListWrapper>
      <div
        className={`${
          rooms?.length === 0 ? 'container empty' : 'container'
        } main-content`}
      >
        <div className="background-texture"></div>
        {loading ? (
          <Loading />
        ) : rooms && rooms?.length > 0 ? (
          <ul>
            {rooms.map((doc) => {
              return (
                <RoomItem
                  key={doc.id}
                  data={{
                    ...doc,
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
