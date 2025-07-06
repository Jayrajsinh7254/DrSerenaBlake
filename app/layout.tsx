import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500', '600']
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  title: 'Dr. Serena Blake, PsyD - Clinical Psychologist in Los Angeles',
  description: 'Licensed clinical psychologist offering anxiety therapy, relationship counseling, and trauma recovery in Los Angeles. In-person and virtual sessions available.',
  keywords: 'therapist, psychologist, anxiety therapy, relationship counseling, trauma recovery, Los Angeles, virtual therapy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}