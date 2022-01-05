import apiClient from './apiClient'

const baseUrl = `/api/persons`

const getAll = () => {
  const req = apiClient.get(baseUrl)
  return req.then(response => response.data)
}

const create = (newObject) => {
  const req = apiClient.post(baseUrl, newObject)
  return req.then(response => response.data)
}

const remove = (id) => {
  const req = apiClient.delete(`${baseUrl}/${id}`)
  return req.then(response => response.data)
}

const update = (newPerson) => {
  const req = apiClient.put(`${baseUrl}/${newPerson.id}`, newPerson)
  return req.then(response => response.data)
}


export default { getAll, create, remove, update }