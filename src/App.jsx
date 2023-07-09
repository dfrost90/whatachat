import { Welcome, Loading, UserSpace } from './components';
import { AppWrapper } from './components/wrappers';
import { useAuthContext } from './context/auth_context';

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  return <AppWrapper>{user ? <UserSpace /> : <Welcome />}</AppWrapper>;
}

export default App;
