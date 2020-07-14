import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import GlamContext from '../context/GlamContext';
import { useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../../api/app';

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const { setCurrentUser } = React.useContext(GlamContext);
  const { params } = useRouteMatch<{ glamId: string }>();
  const { register, handleSubmit, formState, setError, clearErrors } = useForm<
    FormData
  >();
  const onSubmit = async ({ username, password }: FormData) => {
    clearErrors();
    try {
      const { token } = await login(params.glamId, username, password);
      setCurrentUser({
        glam_id: params.glamId,
        username,
        token,
      });
    } catch (err) {
      setError('username', {
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
