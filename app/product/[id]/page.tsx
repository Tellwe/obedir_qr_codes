import { QrCode, Package, Calendar, Recycle, Truck, Leaf, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
// This would normally fetch from a database based on the product ID
const getProductData = (id: string) => {
  {
    return {
      id,
      name: "EcoTech Performance Jacket",
      description:
        "A high-performance, sustainable jacket made from recycled materials. Designed for durability, weather resistance, and comfort.",
      category: "Apparel",
      createdAt: "March 2, 2025",
      sku: "JKT-ET-2025",
      batchNumber: "BN20250302",
  
      // General Product Information
      generalInfo: {
        size: "Available in S, M, L, XL, XXL",
        color: "Forest Green, Midnight Black, Ocean Blue",
        weight: "650g (Medium size)",
        volume: "0.01 cubic meters",
        recyclability: "85% recyclable components",
        circularEconomy: "Designed for repair, reuse, and recycling programs"
      },
  
      // Supply Chain Information
      supplyChain: {
        manufacturers: [
          {
            name: "GreenWear Textiles Ltd.",
            location: "Bangladesh",
            role: "Fabric Manufacturing",
            certifications: ["GOTS", "Fair Trade Certified"]
          },
          {
            name: "EcoStitch Apparel",
            location: "Vietnam",
            role: "Final Assembly",
            certifications: ["ISO 9001", "WRAP Certified"]
          }
        ],
        processes: [
          { type: "Yarn Spinning", location: "India" },
          { type: "Dyeing & Finishing", location: "Bangladesh" },
          { type: "Cut & Sew", location: "Vietnam" }
        ]
      },
  
      // Materials Composition
      materials: {
        components: [
          {
            name: "Outer Shell",
            material: "100% Recycled Polyester (rPET)",
            supplier: "RePoly Mills, Taiwan",
            weight: "300g",
            recycledContent: "100% post-consumer recycled plastic bottles"
          },
          {
            name: "Insulation",
            material: "80% Recycled Polyester, 20% Bio-based fibers",
            supplier: "EcoFill Technologies, China",
            weight: "200g",
            recycledContent: "80%"
          },
          {
            name: "Lining",
            material: "Organic Cotton",
            supplier: "PureCotton Ltd., India",
            weight: "150g",
            recycledContent: "0%"
          },
          {
            name: "Zippers",
            material: "Recycled Nylon",
            supplier: "FastenTech, Japan",
            weight: "50g",
            recycledContent: "100%"
          }
        ],
        certifications: ["GOTS Certified Organic Cotton", "GRS Certified Recycled Materials", "OEKO-TEX Standard 100"],
        chemicalInfo: "No PFAS used for waterproofing. Eco-friendly dyeing process."
      },
  
      // Packaging Details
      packaging: {
        components: [
          {
            name: "Outer Bag",
            material: "Biodegradable Cornstarch Film",
            supplier: "GreenPack Solutions, China",
            weight: "25g",
            recycledContent: "0%"
          },
          {
            name: "Hang Tag",
            material: "Recycled Paperboard",
            supplier: "EcoPrint Ltd., Vietnam",
            weight: "10g",
            recycledContent: "100%"
          }
        ],
        disposalInstructions: "Outer bag is compostable. Hang tag is recyclable in standard paper recycling."
      },
  
      // Environmental Impact
      environmentalImpact: {
        carbonFootprint: "12 kg CO2e for full product lifecycle",
        energyConsumption: "Manufacturing: 20 kWh per unit",
        waterUsage: "Manufacturing: 75 liters per unit",
        wasteEmissions: "0.8 kg non-recyclable manufacturing waste per unit"
      },
  
      // Care Instructions
      careInstructions: [
        "Machine wash cold with mild detergent",
        "Tumble dry on low heat or hang dry",
        "Do not use bleach or fabric softeners",
        "Reapply waterproofing treatment as needed"
      ],
  
      // End-of-Life Information
      endOfLife: {
        disassembly: "Zippers and insulation can be separated for proper recycling.",
        recyclingOptions: "Fabric can be recycled through textile recycling programs.",
        takeback: "Manufacturer offers a recycling program with store credit upon return of used jackets."
      },
  
      // Repair Information
      repair: {
        repairability: "Repairability score: 8/10. Zippers and lining can be replaced with minimal tools.",
        spareParts: "Replacement zippers and patches available from manufacturer for 5 years after purchase.",
        repairServices: "Certified repair partners available globally. Lifetime repair warranty on stitching defects."
      },
  
      features: [
        "Water-resistant and windproof",
        "Breathable insulation for all-weather comfort",
        "Adjustable hood and cuffs",
        "Lightweight yet warm design",
        "Packable for travel convenience"
      ],
      specifications: [
        "Weight: 650g (Medium size)",
        "Material: Recycled Polyester, Organic Cotton",
        "Insulation: 80% Recycled Polyester, 20% Bio-based fibers",
        "Waterproof Rating: 10,000mm",
        "Breathability: 8,000 g/m²/24h"
      ],
      company: {
        name: "EcoWear Apparel Co.",
        website: "https://ecowear.com",
        support: "support@ecowear.com"
      },
    }
  }
  
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductData(params.id)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/Obedir-Icon-Green.png" // Path is relative to `public/`
              alt="Company Logo"
              height={40}
              width={40}
            />
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
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    SKU: {product.sku}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Batch: {product.batchNumber}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2">{product.description}</p>
              </div>

              <Tabs defaultValue="details" className="space-y-4">
                <TabsList className="grid grid-cols-4 md:flex md:flex-wrap">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
                  <TabsTrigger value="environmental">Environmental</TabsTrigger>
                  <TabsTrigger value="care-repair">Care & Repair</TabsTrigger>
                  <TabsTrigger value="end-of-life">End of Life</TabsTrigger>
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
                      <CardTitle>General Information</CardTitle>
                      <CardDescription>Physical characteristics and general details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h3 className="font-medium mb-2">Physical Properties</h3>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li><span className="font-medium text-foreground">Size:</span> {product.generalInfo.size}</li>
                            <li><span className="font-medium text-foreground">Color:</span> {product.generalInfo.color}</li>
                            <li><span className="font-medium text-foreground">Weight:</span> {product.generalInfo.weight}</li>
                            <li><span className="font-medium text-foreground">Volume:</span> {product.generalInfo.volume}</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Sustainability</h3>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li><span className="font-medium text-foreground">Recyclability:</span> {product.generalInfo.recyclability}</li>
                            <li><span className="font-medium text-foreground">Circular Economy:</span> {product.generalInfo.circularEconomy}</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Features & Specifications</CardTitle>
                      <CardDescription>Technical details about this product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <h3 className="font-medium mb-2">Key Features</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {product.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Technical Specifications</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {product.specifications.map((spec, index) => (
                              <li key={index}>{spec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="materials" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Materials Composition</CardTitle>
                      <CardDescription>Detailed breakdown of materials used in this product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Components</h3>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Component</TableHead>
                                  <TableHead>Material</TableHead>
                                  <TableHead>Supplier</TableHead>
                                  <TableHead>Weight</TableHead>
                                  <TableHead>Recycled Content</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {product.materials.components.map((component, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{component.name}</TableCell>
                                    <TableCell>{component.material}</TableCell>
                                    <TableCell>{component.supplier}</TableCell>
                                    <TableCell>{component.weight}</TableCell>
                                    <TableCell>{component.recycledContent}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h3 className="font-medium mb-2">Certifications</h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              {product.materials.certifications.map((cert, index) => (
                                <li key={index}>{cert}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Chemical Information</h3>
                            <p className="text-sm text-muted-foreground">{product.materials.chemicalInfo}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Packaging Details</CardTitle>
                      <CardDescription>Information about product packaging materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Packaging Components</h3>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Component</TableHead>
                                  <TableHead>Material</TableHead>
                                  <TableHead>Supplier</TableHead>
                                  <TableHead>Weight</TableHead>
                                  <TableHead>Recycled Content</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {product.packaging.components.map((component, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{component.name}</TableCell>
                                    <TableCell>{component.material}</TableCell>
                                    <TableCell>{component.supplier}</TableCell>
                                    <TableCell>{component.weight}</TableCell>
                                    <TableCell>{component.recycledContent}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Disposal Instructions</h3>
                          <p className="text-sm text-muted-foreground">{product.packaging.disposalInstructions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="supply-chain" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Supply Chain Information</CardTitle>
                      <CardDescription>Details about manufacturing and suppliers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Manufacturers</h3>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Location</TableHead>
                                  <TableHead>Role</TableHead>
                                  <TableHead>Certifications</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {product.supplyChain.manufacturers.map((manufacturer, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{manufacturer.name}</TableCell>
                                    <TableCell>{manufacturer.location}</TableCell>
                                    <TableCell>{manufacturer.role}</TableCell>
                                    <TableCell>{manufacturer.certifications.join(", ")}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Manufacturing Processes</h3>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Process</TableHead>
                                  <TableHead>Location</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {product.supplyChain.processes.map((process, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{process.type}</TableCell>
                                    <TableCell>{process.location}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="environmental" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Environmental Impact</CardTitle>
                      <CardDescription>{"Information about the product's environmental footprint"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <Leaf className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Carbon Footprint</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{product.environmentalImpact.carbonFootprint}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <Truck className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Energy Consumption</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{product.environmentalImpact.energyConsumption}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <Info className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Water Usage</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{product.environmentalImpact.waterUsage}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <Recycle className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-medium">Waste Emissions</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{product.environmentalImpact.wasteEmissions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="care-repair" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Care Instructions</CardTitle>
                      <CardDescription>How to maintain and care for your product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {product.careInstructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Repair Information</CardTitle>
                      <CardDescription>Details about repairing and servicing your product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Repairability</h3>
                          <p className="text-sm text-muted-foreground">{product.repair.repairability}</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Spare Parts</h3>
                          <p className="text-sm text-muted-foreground">{product.repair.spareParts}</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Repair Services</h3>
                          <p className="text-sm text-muted-foreground">{product.repair.repairServices}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="end-of-life" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>End-of-Life Information</CardTitle>
                      <CardDescription>How to properly dispose of or recycle this product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Disassembly Instructions</h3>
                          <p className="text-sm text-muted-foreground">{product.endOfLife.disassembly}</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Recycling Options</h3>
                          <p className="text-sm text-muted-foreground">{product.endOfLife.recyclingOptions}</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Take-Back Programs</h3>
                          <p className="text-sm text-muted-foreground">{product.endOfLife.takeback}</p>
                        </div>
                      </div>
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
            <Image
              src="/images/Obedir-Icon-Green.png" // Path is relative to `public/`
              alt="Company Logo"
              height={40}
              width={40}
            />            <span className="text-sm font-semibold">Obedir Link</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Obedir Link. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Import Badge component
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"