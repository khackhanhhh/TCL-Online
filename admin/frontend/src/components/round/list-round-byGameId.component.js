import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Modal } from "react-bootstrap";



const Round = props => (
  <tr className='text-start'>
    <td s>{props.round.name}</td>
    <td>{props.round.order}</td>
    <td>{props.round.content}</td>
    <td>{props.round.description}</td>
    <td>{props.round.answer}</td>
    <td>
      {/* <Link to={"/rounds/edit/" + props.round._id}><EditIcon /></Link>|<a href="#" onClick={() => { props.deleteRound(props.round._id) }}><DeleteIcon className="DeleteIcon text-danger" /></a> */}
      <a
        href="###"
        onClick={() => {
          props.editRound(props.round._id);
        }}
      >
        <EditIcon />
      </a>
      |
      <a
        href="###"
        onClick={() => {
          props.deleteRound(props.round._id);
        }}
      >
        <DeleteIcon className="DeleteIcon text-danger" />
      </a>
    </td>
  </tr>
)

const ListRound = (props) => {
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [answer, setAnswer] = useState('');
  const [roundId, setRoundId] = useState([]);
  const [gameId, setGameId] = useState('');
  const [gameName, setGameName] = useState('');
  const [games, setGames] = useState([]);


  const [rounds, setRounds] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleCloseDelete = () => setShowDelete(false);

  const [showEdit, setShowEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const handleCloseEdit = () => setShowEdit(false);


  const [currentPage, setCurrentPage] = useState(10);
  const [newPage, setNewPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    axios.get('/api/rounds/game/' + props.match.params.id)
      .then(response => {
        setRounds(response.data.round);
        setGameId(props.match.params.id)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('/api/games/' + props.match.params.id)
      .then(response => {
        setGames(response.data.game.name)
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

  const onChangeNewName = (e) => {
    setName(
      e.target.value
    );
  }

  const onChangeOrder = (e) => {
    setOrder(
      e.target.value
    );
  }
  const onChangeNewOrder = (e) => {
    setOrder(
      e.target.value
    );
  }

  const onChangeContent = (e) => {
    setContent(
      e.target.value
    );
  }
  const onChangeNewContent = (e) => {
    setContent(
      e.target.value
    );
  }
  const onChangeDescription = (e) => {
    setDescription(
      e.target.value
    );
  }
  const onChangeNewDescription = (e) => {
    setDescription(
      e.target.value
    );
  }
  const onChangeAnswer = (e) => {
    setAnswer(
      e.target.value
    );
  }
  const onChangeNewAnswer = (e) => {
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
    axios.post('/api/rounds/add', round)
      .then(res => {
        console.log(res.data);
        window.location = '/rounds/game/' + gameId;
      });
  }

  const IsEditRound = (e) => {
    e.preventDefault();
    const round = {
      name,
      content,
      description,
      order,
      answer,
      gameId,
    }
    axios.put('/api/rounds/update/' + idEdit, round)
      .then(res => console.log(res.data));
    window.location = '/rounds/game/' + gameId;
    setIdEdit();
    setShowEdit(false);
  };
  const handleEdit = (id) => {
    setShowEdit(true);
    setIdEdit(id);
    axios.get('/api/rounds/' + id)
      .then(response => {
        setName(response.data.round.name);
        setOrder(response.data.round.order);
        setContent(response.data.round.content);
        setDescription(response.data.round.description);
        setAnswer(response.data.round.answer);
        setGameName(response.data.round.game.name);
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const IsDeleteRound = () => {
    axios.delete("/api/rounds/" + idDelete).then((res) => console.log(res.data));
    setRounds(rounds.filter((el) => el._id !== idDelete));
    window.location = "/rounds/game/" + gameId;
    setIdDelete();
    setShowDelete(false);
  };

  const handleDelete = (id) => {
    setShowDelete(true);
    setIdDelete(id);
  };


  const listRound = () => {
    const lastPage = newPage * currentPage;
    const firstPage = lastPage - currentPage;
    return rounds.slice(firstPage, lastPage).map((currentRound) => {
      return (
        <Round
          round={currentRound}
          deleteRound={handleDelete}
          editRound={handleEdit}
          key={currentRound._id}
        />
      );
    });
  }

  const onClickCurrentPage = (e) => {
    setNewPage(e.target.id);
  };
  const showPagination = (arrRound) => {
    var arr = [];
    if (arrRound) {
      for (let i = 1; i <= Math.ceil(rounds.length / currentPage); i++) {
        arr.push(i);
      }
    }

    return arr.map((key) => {
      if (newPage === key) {
        return (
          <li id={`${key}`} key={key} className="page-item">
            <a className="page-link" href="###">
              {key}
            </a>
          </li>
        );
      } else {
        return (
          <li
            id={key}
            key={key}
            className="page-item"
            onClick={onClickCurrentPage}
          >
            <a id={key} className="page-link" href="###">
              {key}
            </a>
          </li>
        );
      }
    });
  };
  const onPrevious = () => {
    setNewPage((newPage) => newPage - 1);
  };
  const onNext = () => {
    setNewPage((v) => v + 1);
  };
  return (
    <div className="">
      <div className="pt-3 p-3 text-light d-flex justify-content-center bg-secondary">
        <h3>List Round</h3>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group text-start mt-3">
            <p>Game </p>
            <input type="text"
              required
              className="form-control"
              value={games}
              disabled
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Round Name: </p>
            <input type="text"
              required
              className="form-control"
              value={name}
              onChange={onChangeNewName}
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Order: </p>
            <input type="text"
              required
              className="form-control"
              value={order}
              onChange={onChangeNewOrder}
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Round Content: </p>
            <input type="text"
              required
              className="form-control"
              value={content}
              onChange={onChangeNewContent}
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Round Description: </p>
            <input type="text"
              required
              className="form-control"
              value={description}
              onChange={onChangeNewDescription}
            />
          </div>

          <div className="form-group text-start mt-3">
            <p>Round Answer: </p>
            <input type="text"
              required
              className="form-control"
              value={answer}
              onChange={onChangeNewAnswer}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group text-start mt-3">
            <p>Game </p>
            <input type="text"
              required
              className="form-control"
              value={games}
              disabled
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Round Name: </p>
            <input type="text"
              required
              className="form-control"
              value={name}
              onChange={onChangeName}
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Order: </p>
            <input type="text"
              required
              className="form-control"
              value={order}
              onChange={onChangeOrder}
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Round Content: </p>
            <input type="text"
              required
              className="form-control"
              value={content}
              onChange={onChangeContent}
            />
          </div>
          <div className="form-group text-start mt-3">
            <p>Round Description: </p>
            <input type="text"
              required
              className="form-control"
              value={description}
              onChange={onChangeDescription}
            />
          </div>

          <div className="form-group text-start mt-3">
            <p>Round Answer: </p>
            <input type="text"
              required
              className="form-control"
              value={answer}
              onChange={onChangeAnswer}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={IsEditRound}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Round</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={IsDeleteRound}>
            Delete Round
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='row d-flex mt-4'>
        <div className='col-lg-9 col-md-8 col-8'></div>
        <Link to="/" className="text-decoration-none col-lg-2 col-md-2 col-2 navbar-item text-light d-flex justify-content-end mb-3">
          <button className="btn btn-danger">Back</button>
        </Link>
        <div className="text-decoration-none col-lg-1 col-md-2 col-2 navbar-item text-light d-flex justify-content-start mb-3">
          <button className="btn btn-success" onClick={handleShow}>
            Add
          </button>
        </div>

      </div>
      <table className="table">
        <thead className="thead-light">
          <tr className='text-start'>
            <th>Round</th>
            <th>No</th>
            <th>Content</th>
            <th>Description</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRound()}
        </tbody>
      </table>
      <div className='d-flex mt-5 justify-content-around'>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a onClick={onPrevious} className="page-link" href="###">
                Previous
              </a>
            </li>
            {showPagination(rounds)}
            <li className="page-item">
              <a onClick={onNext} className="page-link" href="###">
                Next
              </a>
            </li>
            <select value={currentPage} onChange={e => setCurrentPage((e.target.value))}>
              <option value={5} >5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={100}>100</option>
            </select>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default ListRound;
