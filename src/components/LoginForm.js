import Toggleable from './Toggleable'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) => (
  <Toggleable buttonLabel='Show Login'>
    <form onSubmit={handleSubmit}>
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

export default LoginForm
