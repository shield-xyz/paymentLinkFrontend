import Link from 'next/link';

export const SignUpLink = () => {
  return (
    <div className="mt-auto flex h-[90px] w-full items-center justify-center border-t">
      <span className="px-4 py-4 text-left text-sm text-muted-foreground">
        <Link className="link text-base" href="/register">
          Don&apos;t have an account? Sign up
        </Link>
      </span>
    </div>
  );
};
