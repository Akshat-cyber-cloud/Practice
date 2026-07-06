import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import { useEffect } from 'react';


const FormRef1 = () => {
    const nameRef = useRef();
    const rollRef = useRef();
    const departmentRef = useRef();

    const[students, setStudents] = useState(() => {
        const savedStudent = localStorage.getItem("students");
        return savedStudent ? JSON.parse(savedStudent) : []
    });

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    },[students]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newStudent = {
            name: nameRef.current.value,
            roll: rollRef.current.value,
            department: departmentRef.current.value
        };

        setStudents([...students, newStudent]);

        nameRef.current.value = "";
        rollRef.current.value = "";
        departmentRef.current.value = "";
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                ref={nameRef}
                placeholder='Enter Name'
            />

            <br /><br />

            <input 
                ref={rollRef}
                placeholder='Enter RollNumber'
            />

            <br /><br />

            <input 
                ref={departmentRef}
                placeholder='Enter the Departemnt'
            />

            <button>Add Student Data</button>
        </form>

        <hr />

        <h2>Registered Students</h2>

        {
            students.map((stud,index) => (
                <div key={index}>
                    {stud.name}
                    {stud.roll}
                    {stud.department}
                    <hr />
                </div>
            ))
        }
    </div>
  )
}

export default FormRef1


// Same stuff with UseState 

/** 
import { useState } from "react";

function StudentForm() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const [student, setStudent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setStudent({
      name,
      roll,
    });

    setName("");
    setRoll("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />

        <br /><br />

        <input
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          placeholder="Enter Roll"
        />

        <br /><br />

        <button>Submit</button>
      </form>

      <hr />

      {student && (
        <>
          <h3>Name: {student.name}</h3>
          <h3>Roll: {student.roll}</h3>
        </>
      )}
    </>
  );
}

*/