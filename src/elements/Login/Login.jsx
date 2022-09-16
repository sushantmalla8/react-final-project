import React from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            error: {},
            required: true
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        let errors = this.state.error;
        if (e.target.name === 'username') {
            errors.username = e.target.value.length < 3 ? 'Username must be at least 3 characters long!' : '';
        }
        if (e.target.name === 'password') {
            errors.password = e.target.value.length < 6 ? 'Password must be at least 6 characters long!' : '';
        }
    }

    userLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:90/login', this.state)
            .then((response) => {
                console.log(response.data)

                if (response.data.success === true) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("user_id", response.data.data._id)
                    localStorage.setItem("username", response.data.data.username)
                    this.setState({ isLoggedIn: true, error: false })
                }

            }).catch((err) =>
                // alert(err.response.data.message)
                console.log(err.response.data.message)
            )
    }



    render() {

        if (this.state.isLoggedIn === true) {
            return <Navigate to="/dashboard" />
        }
        return (
            <div>
                <div class="container small">
                    <div class="row">
                        <div class="col-xl-10 col-lg-12 col-md-9">
                            <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col-lg-5 d-none d-lg-block bg-loginn-image"></div>
                                        <div class="col-lg-7">
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                    <p className="mb-2 text-black-50">Please enter following credentials to continue... </p>
                                                </div>
                                                <form class="user">
                                                    <div class="form-group">
                                                        <input type="email" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address" name='username' required={this.state.required} value={this.state.username} onChange={this.handleChange} />
                                                        <i className="small text-danger">{this.state.error.username}</i>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="password" class="form-control form-control-user"
                                                            id="exampleInputPassword" placeholder="Password" name="password" required value={this.state.password} onChange={this.handleChange} />
                                                        <i className="small text-danger">{this.state.error.password}</i>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="custom-control custom-checkbox small">
                                                            <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                            <label class="custom-control-label" for="customCheck">Remember
                                                                Me</label>
                                                        </div>
                                                    </div>


                                                    <div class="row button">
                                                        <input type="submit" value="Login" onClick={this.userLogin} class="btn btn-success btn-user btn-block text-uppercase font-weight-bold" />
                                                    </div>

                                                </form>

                                                <hr />
                                                <div class="text-center">
                                                    {/* <a class="small" href="forgot-password.html">Forgot Password?</a> */}
                                                </div>
                                                <div class="text-center">
                                                    <a class="small" href="register">Create an Account!</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Login;