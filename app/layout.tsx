"use client";

import { Layout, Button } from "@douyinfe/semi-ui-19";
import "./app.css";

export default function App({ children }: { children: React.ReactNode }) {
  const { Header, Footer, Content } = Layout;

  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
    } else {
      body.setAttribute("theme-mode", "dark");
    }
  };

  return (
    <html lang="en">
      <body>
        <Layout>
          <Header className="flex h-64 items-center justify-center">
            <img src="/images/logo.svg" className="h-48" />
          </Header>
          <Content className="flex items-center justify-center px-4">
            {children}
          </Content>
          <Footer className="flex h-48 items-center justify-center">
            <div className="flex items-center gap-2 text-xl">
              <Button onClick={switchMode}>Switch Mode</Button>
            </div>
          </Footer>
        </Layout>
      </body>
    </html>
  );
}
