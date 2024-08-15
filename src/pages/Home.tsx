import Table from 'react-bootstrap/Table';

function Home() {
  

  return (
    <>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Email</th>
          <th>Навыки</th>
          <th>Дата регистрации</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Writing, Listening</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default Home
