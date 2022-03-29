import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import RestaurantDataService from '../services/restaurants'

export default function Addreview(props) {
  let initialReviewState = ''
  let editing = false
  const location = useLocation()
  console.log('location.state', location.state)

  let { id } = useParams()

  if (location.state && location.state.currentReview) {
    editing = true
    initialReviewState = location.state.currentReview.text
  }
  const [review, setReview] = useState(initialReviewState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = e => {
    setReview(e.target.value)
  }
  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id,
    }
    if (editing) {
      data.review_id = location.state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(res => {
          setSubmitted(true)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    } else {
      RestaurantDataService.createReview(data)
        .then(res => {
          setSubmitted(true)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div>
      {props.user ? (
        <div className='submit-form'>
          {submitted ? (
            <div>
              <h4>You submitted successfully</h4>
              <Link to={'/restaurants/' + id} className='btn btn-success'>
                Back to restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className='form-group'>
                <label htmlFor='description'>
                  {editing ? 'Edit' : 'Create'} Review
                </label>
                <input
                  type='text'
                  className='form-control'
                  required
                  value={review}
                  onChange={handleInputChange}
                  name='text'
                />
              </div>
              <button onClick={saveReview} className='btn btn-success'>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in first</div>
      )}
    </div>
  )
}
