import Container from '@/components/ui/container';
import { SettingsNav } from '@/features/settings';

export default async function Page() {
  return (
    <div>
      <Container className="flex h-full w-full flex-col px-8 py-8">
        <h1 className="mb-4 text-4xl font-bold">Settings</h1>
        <p className="mb-4 text-muted-foreground">
          This is your profile editor, where you can update your information and
          personalize your account. Customize your profile by adding or changing
          your details.
        </p>
        <SettingsNav />
        <div className="h-[600px] py-10">
          <iframe
            src="https://kyc-front-snowy.vercel.app/iframe"
            width="100%"
            height="100%"
            className="border-none"
          ></iframe>
        </div>
      </Container>
    </div>
  );
}
