import Container from '@/components/ui/container';
import { BankData, SettingsNav, getBankingData } from '@/features/settings';

export default async function Page() {
  const bankData = await getBankingData();

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
        <BankData bankData={bankData[0]} />
      </Container>
    </div>
  );
}
