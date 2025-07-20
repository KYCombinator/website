
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const JWT_SECRET = process.env.JWT_SECRET || 'cinderblock';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(`hzzh.${APP_ID}.token`)?.value;

  if (!token) {
    redirect('/login?status=missing');
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('Error verifying token:', err);
    redirect('/login?status=expired');
  }

  return (
    <div className="min-h-screen bg-background-100 text-foreground-900">
      {children}
    </div>
  );
}
