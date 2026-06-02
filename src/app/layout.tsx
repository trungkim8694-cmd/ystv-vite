import "@/src/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  metadataBase: new URL("https://yensaothinhvuong.com"),
  title: "Yến Sào Thịnh Vượng (YSTV)",
  description: "Tinh hoa yến sào từ hệ thống nhà trải nghiệm dài từ Khánh Hòa đến Tây Ninh.",
};
