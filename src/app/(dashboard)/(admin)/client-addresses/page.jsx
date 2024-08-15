import Container from '@/components/ui/container';
import {
  ClientAddressesTable,
  getClientsAddress,
  getWhatsAppGroups,
} from '@/features/admin';

export const revalidate = 0;

export default async function Page() {
  const [clientAddresses, wpGroups] = await Promise.all([
    getClientsAddress(),
    getWhatsAppGroups(),
  ]);

  console.log({ wpGroups });
  return (
    <Container className="overflow-auto">
      <ClientAddressesTable
        clientAddresses={clientAddresses}
        wpGroups={wpGroups}
      />
    </Container>
  );
}
