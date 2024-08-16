import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import User from './pages/User'
import Error from './pages/Error'

const App: React.FC = () => {

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
    <Container>
        <Navbar.Brand as={Link} to="/">TDS Users App</Navbar.Brand>     
    </Container>
    </Navbar>   
    
    <Container className='mt-5'>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<User />} />
          <Route path="/editUser/:id" element={<User />} />
          <Route path="*" element={<Error/>} />
    </Routes>
    </Container>
    </>
  )
}

export default App
