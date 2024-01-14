import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { addListener } from "../../backend/models/User";
const SignUp = (props) => {
  let history = useNavigate();
  const [cred, setcred] = useState({ name: "", email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API CALLS
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.alertfun("Successfully created an Account", "primary");
    } else {
      props.alertfun("Email Already Exist", "danger");
    }
  };
  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={cred.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={cred.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={cred.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
