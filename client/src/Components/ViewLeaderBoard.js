import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

function Leader() {
  const [userData, setUserData] = useState([]);

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

  

  return (
    <div id="leaderboard">
      <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '30px', color: 'white' }}>
        Leaderboard
      </h1>
      <Table  bordered center responsive style={{width:"70vw",margin:"0 auto"}}>
        <thead>
          <tr className="table-primary">

            <th>User Name</th>
            <th>Games Played</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
             
              <td>{user.name}</td>
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
             
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Leader;
