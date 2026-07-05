import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    console.log(formData);
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "50px auto",
        fontFamily: "Arial",
      }}
    >
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div style={{ marginTop: "30px" }}>
          <h2>Submitted Data</h2>

          <p>
            <strong>Name:</strong> {formData.name}
          </p>

          <p>
            <strong>Email:</strong> {formData.email}
          </p>

          <p>
            <strong>Password:</strong> {formData.password}
          </p>

          <p>
            <strong>Age:</strong> {formData.age}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;