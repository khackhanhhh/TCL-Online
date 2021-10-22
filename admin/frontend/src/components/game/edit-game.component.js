import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const EditGame = (props) => {
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('/api/games/' + props.match.params.id)
            .then(response => {
                setName(response.data.game.name);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    const onChangeName = (e) => {
        setName(
            e.target.value
        );
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const game = {
            name
        };

        axios.put('/api/games/update/' + props.match.params.id, game)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    return (
        <div className="">
            <div className="pt-3 p-3 text-light d-flex justify-content-around bg-secondary">
                <h3>Create New Game</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-group text-start mt-3">
                    <h5>Game Name: </h5>
                    <input type="text"
                        required
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>
                <div className="d-flex mt-3">
                    <div className="form-group mr-4">
                        <input type="submit" value="Edit Game" className="btn btn-primary" />
                    </div>

                    <Link to="/" className="navbar-item text-light">
                        <button className="btn btn-danger form-group" >Cancel</button>
                    </Link>

                </div>
            </form>
        </div>
    );
}

export default EditGame;