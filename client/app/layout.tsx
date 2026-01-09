import './globals.css';
import AppShell from '@/components/AppShell';
import { ThemeProvider } from '@/src/contexts/ThemeProvider';
import { AuthProvider } from '@/src/contexts/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
