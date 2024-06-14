export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const pages = [
  {
    name: 'Dashboard',
    icon: 'home',
    path: '/dashboard',
  },
  {
    name: 'Transactions',
    icon: 'profile_circled',
    path: '/dashboard/transactions',
  },
  {
    name: 'Withdrawals',
    icon: 'store',
    path: '/dashboard/withdrawals',
  },
  {
    name: 'Settings',
    icon: 'pie_chart',
    path: '/dashboard/settings',
  },
];
