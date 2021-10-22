import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditRound = (props) => {
    const [name, setName] = useState('');
    const [order, setOrder] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [answer, setAnswer] = useState('');
    const [roundId, setRoundId] = useState([]);
    const [gameId, setGameId] = useState('');
    const [gameName, setGameName] = useState('');

    useEffect(() => {
        axios.get('/api/rounds/' + props.match.params.id)
            .then(response => {
                setName(response.data.round.name);
                setOrder(response.data.round.order);
                setContent(response.data.round.content);
                setDescription(response.data.round.description);
                setAnswer(response.data.round.answer);
                setGameName(response.data.round.game.name);
                setGameId(response.data.round.game._id)
                console.log(gameId);
            })
            .catch(function (error) {
                console.log(error);
            })
            setRoundId(props.match.params.id)
    }, [])
    const onChangeName = (e) => {
        setName(
            e.target.value
        );
    }

    const onChangeOrder = (e) => {
        setOrder(
            e.target.value
        );
    }
    const onChangeContent = (e) => {
        setContent(
            e.target.value
        );
    }
    const onChangeDescription = (e) => {
        setDescription(
            e.target.value
        );
    }
    const onChangeAnswer = (e) => {
        setAnswer(
            e.target.value
        );
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const round = {
            name,
            content,
            description,
            order,
            answer,
            gameId,
        }

        axios.put('/api/rounds/update/' + props.match.params.id, round)
            .then(res => console.log(res.data));

        window.location = '/rounds/game/'+ gameId;
    }
    return (
        <div className="opacity-3">
        <div className="pt-3 p-3 text-light d-flex justify-content-around bg-secondary">
            <h3>Edit Round</h3>
        </div>
        <form onSubmit={onSubmit}>
            <div className="form-group text-start mt-3">
                <h5>Game </h5>
                <input type="text"
                    required
                    className="form-control"
                    value={gameName}
                    disabled
                />
            </div>
            <div className="form-group text-start mt-3">
                <h5>Round Name: </h5>
                <input type="text"
                    required
                    className="form-control"
                    value={name}
                    onChange={onChangeName}
                />
            </div>
            <div className="form-group text-start mt-3">
                <h5>Order: </h5>
                <input type="text"
                    required
                    className="form-control"
                    value={order}
                    onChange={onChangeOrder}
                />
            </div>
            <div className="form-group text-start mt-3">
                <h5>Round Content: </h5>
                <input type="text"
                    required
                    className="form-control"
                    value={content}
                    onChange={onChangeContent}
                />
            </div>
            <div className="form-group text-start mt-3">
                <h5>Round Description: </h5>
                <input type="text"
                    required
                    className="form-control"
                    value={description}
                    onChange={onChangeDescription}
                />
            </div>

            <div className="form-group text-start mt-3">
                <h5>Round Answer: </h5>
                <input type="text"
                    required
                    className="form-control"
                    value={answer}
                    onChange={onChangeAnswer}
                />
            </div>
                <div className="d-flex mt-3">
                    <div className="form-group mr-4">
                        <input type="submit" value="Edit Game" className="btn btn-primary" />
                    </div>

                    <Link to={"/rounds/game/"+ gameId} className="navbar-item text-light">
                        <button className="btn btn-danger form-group" >Cancel</button>
                    </Link>

                </div>
            </form>
        </div>
    );
}

export default EditRound;