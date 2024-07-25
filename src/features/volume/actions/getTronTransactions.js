export async function getTronTransactions(address) {
  try {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const min_timestamp = new Date('2024-04-28').getTime();

    const response = await fetch(
      `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20?only_to=true&min_timestamp=${min_timestamp}&order_by=timestamp,asc&limit=200`,
      options,
    );

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}
