import React from "react";
import axios from "axios";

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            error: {},
            photo: null

        }
        this.handleFileSelectChange = this.handleFileSelectChange.bind(this);
        this.handleProfilePhotoUpload = this.handleProfilePhotoUpload.bind(this);
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        axios.get(`http://localhost:90/profile/${localStorage.getItem('user_id')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                this.setState({
                    user: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    handlePasswordUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:90/updatePassword/${localStorage.getItem('user_id')}`, this.state, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.success === true) {
                    window.location.href = "/"
                    localStorage.clear();
                    alert('Password updated successfully!')
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }


    handleProfilePhotoUpload = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('photo', this.state.photo);
        axios.put(`http://localhost:90/updateImage/${localStorage.getItem('user_id')}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.data.success === true) {
                    alert('Profile photo updated successfully!')
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    handleFileSelectChange = (e) => {
        e.preventDefault()
        this.setState({
            photo: e.target.files[0]
        })
    }


    handleProfileUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:90/update/${localStorage.getItem('user_id')}`, this.state, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response.data)
                    this.setState({
                        user: response.data.data
                    })
                    alert("Profile Updated Successfully");
                }
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


    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mt-5">
                            <h2 className=" text-capitalize text-dark font-weight-bolder">Account</h2>
                            <h6 className=" text-dark text-capitalize font-weight-bold ml-4 mt-3">Avatar</h6>
                            <img src={`http://localhost:90/uploads/${this.state.user.photo}`}
                                className="border border-dark rounded-circle" alt="profile"
                                style={{
                                    width: "100px",
                                    borderRadius: "50%",

                                }} />

                            <input type="file" name="photo" className="btn btn-primary btn-outline-info border-dark bg-transparent text-dark btn-sm ml-3 w-auto" onChange={this.handleFileSelectChange} />
                            <button className="btn btn-danger ml-2 btn-outline-info bg-transparent text-dark border-dark" onClick={this.handleProfilePhotoUpload}>Upload</button>
                            <a className="btn btn-danger ml-2 btn-outline-info bg-transparent text-dark border-dark" onClick={this.handleLogout}  ><i className="fas fa-sign-out-alt"></i></a>
                            <hr />
                            <div className="row">
                                <div className="col-sm-6">
                                    <h5 className=" text-capitalize text-dark font-weight-bolder mb-3 text-center">Profile Details</h5>
                                    <form action="">
                                        <div className="form-group">
                                            <label htmlFor="">First Name</label>
                                            <input type="text" className="form-control form-control-sm" name="firstName" onChange={this.handleChange} placeholder={this.state.user.firstName} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Last Name</label>
                                            <input type="text" className="form-control form-control-sm" name="lastName" onChange={this.handleChange} placeholder={this.state.user.lastName} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Email Address</label>
                                            <input type="text" className="form-control form-control-sm" name="email" onChange={this.handleChange} placeholder={this.state.user.email} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Username</label>
                                            <input type="text" className="form-control form-control-sm" name="username" onChange={this.handleChange} placeholder={this.state.user.username} />
                                        </div>

                                        <button className="btn btn-secondary mx-auto btn-sm" onClick={this.handleProfileUpdate}>Update Profile</button>
                                    </form>
                                </div>
                                <div className="col-sm-6">
                                    <h5 className=" text-capitalize text-dark font-weight-bolder text-center mt-2">Update Password</h5>
                                    <form action="">
                                        <div className="form-group">
                                            <label htmlFor="">Current Password</label>
                                            <input type="password" name="re-password" onChange={this.handleChange} className="form-control form-control-sm" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">New Password</label>
                                            <input type="password" name="password" onChange={this.handleChange} className="form-control form-control-sm" />
                                        </div>
                                        <button className="btn btn-secondary mx-auto btn-sm" onClick={this.handlePasswordUpdate}>Update Password</button>
                                    </form>

                                </div>

                            </div>

                        </div>


                    </div>
                </div>



            </>
        )
    }

}

export default Profile;