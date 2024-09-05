import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { UserLoginDto } from 'src/sevices/DTOs/user-login-dto';
import AuthenService from 'src/sevices/api/auth-services';
import { setSession } from 'src/auth/context/jwt/utils';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState<UserLoginDto>({});

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const handleLogin = async () => {
    console.log(userLogin);
    const authenService = new AuthenService();
    const res = await authenService.Login(userLogin);
    if (res.isSucceeded) {
      setSession(res.data?.accessToken);
      router.push(returnTo || PATH_AFTER_LOGIN);
    } else {
      setErrorMsg(res.message ?? '');
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Minimal</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField
        name="email"
        label="Email address"
        value={userLogin.username ?? ''}
        onChange={(e) => {
          setUserLogin({
            ...userLogin,
            username: e.target.value,
          });
        }}
      />

      <RHFTextField
        onChange={(e) => {
          setUserLogin({
            ...userLogin,
            password: e.target.value,
          });
        }}
        value={userLogin.password ?? ''}
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Quên mật khẩu ?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        onClick={async (e) => {
          e.preventDefault();
          await handleLogin();
        }}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={() => {}}>
        {renderForm}
      </FormProvider>
    </>
  );
}
