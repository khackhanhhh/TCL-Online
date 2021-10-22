import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CreateGame = (props) => {
    const [name, setName] = useState('');

    const onChangeName = (e) => {
        setName(
            e.target.value
        );
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const game = {
            name
        }
        axios.post('/api/games/add', game)
            .then(res => {
                console.log(res.data);
                window.location = '/';
            });
    }
    return (
        <div className="opacity-3">
            <form onSubmit={onSubmit}>
                <div className="form-group text-start mt-3">
                    <input type="text"
                        required
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>

                <div className="d-flex mt-3 ">
                    <div className="form-group mr-3" >
                        <input type="submit" value="Create Game" className="btn btn-primary" />
                    </div>
                    <Link to="/" className="navbar-item text-light  ">
                        <button className="btn btn-danger form-group" >Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
export default CreateGame;
