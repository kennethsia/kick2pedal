// Path: nextjs-frontend/src/app/auth/reset-password/page.tsx

'use client';

import { resetPasswordAction } from '@/data/actions/authActions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  const initialState: any = {
    errors: {},
    values: {
      password: '',
      confirmPassword: '',
      code: code || '', // Ensure code is included in initial values
    },
    message: '',
    success: false,
  };

  const [state, formAction, IsPending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  // redirect after successful password reset
  if (state?.success) {
    router.push('/login');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Reset Your Password</h2>

        <p className="text-gray-600 text-sm">
          Enter your new password below to update your credentials.
        </p>

        <form action={formAction} className="space-y-4 text-left">
          <p className="text-red-500 text-center text-sm">
            {!state?.success && state?.message}
          </p>
          {/* New Password */}
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="password"
              defaultValue={state.values?.password}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.password && (
              <p className="text-red-500 text-sm">{state?.errors.password}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              defaultValue={state.values?.confirmPassword}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {state?.errors.confirmPassword}
              </p>
            )}
          </div>
          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={IsPending}
            className="cursor-pointer w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
          <input type="hidden" name="code" value={code ?? ''} />
          <input type="hidden" name="passwordType" value="reset" />
          {/* Success/Error Message */}
          {state.message && (
            <p
              className={`text-sm ${
                state.success ? 'text-green-600' : 'text-red-600'
              } text-center`}
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
