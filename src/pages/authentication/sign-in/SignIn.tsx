import React, { useState } from 'react';
import { Form, Button, Panel, Stack, Divider } from 'rsuite';
import Brand from '@/components/Brand';
import { logIn } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/data/userSlice';
import { authPayload } from '@/http/types';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authQuery = useQuery({
    onSuccess: (data: authPayload) => {
      const isAdmin = data.user.roles.includes('ADMIN');
      dispatch(setUser({ isAdmin, name: data.user.name }));
      if (!isAdmin) {
        navigate('/folders');
      } else {
        navigate('/');
      }
    },
    queryKey: ['login'],
    queryFn: () => logIn(formValue.login, formValue.password).then(data => data),
    enabled: false
  });

  const [formValue, setFormValue] = useState({
    login: '',
    password: ''
  });
  const signInHandler = () => {
    authQuery.refetch();
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >
      <Brand style={{ marginBottom: 10 }} />

      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Вход</h3>}>
        {/* <p style={{ marginBottom: 10 }}>
          <span className="text-muted">New Here? </span>{' '}
          <Link to="/sign-up"> Create an Account</Link>
        </p> */}
        <Form fluid formValue={formValue} onChange={setFormValue}>
          <Form.Group>
            <Form.ControlLabel>Логин</Form.ControlLabel>
            <Form.Control name="login" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>
              <span>Пароль</span>
              {/* <a style={{ float: 'right' }}>Forgot password?</a> */}
            </Form.ControlLabel>
            <Form.Control name="password" type="password" />
          </Form.Group>
          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" onClick={signInHandler}>
                Войти
              </Button>
              {/* <Stack spacing={6}>
                <IconButton icon={<WechatIcon />} appearance="subtle" />
                <IconButton icon={<GithubIcon />} appearance="subtle" />
                <IconButton icon={<FacebookIcon />} appearance="subtle" />
                <IconButton icon={<GoogleIcon />} appearance="subtle" />
              </Stack> */}
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default SignUp;
