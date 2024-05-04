import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          <div className="relative flex flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-2 px-6 flex-grow items-center justify-center">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-1">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href={process.env.AUTHOR_URL}
                title={process.env.AUTHOR_NAME}
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">{process.env.AUTHOR_NAME} </p>
                <span className="text-default-600">with ❤️</span>
              </Link>
            </footer>
            <footer className="w-full flex items-center justify-center">
              <span className="text-default-600">Using <a href="https://nextui.org/" className="text-primary" >NextUI</a> and <a href="https://nextjs.org/" className="text-primary" >Next.js</a></span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>

  );
}
