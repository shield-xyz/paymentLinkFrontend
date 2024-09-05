import { ResetPasswordForm } from '@/features/auth';

export default async function Page({ params: { resetToken } }) {
  return (
    <div className="flex h-full min-h-dvh w-screen">
      <ResetPasswordForm resetToken={resetToken} />
    </div>
  );
}
