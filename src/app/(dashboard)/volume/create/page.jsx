import Container from '@/components/ui/container';
import { VolumeTransactionForm } from '@/features/volume/components/VolumeTransactionForm';

export const revalidate = 60;

export default async function Page() {
  return (
    <Container className="p-4">
      <VolumeTransactionForm />
    </Container>
  );
}
