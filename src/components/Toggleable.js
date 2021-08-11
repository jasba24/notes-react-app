import { forwardRef, useImperativeHandle, useState } from 'react'

const Toggleable = forwardRef(({ children, buttonLabel }, ref) => {
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
          Cancelar
        </button>
      </div>
    </>
  )
})

export default Toggleable
