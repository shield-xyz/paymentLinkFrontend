import Container from '@/components/ui/container';
import { ClientAddressesTable, getClientsAddress } from '@/features/admin';

export const revalidate = 0;

export default async function Page() {
  const clientAddresses = await getClientsAddress();

  return (
    <Container className="overflow-auto">
      <ClientAddressesTable clientAddresses={clientAddresses} />
    </Container>
  );
}
