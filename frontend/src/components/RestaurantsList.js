import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RestaurantDataService from '../services/restaurants'

export default function RestaurantsList(props) {
  const [restaurants, setRestaurants] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchZip, setSearchZip] = useState('')
  const [searchCuisine, setSearchCuisine] = useState('')
  const [cuisines, setCuisines] = useState(['All Cuisines'])

  useEffect(() => {
    retrieveRestaurants()
    retrieveCuisines()
  }, [])

  function onChangeSearchCuisines(e) {
    const searchCuisine = e.target.value
    setSearchCuisine(searchCuisine)
  }
  function onChangeSearchName(e) {
    const searchName = e.target.value
    setSearchName(searchName)
  }
  function onChangeSearchZip(e) {
    const searchZip = e.target.value
    setSearchZip(searchZip)
  }

  async function retrieveRestaurants() {
    try {
      const response = await RestaurantDataService.getAll()
      console.log(response.data)
      setRestaurants(response.data.restaurants).catch(e => console.log(e))
    } catch (err) {
      console.log(err)
    }
  }

  async function retrieveCuisines() {
    try {
      const response = await RestaurantDataService.getCuisines()
      console.log(response.data)
      setCuisines(['All Cuisines'].concat(response.data))
    } catch (err) {
      console.log(e)
    }
  }

  function refreshList() {
    retrieveRestaurants()
  }

  async function find(query, by) {
    try {
      const response = await RestaurantDataService.find(query, by)
      console.log(response.data)
      setRestaurants(response.data.restaurants)
    } catch (err) {
      console.log(e)
    }
  }

  function findByName() {
    find(searchName, 'name')
  }

  function findByZip() {
    find(searchZip, 'zipcode')
  }
  
  function findByCuisine() {
    if (searchCuisine == 'All Cuisines') {
      refreshList()
    } else {
      find(searchCuisine, 'cuisine')
    }
  }

  return (
    <div>
      <div className='row pb-1'>
        <div className='col-lg-4 input-group-text'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='ms-2'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByName}>
              Search
            </button>
          </div>
        </div>

        <div className='col-lg-4 input-group-text'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by zip'
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className='ms-2'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByZip}>
              Search
            </button>
          </div>
        </div>

        <div className='col-lg-4 input-group-text'>
          <select onChange={onChangeSearchCuisines}>
            {cuisines.map((cuisine, index) => {
              return (
                <option key={index} value={cuisine}>
                  {cuisine.substr(0, 20)}
                </option>
              )
            })}
          </select>
          <div className='ms-2'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByCuisine}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className='row'>
        {restaurants.map(restaurant => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`
          return (
            <div className='col-lg-4 pb-1' key={restaurant._id}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{restaurant.name}</h5>
                  <p className='card-text'>
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className='row'>
                    <Link
                      to={'/restaurants/' + restaurant._id}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'>
                      View Reviews
                    </Link>
                    <a
                      target='_blank'
                      href={'https://www.google.com/maps/place/' + address}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'>
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
