import './globals.css'
export const metadata = {
  title: '在线图片压缩',
  description: 'images compress online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  )
}
