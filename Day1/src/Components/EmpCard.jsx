import React from 'react'

const EmpCard = ({emp}) => {
    console.log(emp);
    return (

        <div className='box'>
            <div className='boxes'>
                <h1>Name: {emp.name} </h1>
                <h2>Role: {emp.role}</h2>
                <h3>Salary: {emp.salary}</h3>

                {
                    emp.experience >= 3
                        ? <h3> ⭐ Senior Developer </h3>
                        : <h3> 🌱 Junior Developer </h3>
                }

                {
                    emp.isRemote
                        ? <h3>Remote Job</h3>
                        : <h3>Office </h3>
                }
            </div>
        </div>
    )
}

export default EmpCard