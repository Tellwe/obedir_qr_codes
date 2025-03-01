import { QrCode, Package, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would normally fetch from a database based on the product ID
const getProductData = (id: string) => {
  return {
    id,
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation technology and long battery life.",
    category: "Electronics",
    createdAt: "January 15, 2024",
    features: [
      "Active Noise Cancellation",
      "40-hour Battery Life",
      "Bluetooth 5.2",
      "Comfortable Over-ear Design",
      "Built-in Microphone",
    ],
    specifications: [
      "Weight: 250g",
      "Frequency Response: 20Hz - 20kHz",
      "Impedance: 32 Ohm",
      "Driver Size: 40mm",
      "Charging: USB-C",
    ],
    company: {
      name: "TechAudio Inc.",
      website: "https://example.com",
      support: "support@example.com",
    },
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductData(params.id)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Product Info</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Share
            </Button>
            <Button size="sm">Visit Website</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                <p className="text-muted-foreground mt-2">{product.description}</p>
              </div>

              <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Product Category</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{product.category}</span>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Manufactured Date</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{product.createdAt}</span>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>About This Product</CardTitle>
                      <CardDescription>Detailed information about this product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{product.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Features</CardTitle>
                      <CardDescription>What makes this product special</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-muted-foreground">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="specifications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Specifications</CardTitle>
                      <CardDescription>Detailed specifications of this product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {product.specifications.map((spec, index) => (
                          <li key={index} className="text-muted-foreground">
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Company Name</h3>
                    <p className="text-sm text-muted-foreground">{product.company.name}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Website</h3>
                    <p className="text-sm text-primary hover:underline">
                      <a href={product.company.website} target="_blank" rel="noopener noreferrer">
                        {product.company.website.replace("https://", "")}
                      </a>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Support</h3>
                    <p className="text-sm text-primary hover:underline">
                      <a href={`mailto:${product.company.support}`}>{product.company.support}</a>
                    </p>
                  </div>
                  <Button className="w-full mt-4">Contact Support</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                  <CardDescription>Scan to share this product information</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-48 w-48 p-4 bg-white rounded-md flex items-center justify-center">
                    <QrCode className="h-full w-full text-black" strokeWidth={1} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 bg-background/95">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">QR Product Info</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} QR Product Info. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

