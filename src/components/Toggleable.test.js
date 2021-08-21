import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
  let component
  const buttonLabel = 'show'

  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel={buttonLabel}>
        <div className='testDiv'>testDivContent</div>
      </Toggleable>)
  })

  test('after clicking its children must be show', () => {
    const el = component.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')

    const button = component.getByText(buttonLabel)
    fireEvent.click(button)

    expect(el.parentNode).not.toHaveStyle('display: none')

    const cancelButton = component.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(el.parentNode).toHaveStyle('display: none')
  })
})
