import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { PersonList } from './App'
import '@testing-library/jest-dom/extend-expect'

const personList = [
  {
    name: 'Alex',
    number: '0123456789'
  },
  {
    name: 'Mary',
    number: '0987654321'
  }
]

describe('<PersonList />', () => {
  it('should render persons', () => {
    const component = render(
      <div>
        <PersonList persons={personList}/>
      </div>
    )
    expect(component.container).toHaveTextContent('Alex')
    expect(component.container).toHaveTextContent('0123456789')
    expect(component.container).toHaveTextContent('Mary')
    expect(component.container).toHaveTextContent('0987654321')
  })

  it('clicking the remove button calls deletePerson handler once', () => {
    const deletePersonHandler = jest.fn()
    const component = render(
      <div>
        <PersonList persons={personList} deletePerson={deletePersonHandler} />
      </div>
    )
    const button = component.getAllByText('poista')[0]
    fireEvent.click(button)

    expect(deletePersonHandler.mock.calls).toHaveLength(1)
  })
})