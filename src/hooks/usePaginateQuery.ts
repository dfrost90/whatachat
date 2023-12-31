import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { DocumentData, Query } from 'firebase/firestore';
import { startAfter, query, getDocs } from 'firebase/firestore';

const usePaginateQuery = (queryFn: () => Query) => {
  const [data, setData] = useState([]);
  const isMountedRef = useRef(false);
  const lastItemRef = useRef(null);
  const [isLoading, setisLoading] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const resetStates = () => {
    setData(null);
    setData([]);
    setisLoading(false);
  };

  useEffect(() => {
    if (isMountedRef.current === true) return;

    async function fetchQuery() {
      try {
        isMountedRef.current = true;
        setisLoading(true);
        const q = query(queryFn());
        const querySnapshot = await getDocs(q);
        setData([...querySnapshot.docs]);
        lastItemRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
        setisLoading(false);
      } catch (error) {
        resetStates();
        setErrorMsg(error.code);
      }
    }
    fetchQuery();
  }, [queryFn]);

  const more = useCallback(async () => {
    try {
      setisLoading(true);
      const next = query(queryFn(), startAfter(lastItemRef.current));
      const querySnapshot = await getDocs(next);
      setData([...data, ...querySnapshot.docs]);
      lastItemRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
      setisLoading(false);
    } catch (error) {
      resetStates();
      setErrorMsg(error.code);
    }
  }, [data, queryFn]);

  return useMemo(
    () => ({
      more,
      isLoading,
      data,
      errorMsg,
    }),
    [more, isLoading, data, errorMsg]
  );
};

export default usePaginateQuery;
