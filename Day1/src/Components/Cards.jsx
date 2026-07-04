import React from 'react'
import EmpCard from './EmpCard';

const Cards = ({ employees }) => {
    console.log(employees);

    return (
        <>
            {
                employees.map((emp) => (
                    <EmpCard key={emp.id} emp={emp}/>
                ))
            }
        </>
    )
}

export default Cards;