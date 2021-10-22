import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Modal } from "react-bootstrap";
import CreateRound from './create-round.component';



const Round = props => (
  <tr className='text-start'>
    <td s>{props.round.name}</td>
    <td>{props.round.order}</td>
    <td>{props.round.content}</td>
    <td>{props.round.description}</td>
    <td>{props.round.answer}</td>
    <td>
      <Link to={"/rounds/edit/" + props.round._id}><EditIcon /></Link>|<a href="#" onClick={() => { props.deleteRound(props.round._id) }}><DeleteIcon className="DeleteIcon text-danger" /></a>
    </td>
  </tr>
)

const ListRound = (props) => {
  const [rounds, setRounds] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    axios.get('/api/rounds/game/' + props.match.params.id)
      .then(response => {
        setRounds(response.data.round);
        setId(props.match.params.id)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handleDelete = (id) => {
    axios.delete('/api/rounds/' + id)
      .then(res => console.log(res.data));
    setRounds(
      rounds.filter(el => el._id !== id)
    )
  };
  console.log(rounds);
  const listRound = () => {
    return rounds.map(currentRound => {
      return <Round round={currentRound} key={currentRound.id} deleteRound={handleDelete} key={currentRound._id} />;
    })
  }
  return (
    <div className="">
      <div className="pt-3 p-3 text-light d-flex justify-content-center bg-secondary">
        <h3>List Round</h3>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateRound></CreateRound>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='row d-flex mt-4'>
        <div className='col-lg-9 col-md-8 col-8'></div>
        <Link to="/" className="text-decoration-none col-lg-2 col-md-2 col-2 navbar-item text-light d-flex justify-content-end mb-3">
          <button className="btn btn-danger">Back</button>
        </Link>
        <Link to={"/round/create/" + id} className="text-decoration-none col-lg-1 col-md-2 col-2 navbar-item text-light d-flex justify-content-start mb-3">
          <button className="btn btn-success" onClick={handleShow}>Add</button>
        </Link>
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
export default ListRound;
