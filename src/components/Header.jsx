import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FiUser } from "react-icons/fi";
import Image from 'react-bootstrap/Image';
import { FaRegBookmark } from "react-icons/fa6";
function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-danger shadow" sticky="top" >
        <Container >
          <Navbar.Brand> <Image src={require('../components/log.png')} style={{height:'45px'}} fluid /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-lg-5 ">
              <NavLink className='nav-link text-light fs-5' to="/">Home</NavLink>
              <NavLink className='nav-link text-light fs-5' to="recipe">Recipes</NavLink>
              <NavLink className='nav-link text-light fs-5' to="cuisines">Cuisines</NavLink>
              <NavLink className='nav-link text-light fs-5' to="categorie">Categories</NavLink>
              <NavLink className='nav-link text-light fs-5' to="blog">Blog</NavLink>
              <NavLink className='nav-link text-light fs-5' to="features">Features</NavLink>
              <Nav className="ms-lg-5 mt-lg-2 gap-3 flex-row">
                <NavLink className='icon-show text-light fs-5' to='fav'><FaRegBookmark /></NavLink>
                <NavLink className='text-light fs-5'><FiUser /></NavLink>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
