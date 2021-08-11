import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '../i18n'

const Toggleable = forwardRef(({ children, buttonLabel = 'Show' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(
    ref,
    () => ({
      toggleVisibility
    })
  )
  return (
    <>
      <button
        style={hideWhenVisible}
        onClick={toggleVisibility}
      >
        {buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>
          {i18n.TOGGABLE.CANCEL_BUTTON}
        </button>
      </div>
    </>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Toggleable
