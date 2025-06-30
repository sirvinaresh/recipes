import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../slice/saveSlice';
import { FaBookmark } from "react-icons/fa";
function Recipe() {
    const [recipe,setrecipe] = useState([]);
    const data = useSelector((state)=>state.save.value);
    const dispatch = useDispatch()
    useEffect(()=>{
        fetch('https://dummyjson.com/recipes')
          .then((res)=>res.json())
          .then((data)=>setrecipe(data.recipes))
          .catch((error)=>console.error('Error',error))
      },[])
  return (
    <>
        <Container className='my-5'>
            <Link className="nav-link text-end" to="/"><IoHome /> Home</Link>
            <Row>
            {
                recipe && recipe.map((val,i)=>{
                    const issaved = data.some((item)=>item.id === val.id);
                    return(

                        <Col key={i} lg={3} md={6} sm={12} className="my-4">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Img variant="top" src={val.image} />
                            <Card.Body>
                            <div className="d-flex justify-content-between">
                                <Card.Text className="text-danger fw-bold mb-2">{val.cuisine}</Card.Text>
                                <p className="shadow-sm px-2 rounded-5"><FaStar className="text-warning fs-6 mb-1"/> {val.rating}</p>
                            </div>
                            <Card.Title>{val.name}</Card.Title>
                            </Card.Body>

                           <div className="d-flex justify-content-between px-3 mb-3">
                      <Link to={`/details/${val.id}`}>
                          <Button variant="danger">Get Recipe</Button>
                      </Link>
       
                       <div>
                        <input type="checkbox" className="btn-check" id={val.id} autoComplete="off" checked={issaved} onChange={(e)=>{e.target.checked  ? dispatch(add(val)) : dispatch(remove(val))}} />
                        <label className="btn btn-outline-danger rounded-5" htmlFor={val.id}><FaBookmark /></label>
                      </div>
                    </div>

                        </Card>
                        </Col>
                    )
                }) 
            }
            </Row>
        </Container>
    </>
  )
}

export default Recipe