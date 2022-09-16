import React from "react";
import Image from "./login.jpg"
import axios from "axios";
class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            recipe: [],
            error: {},
            username: localStorage.getItem('username')
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:90/recipe/getAll`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(this.state.recipe)
                this.setState({
                    recipe: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    handleLogout = (e) => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            window.location.href = "/";
        } else {
            return false;
        }
    }

    handleFavorite = (id) => {
        axios.post(`http://localhost:90/update/toFav/${id}/`, this.state, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

            .then((response) => {
                console.log(response.data)
                if (response.data.success === true) {
                    alert('Recipe added to favorite list!')
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }


    render() {
        return (


            <div className="container">
                <div className="row">


                    <div className="col-sm-7">
                        <div className="row">
                            <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
                                <div className="navbar-brand pt-2">
                                    <label class="text-black pl-5 font-weight-bolder text-black-50" href="#">Mero
                                    </label> <label class="navbar-brand text-success font-weight-bolder " href="#" htmlFor="">Recipe</label>
                                </div>

                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div class="navbar-nav">
                                        <a class="nav-item nav-link active font-weight-bolder text-black-50" href="/dashboard">Home <span class="sr-only">(current)</span></a>

                                        <a class="nav-item nav-link font-weight-bolder" href="/my-recipe">MyRecipe</a>
                                        <a class="nav-item nav-link font-weight-bolder text-black-50" href="/contact">Contact</a>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                More
                                            </a>
                                            <div class="dropdown-menu border-0" aria-labelledby="navbarDropdownMenuLink">
                                                <a class="dropdown-item" href="/profile">Profile</a><hr />
                                                <a class="dropdown-item" href="" onClick={this.handleLogout}>Logout</a>

                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="container">
                            <div className="col-md-5">
                                <div className="card border-0">
                                    <div className="card-body">
                                        <h1 className=" text-capitalize text-dark font-weight-bolder">Let's Start</h1>
                                        <h1 className=" text-capitalize text-dark font-weight-bolder">Cooking with </h1>
                                        <h1 className=" text-capitalize text-dark font-weight-bolder">Popular Recipe</h1>

                                    </div>
                                </div>
                                <div className="col-sm-">
                                    <button className="btn btn-info btn-lg btn-block text-uppercase font-weight-bold border-0">Explore Recipe !</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 mt-5">
                        <img src={Image} alt="" className="img-fluid card-img" />
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row flex">
                        <div className="col-sm-12">
                            <h4 className="text-dark font-weight-bolder mb-5">Recipe from other people</h4>
                            <ul class="nav justify-content-center">
                                {this.state.recipe && (this.state.recipe).map((item, index) => {
                                    return (
                                        <div class="card w-25 m-2">
                                            <img class="card-img-top img-fluid img-thumbnail" style={{
                                                height: "200px",
                                            }} src={`http://localhost:90/uploads/${item.photo}`} alt="Card image cap" />
                                            <div class="card-body">
                                                <h5 class="card-title text-dark font-weight-bolder">{item.recipeName}</h5>
                                                <p class="card-text text-dark font-weight-bold small">{item.recipeDescription}</p>
                                                <p class="card-text text-dark font-weight-bold small">{item.category}</p>
                                                <p class="card-text text-dark font-weight-bold small">{(item.addedBy !== localStorage.getItem('username')) ? item.addedBy : `You : ${item.addedBy}`}</p>
                                                {/* <a href="#" class="btn btn-primary btn-sm small" onClick={this.handleFavorite(item._id)}><i className="fas fa-heart"></i></a> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// {this.state.recipe && (this.state.recipe).map((item, index) => {
//     return (
//         <div class="card mt-3 w-25">
//             <img class="card-img-top img-fluid img-thumbnail" style={{
//                 height: "200px",
//             }} src={`http://localhost:90/uploads/${item.photo}`} alt="Card image cap" />
//             <div class="card-body">
//                 <h5 class="card-title">{item.recipeName}</h5>
//                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                 <a href="#" class="btn btn-primary">Go somewhere</a>
//             </div>
//         </div>
//     )
// })}

export default Dashboard;