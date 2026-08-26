'use client';
import { Button, CircularProgress,IconButton, InputAdornment, TextField } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AuthControllers } from '@/api/authControllers';
import { loginContent } from '@/constants/auth/loginContent';
import { validateIdentifier } from '@/lib/validator/identifier.validator';
import { validatePassword } from '@/lib/validator/password.validator';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import { showSnackbar } from '@/redux/slices/snackbarSlice';
import type { User } from '@/types/auth.types';

type LoginFormData = {
  identifier: string;
  password: string;
};

type LoginErrors = Partial<LoginFormData>;

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.5rem',
    '&:hover fieldset': {
      borderColor: '#10b981',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#059669',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#059669',
  },
};

export const AdminLoginForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({ identifier: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleChange = (name: keyof LoginFormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    const nextErrors: LoginErrors = {};

    const identifier = form.identifier.trim();
    const identifierError = validateIdentifier(identifier);
    const passwordError = validatePassword(form.password);

    if (identifierError) nextErrors.identifier = identifierError;
    if (passwordError) nextErrors.password = passwordError;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setApiError('');
      setIsLoading(true);

      const response = await AuthControllers.login({
        identifier,
        password: form.password,
      });

      const { tokens } = response.data;
      
      // Store tokens temporarily in memory for profile call
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      
      const profileRes = await AuthControllers.getProfile();
      const profileData = profileRes.data;

      if (profileData.role !== 'ADMIN') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setApiError('Access denied: You do not have administrator privileges.');
        setIsLoading(false);
        return;
      }

      dispatch(
        setCredentials({
          user: profileData as unknown as User,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      );

      router.push('/admin/dashboard');
    } catch (error: unknown) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      const err = error as { response?: { data?: { message?: string }; status?: number }; request?: unknown; message?: string };

      if (err?.response) {
        const status = err.response.status;
        const backendMsg = err.response.data?.message;
        let errorMessage = 'Server error. Please try again.';
        if (backendMsg) {
          errorMessage = backendMsg;
        } else if (status === 401 || status === 403) {
          errorMessage = 'Invalid credentials';
        }
        dispatch(showSnackbar({ message: errorMessage, severity: 'error' }));
      } else if (err?.request !== undefined) {
        dispatch(showSnackbar({ message: 'Unable to reach the server. Please check your connection or try again later.', severity: 'error' }));
      } else {
        dispatch(showSnackbar({ message: 'Something went wrong. Please try again.', severity: 'error' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:flex-row">
        <section className="hidden lg:flex flex-1 flex-col justify-between p-8 text-white sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/login.png"
              alt="Login illustration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/20 to-black/80" />
            <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-linear-to-bl from-black/60 via-transparent to-black/60" />
          </div>

          <div className="relative z-10">
            <p className="text-lg font-bold">{loginContent.brand}</p>
            <div className="mt-16 max-w-md">
              <h1 className="text-3xl font-bold sm:text-4xl">Admin Portal</h1>
              <p className="mt-4 text-sm leading-6 text-emerald-50">Manage the system securely.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-center p-6 sm:p-10 min-h-[calc(100vh-3rem)] sm:min-h-0">
          <form
            className="grid w-full max-w-md gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Admin Login</h2>
              <p className="mt-2 text-sm text-slate-600 mb-2">
                Please log in with your administrator credentials.
              </p>
            </div>



            <TextField
              label="Email or Mobile Number"
              variant="outlined"
              fullWidth
              name="identifier"
              value={form.identifier}
              onChange={(e) => handleChange('identifier', e.target.value)}
              error={!!errors.identifier}
              helperText={errors.identifier}
              sx={textFieldStyles}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={textFieldStyles}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={{
                mt: 1,
                mb: 2,
                height: 48,
                borderRadius: '8px',
                bgcolor: '#059669',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#047857',
                  boxShadow: 'none',
                },
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
};

