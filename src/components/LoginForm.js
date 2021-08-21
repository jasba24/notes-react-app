import Toggleable from './Toggleable'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) => (
  <Toggleable buttonLabel='Show Login'>
    <form data-test-id='login-form' onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={handlePasswordChange}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  </Toggleable>
)

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm
