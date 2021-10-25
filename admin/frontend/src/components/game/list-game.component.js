import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Modal } from "react-bootstrap";

const Game = (props) => (
  <tr>
    <td>
      <Link
        className="text-decoration-none text-primary d-flex justify-content-start"
        to={"/rounds/game/" + props.game._id}
      >
        {props.game.name}
      </Link>
    </td>
    <td>
      <a
        href="###"
        onClick={() => {
          props.editGame(props.game._id);
        }}
      >
        <EditIcon />
      </a>
      |
      <a
        href="###"
        onClick={() => {
          props.deleteGame(props.game._id);
        }}
      >
        <DeleteIcon className="DeleteIcon text-danger" />
      </a>
    </td>
  </tr>
);

const ListGames = (props) => {
  const [games, setGames] = useState([]);
  const [name, setName] = useState("");

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
    axios
      .get("/api/games")
      .then((response) => {
        setGames(response.data.games);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNewName = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const game = {
      name,
    };
    axios.post("/api/games/add", game).then((res) => {
      console.log(res.data);
      window.location = "/";
    });
  };

  const IsDeleteGame = () => {
    axios.delete("/api/games/" + idDelete).then((res) => console.log(res.data));
    setGames(games.filter((el) => el._id !== idDelete));
    window.location = "/";
    setIdDelete();
    setShowDelete(false);
  };
  const handleDelete = (id) => {
    setShowDelete(true);
    setIdDelete(id);
  };

  const IsEditGame = (e) => {
    e.preventDefault();
        const game = {
            name
        };
    axios.put('/api/games/update/' + idEdit, game)
            .then(res => console.log(res.data));
    window.location = "/";
    setIdEdit();
    setShowEdit(false);
  };
  const handleEdit = (id) => {
    setShowEdit(true);
    setIdEdit(id);
    axios.get('/api/games/' + id)
      .then(response => {
        setName(response.data.game.name);
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const listGame = () => {
    const lastPage = newPage * currentPage;
    const firstPage = lastPage - currentPage;
    return games.slice(firstPage, lastPage).map((currentGame) => {
      return (
        <Game
          game={currentGame}
          deleteGame={handleDelete}
          editGame={handleEdit}
          key={currentGame._id}
        />
      );
    });
  };

  const onClickCurrentPage = (e) => {
    setNewPage(e.target.id);
  };
  const showPagination = (arrGame) => {
    var arr = [];
    if (arrGame) {
      for (let i = 1; i <= Math.ceil(games.length / currentPage); i++) {
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
      <div className="pt-3 p-3 text-light d-flex justify-content-around bg-secondary">
        <h3>List Game</h3>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group text-start mt-3">
            <input
              type="text"
              required
              className="form-control"
              value={name}
              onChange={onChangeNewName}
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
            <input
              type="text"
              required
              className="form-control"
              value={name}
              onChange={onChangeName}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={IsEditGame}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={IsDeleteGame}>
            Delete Game
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4"></div>
        <div className="col-md-12 col-lg-4 d-flex mt-4 ml-4 justify-content-evenly">
          {/* <Link to="/create" className="text-decoration-none navbar-item text-light d-flex justify-content-end mb-3 mr-5">
            <button className="btn btn-success">Add</button>
          </Link> */}
          <div className="text-decoration-none col-lg-1 col-md-2 col-2 navbar-item text-light d-flex justify-content-start mb-3">
            <button className="btn btn-success" onClick={handleShow}>
              Add
            </button>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a onClick={onPrevious} className="page-link" href="###">
                  Previous
                </a>
              </li>
              {showPagination(games)}
              <li className="page-item">
                <a onClick={onNext} className="page-link" href="###">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th className="d-flex justify-content-start">Game</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{listGame()}</tbody>
      </table>
      <div className="d-flex mt-5 justify-content-around">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={onPrevious} href="###">
                Previous
              </a>
            </li>

            {showPagination(games)}

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
};
export default ListGames;
