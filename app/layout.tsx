import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./_components/theme-provider"
import { QueryClientProvider } from "./_components/query-client-provider"
import { ToasterProvider } from "./_components/toaster-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "CataGo",
    template: "%s | CataGo",
  },
  description:
    "Crie, gerencie e compartilhe catálogos digitais de forma fácil e profissional com o CataGo – sua vitrine online inteligente.",
  openGraph: {
    title: "CataGo",
    description:
      "CataGo é a plataforma ideal para criar catálogos digitais personalizados. Compartilhe seus produtos com praticidade e estilo.",
    url: "https://catago.com.br",
    siteName: "CataGo",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CataGo",
    description:
      "Monte seu catálogo digital com agilidade e estilo usando o CataGo.",
  },
  icons: {
    icon: "/images/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-1 flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <QueryClientProvider>
            {children}
            <ToasterProvider richColors position="top-right" />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
