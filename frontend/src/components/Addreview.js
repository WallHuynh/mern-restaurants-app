import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import RestaurantDataService from '../services/restaurants'

export default function Addreview(props) {
  let initialReviewState = ''
  let editing = false
  const [review, setReview] = useState(initialReviewState)
  const [submitted, setSubmitted] = useState(false)
  let { id } = useParams()
  const location = useLocation()

  console.log('location.state', location.state)

  if (location.state && location.state.currentReview) {
    editing = true
    initialReviewState = location.state.currentReview.text
  }

  const handleInputChange = e => {
    setReview(e.target.value)
  }

  const saveReview = async () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id,
    }
    if (editing) {
      try {
        data.review_id = location.state.currentReview._id
        const res = await RestaurantDataService.updateReview(data)
        setSubmitted(true)
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const res = await resRestaurantDataService.createReview(data)
        setSubmitted(true)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
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
