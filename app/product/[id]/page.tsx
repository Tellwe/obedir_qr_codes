import { QrCode, Package, Calendar, Recycle, Truck, Leaf, Info, PenTool as Tool, Box } from "lucide-react"
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
    sku: "HDPH-PRO-2024",
    batchNumber: "BN20240115",
    
    // General Product Information
    generalInfo: {
      size: "Over-ear, 190mm x 175mm x 80mm",
      color: "Matte Black",
      weight: "250g",
      volume: "0.0027 cubic meters",
      recyclability: "80% recyclable components",
      circularEconomy: "Eligible for manufacturer take-back program for recycling and refurbishment"
    },
    
    // Supply Chain Information
    supplyChain: {
      manufacturers: [
        {
          name: "TechAudio Manufacturing Ltd.",
          location: "Shenzhen, China",
          role: "Final Assembly",
          certifications: ["ISO 9001", "ISO 14001"]
        },
        {
          name: "SoundComponents Inc.",
          location: "Taiwan",
          role: "Audio Driver Production",
          certifications: ["ISO 9001"]
        }
      ],
      processes: [
        { type: "Component Manufacturing", location: "Taiwan, China, Malaysia" },
        { type: "Assembly", location: "Shenzhen, China" },
        { type: "Quality Testing", location: "Shenzhen, China" }
      ]
    },
    
    // Materials Composition
    materials: {
      components: [
        {
          name: "Headband",
          material: "Aluminum frame with protein leather padding",
          supplier: "MetalWorks Ltd., Shanghai, China",
          weight: "65g",
          recycledContent: "30% recycled aluminum"
        },
        {
          name: "Ear Cushions",
          material: "Memory foam with protein leather covering",
          supplier: "ComfortFoam Inc., Vietnam",
          weight: "45g",
          recycledContent: "0%"
        },
        {
          name: "Driver Units",
          material: "40mm dynamic drivers with neodymium magnets",
          supplier: "SoundComponents Inc., Taiwan",
          weight: "50g",
          recycledContent: "0%"
        },
        {
          name: "Circuit Board",
          material: "PCB with copper traces and electronic components",
          supplier: "ElectroTech Ltd., Shenzhen, China",
          weight: "30g",
          recycledContent: "0%"
        },
        {
          name: "Battery",
          material: "Lithium-ion rechargeable",
          supplier: "PowerCell Inc., South Korea",
          weight: "45g",
          recycledContent: "0%",
          hazardous: true
        },
        {
          name: "Outer Shell",
          material: "ABS plastic",
          supplier: "PlasticTech Co., Guangzhou, China",
          weight: "60g",
          recycledContent: "15% post-consumer recycled plastic"
        }
      ],
      certifications: ["RoHS Compliant", "REACH Compliant", "Bluetooth 5.2 Certified"],
      chemicalInfo: "Contains lithium-ion battery which is classified as hazardous waste. No PFAS or BFRs used in manufacturing."
    },
    
    // Packaging Details
    packaging: {
      components: [
        {
          name: "Outer Box",
          material: "Cardboard",
          supplier: "EcoPackaging Ltd., China",
          weight: "120g",
          recycledContent: "90% post-consumer recycled content"
        },
        {
          name: "Inner Tray",
          material: "Molded paper pulp",
          supplier: "GreenPulp Inc., China",
          weight: "60g",
          recycledContent: "100% recycled paper"
        },
        {
          name: "Protective Bag",
          material: "LDPE plastic",
          supplier: "CleanWrap Co., China",
          weight: "10g",
          recycledContent: "0%"
        },
        {
          name: "User Manual",
          material: "Paper",
          supplier: "PrintWorks Ltd., China",
          weight: "25g",
          recycledContent: "70% recycled paper"
        }
      ],
      disposalInstructions: "Cardboard box and paper pulp tray are recyclable in standard paper recycling. Plastic bag should be recycled with plastic film collection where available."
    },
    
    // Environmental Impact
    environmentalImpact: {
      carbonFootprint: "8.5 kg CO2e for full product lifecycle",
      energyConsumption: "Manufacturing: 12 kWh per unit",
      waterUsage: "Manufacturing: 45 liters per unit",
      wasteEmissions: "0.5 kg non-recyclable manufacturing waste per unit"
    },
    
    // Care Instructions
    careInstructions: [
      "Clean ear cushions with a slightly damp cloth",
      "Store in provided case when not in use",
      "Avoid exposure to extreme temperatures",
      "Charge battery only with provided USB-C cable",
      "Replace ear cushions when worn (available from manufacturer)"
    ],
    
    // End-of-Life Information
    endOfLife: {
      disassembly: "Ear cushions can be removed for replacement or recycling. Battery can be removed with standard screwdriver for proper disposal.",
      recyclingOptions: "Electronics can be recycled at e-waste collection points. Battery must be recycled at designated battery recycling locations.",
      takeback: "Manufacturer offers 15% discount on new purchase when returning old headphones for recycling."
    },
    
    // Repair Information
    repair: {
      repairability: "Repairability score: 7/10. Ear cushions and cable are replaceable without tools. Battery and driver replacement requires basic tools.",
      spareParts: "Replacement ear cushions, cables, and batteries available from manufacturer for 5 years after product discontinuation.",
      repairServices: "Authorized repair centers in major cities. 2-year warranty covers manufacturing defects."
    },
    
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
                      <CardDescription>Information about the product's environmental footprint</CardDescription>
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

// Import Badge component
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"