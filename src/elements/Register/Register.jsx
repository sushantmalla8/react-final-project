import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            // photo: '',
            error: {},
            isRegistered: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        let errors = this.state.error;
        switch (e.target.name) {
            case 'firstName':
                errors.firstName = e.target.value.length < 3 ? 'First name must be at least 3 characters long!' : '';
                break;
            case 'lastName':
                errors.lastName = e.target.value.length < 3 ? 'Last name must be at least 3 characters long!' : '';
                break;
            case 'username':
                errors.username = e.target.value.length < 3 ? 'Username must be at least 3 characters long!' : '';
                break;
            case 'email':
                errors.email = e.target.value.length < 3 ? 'Email must be at least 3 characters long!' : '';
                break;
            case 'password':
                errors.password = e.target.value.length < 6 ? 'Password must be at least 6 characters long!' : '';
                break;
            default:
                errors.password = "";
                break;


        }
    }

    registerUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:90/register/', this.state)
            .then((response) => {
                if (response.data.success === true) {

                    console.log(response.data);
                    localStorage.setItem('token', response.data.token)
                    this.setState({
                        firstName: '',
                        lastName: '',
                        username: '',
                        email: '',
                        password: '',
                        photo: '',
                        isRegistered: true
                    })
                }
            }).catch((err) => console.log(err))
    }

    render() {
        if (this.state.isRegistered === true) {
            return <Navigate to="/" />
        }
        return (
            <div>
                <div class="container small">

                    <div class="card o-hidden border-0 shadow-sm my-5">
                        <div class="card-body p-0">

                            <div class="row">
                                <div class="col-lg-5 d-none d-lg-block bg-registerr-image"></div>
                                <div class="col-lg-7">
                                    <div class="p-3">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                                            <h1 class="h5 small text-gray-900 mb-4">Create an account for exploring more features!</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <div class="mb-3 mb-sm-0">
                                                    <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                        placeholder="First Name" name='firstName' value={this.state.firstName} required onChange={this.handleChange} />
                                                    <i className="small text-danger">{this.state.error.firstName}</i>
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <div class="mb-3 mb-sm-0">
                                                    <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                        placeholder="Last Name" name='lastName' value={this.state.lastName} required onChange={this.handleChange} />
                                                    <i className="small text-danger">{this.state.error.lastName}</i>
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <div class="mb-3 mb-sm-0">
                                                    <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                        placeholder="Username" name='username' value={this.state.username} required onChange={this.handleChange} />
                                                    <i className="small text-danger">{this.state.error.username}</i>
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Email Address" name='email' value={this.state.email} required onChange={this.handleChange} />
                                                <i className="small text-danger">{this.state.error.email}</i>

                                            </div>
                                            <div class="form-group row">
                                                <div class="col-sm-12">
                                                    <input type="password" class="form-control form-control-user"
                                                        id="exampleRepeatPassword" placeholder="Password" name='password' value={this.state.password} onChange={this.handleChange} required />
                                                    <i className="small text-danger">{this.state.error.password}</i>
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <input class="btn btn-success btn-user btn-block" type="submit" value="Register" onClick={this.registerUser} />
                                            </div>


                                        </form>
                                        <hr />
                                        {/* <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div> */}
                                        <div class="text-center">
                                            <a class="small" href="/">Already have an account? Login!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register;