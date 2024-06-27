import { notFound } from 'next/navigation';

import { PaymentLink } from '@/features/payment-link';
import { getPaymentLinkData } from '@/features/payment-link/actions';
import { getUserWallet } from '@/services';

export const revalidate = 0; // Que no deje pagar nada cuando haya status paid: mensaje que caduco la transaccion o algo pero no botones.

export default async function Page({ searchParams }) {
  const { id } = searchParams;
  const paymentLinkData = await getPaymentLinkData(id);

  console.log({ paymentLinkData });

  if (!paymentLinkData) {
    notFound();
  }

  const userWallet = await getUserWallet({
    userId: paymentLinkData.user._id,
    networkId: paymentLinkData.asset.networkId,
  });

  // TODO: Handle error if paymentLinkData is undefined

  return (
    <PaymentLink paymentLinkData={paymentLinkData} userWallet={userWallet} />
  );
}

// caso bitcoin: Ingrese su hash
// 1ero traer la wallet y mostrarlale al usuario el hash de la wallet: boton de copiar (podemos cortar como en tabla), texto para mostrar, QR.
// Un input donde cargan el hash del pago (comprobante XXX) y eso mandar al backend y el backend valida.
// Enviar payload a savePayment tal cual los demas
