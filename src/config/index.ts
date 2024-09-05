export const env = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
  MASTER_API_KEY: process.env.MASTER_API_KEY,
  NEXT_PUBLIC_FOOTPRINT_KYB_PB_KEY:
    process.env.NEXT_PUBLIC_FOOTPRINT_KYB_PB_KEY,
  NEXT_PUBLIC_FOOTPRINT_LOGIN_PB_KEY:
    process.env.NEXT_PUBLIC_FOOTPRINT_LOGIN_PB_KEY,
  NEXT_PUBLIC_MAX_INACTIVITY_MS: process.env.NEXT_PUBLIC_MAX_INACTIVITY_MS,
  NEXT_PUBLIC_FOOTPRINT_KYC_PB_KEY:
    process.env.NEXT_PUBLIC_FOOTPRINT_KYC_PB_KEY,
  NEXT_PUBLIC_FOOTPRINT_KYC_PB_KEY_NON_US_RESIDENTS:
    process.env.NEXT_PUBLIC_FOOTPRINT_KYC_PB_KEY_NON_US_RESIDENTS,
};

export const NODE_ENV = env.NEXT_PUBLIC_ENV; // 'development' or 'production'

export const SIDEBAR_PAGES = [
  {
    name: 'Buy/Sell',
    icon: 'dollar',
    path: '/buy-sell',
  },
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
    name: 'Deposits',
    icon: 'archiveRestore',
    path: '/deposits',
  },
  {
    name: 'Admin',
    isAdmin: true,
    icon: 'admin',
    subLinks: [
      {
        name: 'Volume',
        icon: 'chartLine',
        path: '/volume',
      },
      {
        name: 'Client Addresses',
        icon: 'wallets',
        path: '/client-addresses',
      },
    ],
  },
];

export const COINS = [
  { name: 'USDT', largeName: 'USDT ', icon: 'usdt' },
  { name: 'BTC', largeName: 'Bitcoin (coming soon)', icon: 'btc' },
  { name: 'ETH', largeName: 'Ethereum (coming soon)', icon: 'eth' },
  { name: 'TRX', largeName: 'Tron (coming soon)', icon: 'tron' },
];
