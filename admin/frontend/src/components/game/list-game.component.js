import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Modal } from "react-bootstrap";


const Game = props => (
  <tr>
    <td>
      <Link className='text-decoration-none text-primary d-flex justify-content-start' to={"/rounds/game/" + props.game._id}>
        {props.game.name}
      </Link>
    </td>
    <td>
      <Link to={"/games/edit/" + props.game._id}><EditIcon /></Link> |
      <a
        onClick={() => { props.deleteGame(props.game._id) }}>
        <DeleteIcon className="DeleteIcon text-danger" /></a>
    </td>
  </tr>
)

const ListGames = (props) => {
  const [games, setGames] = useState([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  useEffect(() => {
    axios.get('/api/games')
      .then(response => {
        setGames(response.data.games);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

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

  const IsDeleteGame = () => {
    setIsDelete(true);
    console.log(isDelete);
  }
  const handleDelete = (id) => {
    setShowDelete(true);
    console.log(isDelete);
    if (isDelete == true) {
      axios.delete('/api/games/' + id)
        .then(res => console.log(res.data));
      setGames(
        games.filter(el => el._id !== id)
      )
      setIsDelete(false);
      window.location = '/';
    }

  };
  console.log(games);
  const listGame = () => {
    return games.map(currentGame => {
      return <Game game={currentGame} key={currentGame.id} deleteGame={handleDelete} key={currentGame._id} />;
    })
  }
  return (
    <div className="">
      <div className="pt-3 p-3 text-light d-flex justify-content-around bg-secondary">
        <h3>List Game</h3>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group text-start mt-3">
            <input type="text"
              required
              className="form-control"
              value={name}
              onChange={onChangeName}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={IsDeleteGame}>
            Delete Game
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='row'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4'></div>
        <div className='col-md-12 col-lg-4 d-flex mt-4 ml-4 justify-content-evenly'>
          {/* <Link to="/create" className="text-decoration-none navbar-item text-light d-flex justify-content-end mb-3 mr-5">
            <button className="btn btn-success">Add</button>
          </Link> */}
          <div className="text-decoration-none col-lg-1 col-md-2 col-2 navbar-item text-light d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={handleShow}>Add</button>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th className='d-flex justify-content-start'>Game</th>
            <th >Actions</th>
          </tr>

        </thead>
        <tbody>
          {listGame()}
        </tbody>
      </table>
      <div className='d-flex mt-5 justify-content-around'>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default ListGames;
