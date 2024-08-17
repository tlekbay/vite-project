import React, { useEffect } from 'react';
import {
  useNavigate
} from "react-router-dom";
import { Table, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { RootState, AppDispatch } from '../store';
import { fetchUsers, deleteUser } from '../store/userSlicer';

const Home: React.FC = () => {
  
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClick = () => {
    navigate('/addUser');
  };

  const handleEdit = (id: string) => {
    navigate(`/editUser/${id}`);
  };

  const handleDelete = (id: string) => dispatch(deleteUser(id));

  if (isLoading) return <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
  </Spinner>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Button className='my-2' onClick={handleClick} type="submit" variant="primary">Add User</Button>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Email</th>
          <th>Навыки</th>
          <th>Дата регистрации</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
      {data && data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.mail}</td>
            <td>{user.skills.map(({ skill }) => skill).join(', ')}</td>
            <td>{user.registration_date} 
            </td>
            <td>
              <Button variant="outline-primary" onClick={() => handleEdit(user.id)} className="me-2">
                <FaEdit />
              </Button>
              <Button variant="outline-danger" onClick={() => handleDelete(user.id)}>
                <FaTrash />
              </Button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  )
}

export default Home
