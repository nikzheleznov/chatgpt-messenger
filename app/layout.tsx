import { SessionProvider } from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import './globals.css';
import SideBar from '@/components/SideBar';
import Login from '@/components/Login';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ClientProvider from '@/components/ClientProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* Sidebar */}
              <div className="max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>

              {/* Notification */}
              <ClientProvider />

              <div
                className="flex-1"
                style={{ backgroundColor: 'hsla(240, 41.75%, 20.2%, 1)' }}
              >
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}