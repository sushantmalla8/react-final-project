import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './List.css';

class RecipeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: [],
            username: localStorage.getItem('username')
        }
    }



    componentDidMount = () => {
        axios.get(`http://localhost:90/recipe/${this.state.username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.success === true) {
                    this.setState({
                        recipe: response.data.data
                    })
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    handleDelete = (recipeID) => {
        axios.delete(`http://localhost:90/recipe/delete/${recipeID}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.success === true) {
                    alert("Recipe Deleted Successfully");
                    // this.setState({
                    //     recipe: this.state.recipe.filter(recipe => recipe._id !== recipeId)
                    // })
                }
            }).catch((err) => console.log(err))
    }





    render() {
        return (
            <div className="container mt-5">

                <div className="row">

                    <div className="col-sm-12">

                        <h3>All Recipe List</h3><hr />
                        <h5>Recipe Added</h5>

                        <a href="/my-recipe">Back to Add Recipe Page </a> |
                        <a href="/dashboard"> Go To Dashboard</a>


                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>Recipe Name</th>
                                    <th>Category</th>
                                    <th>Added By</th>
                                    <th>Description</th>
                                    <th>Action Type</th>
                                </tr>
                            </thead>
                            <tbody>


                                {this.state.recipe && (this.state.recipe).map((item, index) => {
                                    return (
                                        <tr>
                                            <td className="cell">{item.recipeName}</td>
                                            <td className="cell">{item.category}</td>
                                            <td className="cell">{item.addedBy}</td>
                                            <td className="cell">{item.recipeDescription}</td>
                                            {/* <td className="cell"><img src={`http://localhost:90/uploads/${item.photo}`} alt="" /></td> */}

                                            <td className="cell">
                                                <Link to={{
                                                    pathname: `/recipe-edit/recipeId=${item._id}`,
                                                    state: {
                                                        recipe: "data passed"
                                                    }
                                                }}><i className="fas fa-edit one"></i></Link>
                                                <a href=""
                                                    onClick={() => {
                                                        if (window.confirm(`Are you sure to delete this job?`))
                                                            this.handleDelete(item._id)
                                                    }}><i className="fas fa-trash one"></i></a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}


export default RecipeList;