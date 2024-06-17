export const env = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_WALLET: process.env.NEXT_PUBLIC_WALLET,
  NEXT_PUBLIC_TOKEN_USDT: process.env.NEXT_PUBLIC_TOKEN_USDT,
};

export const SIDEBAR_PAGES = [
  {
    name: 'Create Payment Link',
    icon: 'addCircle',
    path: '/payment-links',
  },
  {
    name: 'Dashboard',
    icon: 'home',
    path: '/dashboard',
  },
  {
    name: 'Transactions',
    icon: 'profile_circled',
    path: '/transactions',
  },
  {
    name: 'Withdrawals',
    icon: 'store',
    path: '/withdrawals',
  },
  {
    name: 'Settings',
    icon: 'pie_chart',
    path: '/settings',
  },
];

export const COINS = [
  { name: 'USDT', largeName: 'USDT ', icon: 'usdt' },
  { name: 'BTC', largeName: 'Bitcoin (coming soon)', icon: 'btc' },
  { name: 'ETH', largeName: 'Ethereum (coming soon)', icon: 'eth' },
  { name: 'TRX', largeName: 'Tron (coming soon)', icon: 'tron' },
];
