import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from './Todo'

describe('<Todo/>', () => {
  test('renders content', () => {
    const todo = {
      text: 'Component testing is done with react-testing-library',
      done: false,
    }

    render(<Todo todo={todo} />)

    const title = screen.getByText(
      'Component testing is done with react-testing-library'
    )
    const status = screen.getByText('This todo is not done')
    const setAsDoneButton = screen.getByText('Set as done')

    expect(title).toBeDefined()
    expect(status).toBeDefined()
    expect(setAsDoneButton).toBeDefined()
  })

  test('clicking the button calls event handler once', async () => {
    const todo = {
      text: 'Testing during the build process',
      done: false,
    }

    const mockHandler = jest.fn()

    render(<Todo todo={todo} completeTodo={mockHandler} />)

    const user = userEvent.setup()
    const setAsDoneButton = screen.getByText('Set as done')
    await user.click(setAsDoneButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('The correct todo status is rendered', async () => {
    const todo = {
      text: 'Testing during the build process',
      done: true,
    }

    render(<Todo todo={todo} />)

    const status = screen.getByText('This todo is done')
    const deleteButton = screen.getByText('Delete')

    expect(status).toBeDefined()
    expect(deleteButton).toBeDefined()
  })
})
