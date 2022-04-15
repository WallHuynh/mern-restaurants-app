import axios from '../http-common'

class RestaurantDataService {
  getAll(page = 0) {
    return axios.get(`?page=${page}`)
  }
  get(id) {
    return axios.get(`/id/${id}`)
  }
  find(query, by = 'name', page = 0) {
    return axios.get(`?${by}=${query}&page=${page}`)
  }
  createReview(data) {
    return axios.post('/review', data)
  }
  updateReview(data) {
    return axios.put('/review', data)
  }
  deleteReview(id, userId) {
    return axios.delete(`/review?id=${id}`, { data: { user_id: userId } })
  }
  getCuisines(id) {
    return axios.get('/cuisines')
  }
}
export default new RestaurantDataService()
