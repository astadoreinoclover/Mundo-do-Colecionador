import type { Metadata } from "next";
import "./globals.css";
import Cabecario from "./components/Cabecario";
import ClienteProvider from "./context/ClienteContext";


export const metadata: Metadata = {
  title: "Mundo do Colecionador",
  description: "Gerenciador de Coleções",
  keywords: ["mangás", "HQS", "Historias em quadrinos", "Novels"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="./logo.png" type="image/x-icon" />
      </head>
      <body>
        <ClienteProvider>
          <Cabecario />
          {children}
        </ClienteProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
