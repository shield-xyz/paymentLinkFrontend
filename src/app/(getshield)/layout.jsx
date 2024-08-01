export default function Layout({ children }) {
  return (
    <html className="bg-transparent">
      <body className="w-screen bg-transparent">{children}</body>
    </html>
  );
}
