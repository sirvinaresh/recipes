import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { remove } from '../slice/saveSlice';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { FaBookmark } from "react-icons/fa";

function Favorite() {

  const data = useSelector((state)=>state.save.value);
  const dispatch = useDispatch()
  return (
   <>
    <div className='bg-body-secondary text-center py-5 my-3 px-5 '>
        <h1>My Favorites</h1>
        <p>View all your favorite recipes saved in one convenient place. Rediscover dishes you've liked and plan your next delicious creation!</p>
    </div>

    <Container>
      <Row>
        {
          data.length > 0 ? data.map((val,i)=>{
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
                        <input type="checkbox" className="btn-check" id={val.id} autoComplete="off" checked={true} onChange={(e)=>{dispatch(remove(val))}} />
                        <label className="btn btn-outline-danger rounded-5" htmlFor={val.id}><FaBookmark /></label>
                      </div>
                    </div>
                      
                  </Card>
                </Col>
            )
          }) : <Image src={require('../components/notfound.jpg')} className="error" fluid />
        }
      </Row>
    </Container>
   </>
  )
}

export default Favorite