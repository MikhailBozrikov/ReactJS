import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Next.js App with Dynamic Imports",
  description: "Optimized Next.js application with dynamic imports",
  keywords: ["Next.js", "React", "TypeScript", "Dynamic Imports"],
  authors: [{ name: "Developer" }],
};

// Отдельный экспорт viewport (исправление предупреждения)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const menuItems = [
  { key: "home", label: <Link href="/">Home</Link> },
  { key: "posts", label: <Link href="/posts">Posts</Link> },
  { key: "albums", label: <Link href="/albums">Albums</Link> },
  { key: "todo", label: <Link href="/todo">Todos</Link> },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Предзагрузка DNS для внешних ресурсов */}
        <link rel="preconnect" href="https://jsonplaceholder.typicode.com" />
        <link rel="preconnect" href="https://via.placeholder.com" />
        <link rel="dns-prefetch" href="https://jsonplaceholder.typicode.com" />
        <link rel="dns-prefetch" href="https://via.placeholder.com" />
      </head>
      <body style={{ overflowX: 'hidden' }}>
        <AntdRegistry>
          <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ 
              position: "sticky", 
              top: 0, 
              zIndex: 1000, 
              width: "100%",
              height: "64px",
            }}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["home"]}
                items={menuItems}
                style={{ flex: 1, minWidth: 0 }}
              />
            </Header>
            <Content style={{ 
              padding: "24px", 
              minHeight: "calc(100vh - 134px)",
              overflowX: 'hidden'
            }}>
              {children}
            </Content>
            <Footer style={{ 
              textAlign: "center", 
              background: "#001529", 
              color: "white",
              height: "70px",
              padding: "20px"
            }}>
              © 2024 Next.js Optimized App
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}