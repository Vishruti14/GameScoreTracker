import React,{useState} from 'react'
import axios from 'axios';
import GameModal from './AddGame';
function HandleAddGame(props) {
    const [newGame, setNewGame] = useState({
        gamename: '',
        score: '',
    });
    const [data, setData] = useState([]);
    const id = props.id;

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
                
            } 
            else {
                alert('Add Game Failed');
            }
        } catch (error) {
            console.log('Error adding game', error);
        }
    }
  return (
    <div>
     <GameModal  handleAddGame={handleAddGame} newGame={newGame} handleChange={handleChange}/>

    </div>
  )
}

export default HandleAddGame
