import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { CoreProvider } from "./components/core-provider";
import { DrawerMenu } from "./components/sideMenu/drawerMenu";
import { AuthGuard } from "./components/AuthGuard";

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FeiraKit",
  description: "Uma feira livre na palma da sua mão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className={`${montserrat.variable} antialiased font-sans`}>
        <AuthGuard />
        <CoreProvider>{children}</CoreProvider>
        <DrawerMenu />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
