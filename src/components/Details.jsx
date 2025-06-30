import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { IoIosTimer } from "react-icons/io";
import { GiWorld,GiCook } from "react-icons/gi";
import { TbToolsKitchen3 } from "react-icons/tb";
import { LuCookingPot } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
import { ScaleLoader } from "react-spinners";
function Details() {
  const param = useParams();
  const [recipe, setrecipe] = useState({});
  const [load,setload] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setload(false)  
    },1000)
    
    fetch(`https://dummyjson.com/recipes/${param.id}`)
      .then((res) => res.json())
      .then((data) => setrecipe(data));
  }, [param.id]);


  if(load){
    return(
      <div className="loader">
        <ScaleLoader loading={load} color="red" />
      </div>
    )
  }
  return (
    <>
      <Container className="my-5">
        <Link className="nav-link text-end" to="/"><IoHome /> Home</Link>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Image src={recipe.image} className=" rounded-3 mt-3" fluid />
          </Col>
          <Col lg={6} md={12} sm={12}>
            
            <div className="shadow-sm bg-secondary-subtle p-4 mt-3">
                <div className="d-flex flex-wrap gap-4  text-danger fw-bold">
                    {
                        recipe.tags?.map((ano,i)=>{
                            return(
                                <p>{ano}</p>
                            )
                        })
                    }
                </div>
                <h1 className="mt-0 mb-3">{recipe.name}</h1>
                <div className=" d-flex flex-wrap gap-3 justify-content-between">
                <div><IoIosTimer /> {recipe.cookTimeMinutes} min <br /> <small>Cooking Time</small></div>
                <div><GiWorld /> {recipe.cuisine}  <br /> <small>Cuisine</small></div>
                <div><TbToolsKitchen3 /> Serves {recipe.servings} <br /> <small>Serving</small></div>
                <div><GiCook/> {recipe.difficulty} <br /> <small>Degree of Difficulty</small></div>
            </div>
            </div>

            <div className=" shadow-sm p-3 my-4  bg-secondary-subtle">
                <h1>Ingredients</h1>
                <ul>
                    {
                       recipe.ingredients?.map((ing,i)=>{
                        return(
                            <li className="my-3 fs-5" key={i}>{ing}</li>
                        )
                       }) 
                    }
                </ul>
            </div>
          </Col>
        </Row>
        <Row className="my-3  ">
            <Col className="p-4 shadow-sm bg-secondary-subtle">
                <h1>Instructions <LuCookingPot /></h1>
                <ul>
                    {
                    recipe.instructions?.map((ins,i)=>{
                        return(
                            <li className="my-3 fs-5" key={i}>{ins}</li>
                        )
                    })
                }
                </ul>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default Details;
