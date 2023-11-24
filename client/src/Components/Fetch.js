import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import AddGame from './AddGame';
import {Link} from 'react-router-dom'
import UpdateUser from './UpdateUser';

function Fetch(props) {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [newGame, setNewGame] = useState({
        gamename: '',
        score: '',
    });
    const id = props.location.state.id;


    const history = useHistory();
    const handleLogout = () => {
        history.push('/home');
    };

    const handleViewLeaderboard = () => {
        history.push('/viewleaderboard');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGame({
            ...newGame,
            [name]: value,
        });
    };

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:9000/fetch', { id });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response1 = await axios.post('http://localhost:9000/fetchuser', { id });
            setUserData(response1.data);
        } catch (error) {
            console.log('Error fetching data');
        }
    };

    async function handleDelete(id, gamename, score) {
        try {
            const response = await axios.delete('http://localhost:9000/delete', {
                data: { id, gamename, score },
            });
            console.log(response.data);
            if (response.data === true) {
                alert('Deletion Successful');
                fetchData();
            } else {
                alert('Deletion Failed');
            }
        } catch (error) {
            console.log('Error deleting data', error);
        }
    }

    async function handleIncrement(id, gamename, score, incrementValue) {
        const newScore = score + incrementValue;
        try {
            const response = await axios.put('http://localhost:9000/updateScore', {
                id,
                gamename,
                score: newScore,
            });
            console.log(response.data);
            if (response.data === true) {
                fetchData();
            } else {
                alert('Update Failed');
            }
        } catch (error) {
            console.log('Error updating data', error);
        }
    }

    async function handleDecrement(id, gamename, score, decrementValue) {
        const newScore = score - decrementValue;
        const updatedScore = Math.max(newScore, 0);
        if(updatedScore === 0 && newScore < 0)
        {
            alert('Score cannot be negative');
           
        }
        else{
        try {
            const response = await axios.put('http://localhost:9000/updateScore', {
                id,
                gamename,
                score: updatedScore,
            });
            console.log(response.data);
            if (response.data === true) {
                fetchData();
            } else {
                alert('Update Failed');
            }
        } catch (error) {
            console.log('Error updating data', error);
        }
    }
    }

    async function handleAddGame() {
        const score = parseInt(newGame.score);
        try {
            const response = await axios.post('http://localhost:9000/addgame', {
                id,
                gamename: newGame.gamename,
                score: score,
            });
            if (response.data === true) {
                alert('Game Successfully Added');

                fetchData();
                setNewGame({
                    gamename: '',
                    score: '',
                });
            } else {
                alert('Add Game Failed');
            }
        } catch (error) {
            console.log('Error adding game', error);
        }
    }

    async function senddata(formdata) {
        try {
            const response = await axios.put('http://localhost:9000/updateUser', formdata);
            if (response.data === true) {
                alert('Updation Successful');
                fetchUserData();
            } else {
                alert('Updation Failed');
            }
        } catch (error) {
            console.log('Error in updating the data');
        }
    }

    return (
        <div id="containerfetch">
            <Button
                id="logout"
                color="danger"
                style={{ position: 'absolute', top: '10px', right: '20px' }}
                onClick={handleLogout}
            >
                Logout
            </Button>

            <h3
                style={{
                    backgroundColor: 'white',
                    color: 'grey',
                    fontSize: '40px',
                    fontWeight: '3rem',
                    textAlign: 'center',
                    padding: '10px',
                }}
            >
                "Game On, Score Strong!"
            </h3>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div class="card" style={{ marginRight: '10px',marginTop:'55px'}}>
                            <div class="card-body">
                                <h5 class="card-title">User Details</h5>
                                {userData.map((item) => (
                                    <p key={item._id} class="card-text">
                                        User Name: {item.name} <br />
                                        Email Id : {item.email} <br />
                                        Password : ********* <br />
                                        <br />
                                        <UpdateUser senddata={senddata} item={item} />
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-12 col-sm-12">

                    <div className="d-flex justify-content-around align-items-around">
                            <AddGame
                                handleAddGame={handleAddGame}
                                newGame={newGame}
                                handleChange={handleChange}
                            />
                            <Button
                                id="view-leaderboard"
                                color="warning"
                                onClick={handleViewLeaderboard}
                                style={{ width: "200px",marginBottom:"20px"}} 
                            >
                                Leaderboard
                            </Button>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Game Name</th>
                                    <th>Score</th>
                                    <th>Modify Score</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.gamename}</td>
                                            <td>{item.score}</td>
                                            <td className="btn-group" style={{ marginBottom: '10px' }}>
                                                <Button
                                                    color="success"
                                                    onClick={() =>
                                                        handleIncrement(item.id, item.gamename, item.score, 1)
                                                    }
                                                    style={{ width: '50px', marginRight: '20px', marginBottom: '10px' }}
                                                >
                                                    +1
                                                </Button>
                                                <Button
                                                    color="success"
                                                    onClick={() =>
                                                        handleIncrement(item.id, item.gamename, item.score, 5)
                                                    }
                                                    style={{ width: '50px', marginRight: '20px', marginBottom: '10px' }}
                                                >
                                                    +5
                                                </Button>
                                                <Button
                                                    color="success"
                                                    onClick={() =>
                                                        handleIncrement(item.id, item.gamename, item.score, 10)
                                                    }
                                                    style={{ width: '50px', marginRight: '20px', marginBottom: '10px' }}
                                                >
                                                    +10
                                                </Button>
                                                <Button
                                                    color="warning"
                                                    onClick={() =>
                                                        handleDecrement(item.id, item.gamename, item.score, 1)
                                                    }
                                                    style={{ width: '50px', marginRight: '20px', marginBottom: '10px' }}
                                                >
                                                    -1
                                                </Button>
                                                <Button
                                                    color="warning"
                                                    onClick={() =>
                                                        handleDecrement(item.id, item.gamename, item.score, 5)
                                                    }
                                                    style={{ width: '50px', marginRight: '20px', marginBottom: '10px' }}
                                                >
                                                    -5
                                                </Button>
                                                <Button
                                                    color="warning"
                                                    onClick={() =>
                                                        handleDecrement(item.id, item.gamename, item.score, 10)
                                                    }
                                                    style={{ width: '50px', marginRight: '20px', marginBottom: '10px' }}
                                                >
                                                    -10
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    color="danger"
                                                    onClick={() =>
                                                        handleDelete(item.id, item.gamename, item.score)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4}>No Data Available</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {/* <Link to="/updateUser" className="btn btn-primary">
                  Update User
                </Link> */}
                {/* <UpdateUser /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Fetch;
