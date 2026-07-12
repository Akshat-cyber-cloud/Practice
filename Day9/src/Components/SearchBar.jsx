import React from 'react'

const SearchBar = ({searchTerm,setSearchTerm}) => {
  return (
    <div>
        <input 
            type='text'
            placeholder='Type in the name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
  )
}

export default SearchBar