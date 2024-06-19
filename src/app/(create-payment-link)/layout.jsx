export const metadata = {
  title: 'Shield',
  description: 'An app for managing your personal finances.',
};

export default function Layout({ children }) {
  return <div className="bg-background">{children}</div>;
}
