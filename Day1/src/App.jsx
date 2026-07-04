import React from 'react';
import Cards from './Components/Cards';

const App = () => {

  // const products = [
  //   {
  //     id: 1,
  //     name: "Laptop",
  //     price: 55000,
  //     inStock: true,
  //     image: "null"
  //   },
  //   {
  //     id: 2,
  //     name: "Cell Phone",
  //     price: 30000,
  //     inStock: false,
  //     image: "null"
  //   },
  //   {
  //     id: 3,
  //     name: "HeadPhones",
  //     price: 3000,
  //     inStock: true,
  //     image: "null"
  //   }
  // ];


  const employees = [
    {
      id: 1,
      name: "Akshat",
      role: "Frontend Developer",
      salary: 80000,
      experience: 2,
      isRemote: true
    },
    {
      id: 2,
      name: "Rahul",
      role: "Backend Developer",
      salary: 100000,
      experience: 5,
      isRemote: true
    },
    {
      id: 3,
      name: "Priya",
      role: "UI/UX Enginner",
      salary: 70000,
      experience: 1,
      isRemote: false
    }
  ];

  return(
    <>
    <Cards employees = {employees} />
    </>
  )
}

export default App;