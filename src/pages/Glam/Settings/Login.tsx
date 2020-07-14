import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useForm } from 'react-hook-form';
import { GlamAuthContext } from '../../../lib/glamAuth';

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const { login } = React.useContext(GlamAuthContext);
  const {
    register,
    handleSubmit,
    formState,
    errors,
    setError,
    clearErrors,
  } = useForm<FormData>();
  const onSubmit = async ({ username, password }: FormData) => {
    clearErrors();
    try {
      await login(username, password);
    } catch (err) {
      setError('username', {
        message: 'Bad username or password',
        type: 'Bad login',
      });
      setError('password', {
        message: 'Bad username or password',
        type: 'Bad login',
      });
    }
  };
  return (
    <Box p={4}>
      <Box mb={3}>
        <Typography variant='h6' component='h6'>
          Login
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <TextField
            error={!!errors.username}
            autoFocus
            margin='dense'
            id='username'
            name='username'
            label='Username'
            variant='outlined'
            type='text'
            fullWidth
            required
            inputRef={register}
            disabled={formState.isSubmitting}
          />
          <TextField
            error={!!errors.password}
            margin='dense'
            id='password'
            name='password'
            label='Password'
            variant='outlined'
            type='password'
            fullWidth
            required
            inputRef={register}
            disabled={formState.isSubmitting}
          />
          {errors.username && (
            <Typography variant='body1' component='p' color='error'>
              Bad username or password
            </Typography>
          )}
        </Box>
        <Button
          color='primary'
          variant='contained'
          type='submit'
          disabled={formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
