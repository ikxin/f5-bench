import "@douyinfe/semi-ui/react19-adapter";
import Script from "next/script";
import "./app.css";

const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("semi-theme-mode");
    if (
      t === "dark" ||
      (t !== "light" &&
        window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      document.body.setAttribute("theme-mode", "dark");
    }
  } catch (e) {}
})()
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <Script
          defer
          src="https://umami.ikxin.com/script.js"
          data-website-id="d44b9f30-2706-4e02-b971-0187a72b093f"
        />
      </body>
    </html>
  );
}
