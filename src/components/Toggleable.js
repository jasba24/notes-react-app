import { useState } from 'react'

const Toggleable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  return (
    <>
      <button
        style={hideWhenVisible}
        onClick={() => setVisible(true)}
      >
        {buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>Cancelar</button>
      </div>
    </>
  )
}

export default Toggleable
