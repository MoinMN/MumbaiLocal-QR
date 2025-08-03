import React from 'react'

const Searchbar = ({ searchText, setSearchText, line, setLine }) => {
  return (
    <div className='flex justify-center py-2 text-sm sm:text-base text-white'>
      <div className="bg-purple-500 rounded-xl shadow-md flex w-5/6 md:w-1/2">
        <input
          type="text"
          name="searchtext"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='border-none md:py-4 max-md:py-2 md:px-8 max-md:px-4 focus:outline-none w-full text-purple-100'
          placeholder='Type here...'
        />
        <select
          name="line"
          id="line"
          value={line}
          onChange={(e) => setLine(e.target.value)}
          className='cursor-pointer rounded-e-xl md:py-4 max-md:py-2 md:px-8 max-md:px-4 focus:outline focus:outline-purple-800'
        >
          <option
            value="All"
            className='text-black'
          >
            All
          </option>
          <option
            value="Harbour"
            className='text-black'
          >
            Harbour
          </option>
          <option
            value="Central"
            className='text-black'
          >
            Central
          </option>
          <option
            value="Western"
            className='text-black'
          >
            Western
          </option>
        </select>
      </div>
    </div>
  )
}

export default Searchbar
