import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar style={{ backgroundColor: '#186aa4', color: 'white' }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/maximum4iot"> <b>Maximum4IoT</b> </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/maximum4iot/complementaryartifacts" active> Complementary Artifacts </Nav.Link>
            {/* <Nav.Link href="/maximum4iot/ourteam" active> Our Team</Nav.Link> */}
            <Nav.Link href="/maximum4iot/about" active> About Maximum4IoT</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;