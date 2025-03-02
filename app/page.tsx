import Link from "next/link"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { QrCode, Database, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/Obedir-Icon-Green.png" // Path is relative to `public/`
              alt="Company Logo"
              height={40}
              width={40}
            />
            <span className="text-xl font-bold">Obedir Link</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 sm:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Seamlessly Compliant. Effortlessly Connected.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create QR codes for your products and manage product information through our easy-to-use platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="w-full">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/Obedir-Icon-Green.png" // Path is relative to `public/`
                    alt="Company Logo"
                    height={400}
                    width={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl gap-12 px-4 md:px-6 lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">QR Code Generation</h3>
              <p className="text-muted-foreground">
                Generate unique QR codes for each of your products with our easy-to-use platform.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Product Management</h3>
              <p className="text-muted-foreground">
                Easily manage and update your product information through our intuitive dashboard.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Instant Updates</h3>
              <p className="text-muted-foreground">
                Update your product information in real-time, with changes reflected instantly when QR codes are
                scanned.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/40 bg-background/95">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <Image
              src="/images/Obedir-Icon-Green.png" // Path is relative to `public/`
              alt="Company Logo"
              height={40}
              width={40}
            />
            <span className="text-sm font-semibold">Obedir Link</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Obedir Link. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

