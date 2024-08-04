import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from './ThemeProvider';
import { Container } from '@mui/material';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <Container maxWidth={false} disableGutters>
            {children}
          </Container>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}