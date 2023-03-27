import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../features/apislice.js';


function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const handleLoadUserClick = () => {
    dispatch(fetchUserById());
  };

  return (
    <div>
      {status === 'loading' && <div>Loading user...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <div>
          <h1>{user.DrawGameId}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      <button onClick={handleLoadUserClick}>Load User</button>
    </div>
  );
}

export default UserPage