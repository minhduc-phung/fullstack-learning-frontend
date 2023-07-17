import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('Togglable component', () => {
  let container
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="Show">
        <div className="testDiv">Togglable Content</div>
      </Togglable>
    ).container
  })

  test('Renders its children', async () => {
    await screen.findAllByText('Togglable Content')
  })

  test('At start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('After clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
