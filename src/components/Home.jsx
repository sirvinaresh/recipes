import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import { ScaleLoader } from "react-spinners";
import { MdExpandMore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../slice/saveSlice";
import { FaBookmark } from "react-icons/fa";
function Home() {
  const [text,settext] = useState('');
  const [recipe,setrecipe] = useState([]);
  const [search,setsearch] = useState('');
  const [load,setload] = useState(true)
  const [sortdish,setsortdish] = useState('');

  const [limit,setlimit] = useState(8)
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.save.value);

  useEffect(()=>{
     (setTimeout(() => {
        setload(false)
    },1000 ))

    if(sortdish === ''){
      fetch(`https://dummyjson.com/recipes?limit=${limit}`)
      // fetch('https://dummyjson.com/recipes')
        .then((res)=>res.json())
        .then((data)=>setrecipe(data.recipes))
        .catch((error)=>console.error('Error',error))
    }
    else{
      fetch(`https://dummyjson.com/recipes/meal-type/${sortdish}?limit=${limit}`)
      .then((res)=>res.json())
      .then((data)=>setrecipe(data.recipes))
    }
  },[limit,sortdish])

  const searchitem = () =>{
    fetch(`https://dummyjson.com/recipes/search?q=${search}`)
      .then((res)=>res.json())
      .then((data)=>setrecipe(data.recipes || []))
  }

  if(load){
    return(
      <div className="loader">
        <ScaleLoader loading={load} color="red" />
      </div>
    )
  }
 
  return (
    <>
      <div className="home">
          <div className="search-ope rounded-2">
           <input type="search" className="form-control bg-transparent border-0" onChange={(e)=>{setsearch(e.target.value)}} placeholder={text} onKeyDown={e=>e.key === 'Enter' && searchitem()} />
            <button type="submit" className="btn btn-danger me-3"  onClick={searchitem}>Search</button>
          </div>
      <TypeAnimation
            sequence={[
              ()=>settext('Search Recipes Pasta'),
              1500,
              ()=>settext('Search Recipes Noodles'),
              1500,
              ()=>settext('Search Recipes Pizza'),
              1500,
              ()=>settext('Search Recipes Soup'),
              1500,
              
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
      />

      </div>
      
      <Container className="my-5">
        <h1 className="text-center">Discover Recipes</h1>
        <p className="text-center pb-5">Explore our latest recipes, from quick snacks to hearty meals and indulgent desserts.</p>
        
      <div className="mb-1">
        <div className="btn-group  gap-lg-5 gap-md-3 d-flex flex-wrap w-100 px-5" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check  " name="btnradio" id="btnradio1"  defaultChecked  onChange={()=>{setsortdish('')}}/>
        <label className="btn btn-outline-danger my-1 rounded-5" htmlFor="btnradio1">All Recipes</label>

        <input type="radio" className="btn-check " name="btnradio" id="btnradio6" onChange={()=>{setsortdish('breakfast')}} />
        <label className="btn btn-outline-danger my-1 rounded-5" htmlFor="btnradio6">Breakfast</label>

        <input type="radio" className="btn-check  " name="btnradio" id="btnradio2" onChange={()=>{setsortdish('lunch')}} />
        <label className="btn btn-outline-danger my-1 rounded-5" htmlFor="btnradio2">Lunch</label>
        
        <input type="radio" className="btn-check " name="btnradio" id="btnradio3" onChange={()=>{setsortdish('dinner')}} />
        <label className="btn btn-outline-danger my-1 rounded-5" htmlFor="btnradio3">Dinner</label>

        <input type="radio" className="btn-check " name="btnradio" id="btnradio4" onChange={()=>{setsortdish('snack')}} />
        <label className="btn btn-outline-danger my-1 rounded-5" htmlFor="btnradio4">Snack</label>

        <input type="radio" className="btn-check " name="btnradio" id="btnradio5" onChange={()=>{setsortdish('dessert')}} />
        <label className="btn btn-outline-danger my-1 rounded-5" htmlFor="btnradio5">Dessert</label>

      </div>
      </div>

        <Row>
          {
            recipe.length > 0 ? recipe && recipe.map((val,i)=>{
              const issaved = data.some((item)=>item.id  === val.id);

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
            }) : <Image src={require('../components/notfound.jpg')} className="error" fluid />
          }
          {
            recipe.length >= 8 ? <div className="text-center">
            <Button variant="outline-danger" onClick={()=>{setlimit(limit+4)}}>View more recipes <MdExpandMore /></Button>
          </div> : null
          }
        </Row>
      </Container>
    </>
  );
}

export default Home;
