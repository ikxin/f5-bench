"use client";

import { Layout } from "@douyinfe/semi-ui-19";
import "./app.css";

export default function App({ children }: { children: React.ReactNode }) {
  const { Header, Footer, Content } = Layout;

  return (
    <html lang="en">
      <body>
        <Layout>
          <Header></Header>
          <Content>{children}</Content>
          <Footer></Footer>
        </Layout>
      </body>
    </html>
  );
}
