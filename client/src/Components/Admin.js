import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
function Admin() {
  const [userData, setUserData] = useState([]);

  const history = useHistory();

  const handleLogout = () => {
    history.push('/home');
};
  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/fetchadmin');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      // Send an API request to delete the user by ID
      await axios.delete(`http://localhost:9000/delByAdmin/${id}`);

      setUserData((prevUserData) => prevUserData.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="admin-container" style={{ backgroundColor: 'white' }}>
      <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px', color: 'hsla(185,76%,36%,1)' }}>
        LeaderBoard
      </h1>
      <Button
                id="logout"
                color="danger"
                style={{ position: 'absolute', top: '10px', right: '20px' }}
                onClick={handleLogout}
            >
                Logout
            </Button>
      <Table striped bordered hover responsive style={{width:"80vw",margin:"0 auto"}}>
        <thead>
          <tr className="table-primary">
            <th>User ID</th>
            <th>User Name</th>
            <th>Email ID</th>
            <th>Games Played</th>
            <th>Action</th> {/* Add a new column for the delete button */}
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <ul style={{ listStyleType: 'none' }}>
                  {user.gamesInfo && user.gamesInfo.length > 0 ? (
                    user.gamesInfo.map((game) => (
                      <li>
                        {game.gamename} - {game.score}
                      </li>
                    ))
                  ) : (
                    <li>No games played</li>
                  )}
                </ul>
              </td>
              <td>
                <Button color="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Admin;
