
import React from "react";
class Contact extends React.Component {


    render() {
        return (

            <>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md d-flex mx-auto">
                            <h1 className="font-weight-bolder text-dark mt-5">Contact Me !</h1>

                        </div>

                    </div>
                    <label htmlFor="" className="font-weight-bolder text-dark">Email: info@merorecipe.com.np</label> <br />
                    <label htmlFor="" className="font-weight-bolder text-dark">Phone No: 01-xxx-xxx-xx</label><br />
                    <label htmlFor="" className="font-weight-bolder text-dark">Location: Kathmandu, Nepal - 44600</label><br /><br /><br />
                    <label htmlFor="" className="font-weight-bolder text-dark">Thank Your For Contacting With Us !</label>

                </div>
            </>

        );
    }
}
export default Contact;