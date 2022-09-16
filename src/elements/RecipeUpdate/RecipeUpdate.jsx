import React from "react";
import axios from "axios";

class RecipeUpdate extends React.Component {

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
            username: localStorage.getItem('username'),
            newRecipe: {},
            recipeId: Array(window.location.pathname).pop().split('/')[2].split("=")[1]
        }
        // this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
        // this.handleImageSelect = this.handleImageSelect.bind(this);

    }

    // handleImageSelect = (e) => {
    //     this.setState({
    //         photo: e.target.files[0]
    //     })
    // }

    componentDidMount = () => {
        // console.log(localStorage.getItem("token"));
        let recipeId = this.state.recipeId
        // console.log("RecipeId", recipeId)
        axios.get(`http://localhost:90/recipe/one/${recipeId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log("Recipe: ", response.data.recipe[0])
                if (response.data.success === true) {
                    this.setState({
                        recipe: response.data.recipe[0]
                    })
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }


    // handlePhotoUpload = () => {
    //     // e.preventDefault();
    //     let id = this.state.id;
    //     const formData = new FormData();
    //     formData.append('photo', this.state.photo);
    //     axios.post(`http://localhost:90/recipe/upload/image/${id}`, formData)
    //         .then((response) => {
    //             console.log(response.data)
    //             if (response.data.success === true) {
    //                 this.setState({
    //                     photo: response.data.photo
    //                 })
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err.response.data.message)
    //         })
    // }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        let recipeId = this.state.recipeId
        console.log("RecipeId", recipeId)
        axios.post(`http://localhost:90/recipe/update/${recipeId}`, this.state, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                // this.handlePhotoUpload(response.data.data._id);
                if (response.data.success === true) {
                    // this.handlePhotoUpload(response.data.data._id);
                    alert('Recipe updated successfully!')
                }

            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }




    updateRecipe = (e) => {
        e.preventDefault();
        let recipeId = this.state.recipeId
        axios.put(`http://localhost:90/recipe/update/${recipeId}`, this.state, this.state.config)
            .then((response) => {
                alert("Recipe Updated Successfully")
                // this.forceUpdate()
                let latestRecipe = this.state.recipe.map((recipe) => {
                    if (recipe._id === recipeId) {
                        recipe = this.state
                    }
                    return recipe
                })
                this.setState({
                    recipe: latestRecipe
                });

                // this.toggle();

            }).catch((err) => console.log(err))
    }



    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md d-flex mx-auto">
                            <h3 className="font-weight-bolder text-dark mt-5">Update Recipe</h3>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-sm-8 col-md">
                            <form>
                                <a href="/dashboard">Go To Dashboard</a>
                                {/* <div className="form-group">
                                    <label className="font-weight-bold text-dark" htmlFor="">Recipe Image</label>
                                    <input type="file" className="form-control-file" onChange={this.handleImageSelect} id="" name="photo" />
                                    <button className="btn btn-success btn-sm mt-3" onClick={this.handlePhotoUpload}>Update</button>
                                </div> */}

                                <div className="form-group">
                                    <label htmlFor="" className="font-weight-bold text-dark mt">Recipe Name</label>
                                    <input type="text" className="form-control" name="recipeName" id="" aria-describedby="emailHelp" value={this.state.recipeName} onChange={this.handleOnChange} placeholder={this.state.recipe.recipeName} />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold text-dark" htmlFor="">Recipe Description</label>
                                    <textarea className="form-control" id="" name="recipeDescription" rows="3" onChange={this.handleOnChange} value={this.state.recipeDescription} placeholder={this.state.recipe.recipeDescription}></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="font-weight-bold text-dark" htmlFor="">Recipe Category</label>
                                    <input type="text" className="form-control" name="category" value={this.state.category} onChange={this.handleOnChange} placeholder={this.state.recipe.category} />
                                </div>
                                <div className="col-sm-6 mx-auto">
                                    <button className="btn btn-info btn-lg btn-block text-uppercase font-weight-bold border-0" onClick={this.handleUpdate}>Update Recipe !</button><br />
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

export default RecipeUpdate;
