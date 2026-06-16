import type { Metadata } from 'next';
import { Geist, Geist_Mono, Dancing_Script } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const dancingScript = Dancing_Script({
  variable: '--font-handwritten',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Flor D'Lune — The Garden Remembers",
  description: 'Dark elegance. Lunar ritual. Clothing, sound, and story.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Dev-only early script to suppress noisy warnings from browser extensions (MetaMask) and library deprecations (THREE.Clock from R3F/drei internals).
            Our 3D code uses delta time only. Placed in <head> for earliest possible execution, before body/3D components mount. */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Suppress THREE.Clock deprecation
                  const originalWarn = console.warn;
                  console.warn = function(...args) {
                    const msg = args[0];
                    if (typeof msg === 'string' && msg.includes('THREE.Clock: This module has been deprecated')) {
                      return;
                    }
                    originalWarn.apply(console, args);
                  };

                  // Suppress MetaMask extension connection noise (unrelated to this site)
                  window.addEventListener('unhandledrejection', function(event) {
                    const reason = event.reason;
                    if (reason && (reason.message || '').includes('MetaMask')) {
                      event.preventDefault();
                      return;
                    }
                  });

                  // Also catch if it logs via console.error
                  const originalError = console.error;
                  console.error = function(...args) {
                    const msg = args[0] && args[0].message ? args[0].message : args[0];
                    if (typeof msg === 'string' && msg.includes('MetaMask')) {
                      return;
                    }
                    originalError.apply(console, args);
                  };
                })();
              `
            }}
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} bg-[#0A0A0F] text-[#F8F8F5] antialiased`}>
        {children}
      </body>
    </html>
  );
}
