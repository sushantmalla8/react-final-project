import React from "react";
import axios from "axios";

class MyRecipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: [],
            recipeName: '',
            recipeDescription: '',
            category: '',
            addedBy: localStorage.getItem('username'),
            photo: null,
            error: {},
            username: localStorage.getItem('username')
        }
        this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
        this.handleImageSelect = this.handleImageSelect.bind(this);
    }

    handleImageSelect = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    }

    handlePhotoUpload = (id) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('photo', this.state.photo);
        axios.post(`http://localhost:90/recipe/upload/image/${id}`, formData)
            .then((response) => {
                console.log(response.data)
                if (response.data.success === true) {
                    this.setState({
                        photo: response.data.photo
                    })
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRecipeAdd = (e) => {
        e.preventDefault();
        axios.post('http://localhost:90/recipe/insert', this.state, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                // this.handlePhotoUpload(response.data.data._id);
                if (response.data.success === true) {
                    // this.handlePhotoUpload(response.data.data._id);
                    alert('Recipe added successfully!')
                }

            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }




    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md d-flex mx-auto">
                            <h3 className="font-weight-bolder text-dark mt-5">Add New Recipe</h3>



                        </div>
                    </div>
                    <div className="row">

                        <div className="col-sm-8 col-md">
                            <form>
                                <a href="/dashboard">Go To Dashboard</a>
                                <div className="form-group">
                                    <label className="font-weight-bold text-dark" htmlFor="">Recipe Image</label>
                                    <input type="file" className="form-control-file" onChange={this.handleImageSelect} id="" name="photo" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="" className="font-weight-bold text-dark mt">Recipe Name</label>
                                    <input type="text" className="form-control" name="recipeName" id="" aria-describedby="emailHelp" onChange={this.handleOnChange} placeholder="Enter Recipe Name" />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold text-dark" htmlFor="">Recipe Description</label>
                                    <textarea className="form-control" id="" name="recipeDescription" rows="3" onChange={this.handleOnChange} placeholder="Recipe Description"></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="font-weight-bold text-dark" htmlFor="">Recipe Category</label>
                                    <input type="text" className="form-control" name="category" onChange={this.handleOnChange} placeholder="For ex: Lunch, BreakFast, Chinese, Coffee ..." />
                                </div>
                                <div className="col-sm-6 mx-auto">
                                    <button className="btn btn-info btn-lg btn-block text-uppercase font-weight-bold border-0" onClick={this.handleRecipeAdd}>Add Recipe !</button><br />
                                </div>
                                <a href="/recipe-list" className="mx-auto col-sm-6 d-flex mx-auto l-5">Goto Recipe List</a>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyRecipe;
