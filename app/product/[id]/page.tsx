"use client"

import { QrCode, Package, Calendar, Recycle, Truck, Leaf, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useEffect, useState } from "react"

const LAMBDA_URL = "https://jvr6bib2t26jsx3kf6hhnwomzu0jsyeq.lambda-url.eu-north-1.on.aws"; // Replace with your actual Lambda URL

interface ProductData {
  uuid: string;
  basic_details: {
    basic_information: {
      product_name: string;
      SKU: string;
      batch_number: string;
      category: string;
      description: string;
    };
    physical_properties: {
      size: {
        height_cm: string;
        width_cm: string;
        depth_cm: string;
      };
      color: string;
      weight_kg: string;
      volume_cm3: string;
    };
    features_and_specifications: {
      key_features: string;
      specifications: string;
    };
  };
  materials: {
    materials_composition: {
      components: {
        component: string;
        material: string;
        supplier: string;
        weight_kg: string;
        recycled_percentage: string;
      }[];
      certifications: string;
      chemical_information: string;
    };
  };
  supply_chain: {
    supply_chain_information: {
      manufacturers: {
        name: string;
        location: string;
        role: string;
        certifications: string;
      }[];
      manufacturing_processes: {
        process: string;
        location: string;
      }[];
    };
  };
  packaging: {
    packaging_details: {
      packaging_components: {
        component: string;
        material: string;
        supplier: string;
        weight_kg: string;
        recycled_percentage: string;
      }[];
      disposal_instructions: string;
    };
  };
  environmental: {
    environmental_impact: {
      carbon_footprint: string;
      energy_consumption: string;
      water_usage: string;
      waste_emissions: string;
      recyclability: string;
      circular_economy: string;
    };
  };
  care_and_repair: {
    care_instructions: {
      care_instructions: string;
    };
    repair_information: {
      reparability: string;
      spare_parts: string;
      repair_services: string;
    };
  };
  end_of_life: {
    end_of_life_information: {
      disassembly_instructions: string;
      recycling_options: string;
      take_back_programs: string;
    };
  };
}

interface Product {
  name: string;
  sku: string;
  batchNumber: string;
  description: string;
  category: string;
  createdAt: string;
  generalInfo: {
    size: string;
    color: string;
    weight: string;
    volume: string;
    recyclability: string;
    circularEconomy: string;
  };
  features: string[];
  specifications: string[];
  materials: {
    components: {
      name: string;
      material: string;
      supplier: string;
      weight: string;
      recycledContent: string;
    }[];
    certifications: string[];
    chemicalInfo: string;
  };
  packaging: {
    components: {
      name: string;
      material: string;
      supplier: string;
      weight: string;
      recycledContent: string;
    }[];
    disposalInstructions: string;
  };
  supplyChain: {
    manufacturers: {
      name: string;
      location: string;
      role: string;
      certifications: string[];
    }[];
    processes: {
      type: string;
      location: string;
    }[];
  };
  environmentalImpact: {
    carbonFootprint: string;
    energyConsumption: string;
    waterUsage: string;
    wasteEmissions: string;
  };
  careInstructions: string[];
  repair: {
    repairability: string;
    spareParts: string;
    repairServices: string;
  };
  endOfLife: {
    disassembly: string;
    recyclingOptions: string;
    takeback: string;
  };
  company: {
    name: string;
    website: string;
    support: string;
  };
}

const getProductData = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${LAMBDA_URL}/read_qr/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data: ProductData = await response.json();
    console.log(data);

    // Map the incoming object to the Product interface
    const product: Product = {
      name: data.basic_details.basic_information.product_name,
      sku: data.basic_details.basic_information.SKU,
      batchNumber: data.basic_details.basic_information.batch_number,
      description: data.basic_details.basic_information.description,
      category: data.basic_details.basic_information.category,
      createdAt: new Date().toISOString(), // Assuming createdAt is not provided in the incoming object
      generalInfo: {
        size: `${data.basic_details.physical_properties.size.height_cm} x ${data.basic_details.physical_properties.size.width_cm} x ${data.basic_details.physical_properties.size.depth_cm} cm`,
        color: data.basic_details.physical_properties.color,
        weight: `${data.basic_details.physical_properties.weight_kg} kg`,
        volume: `${data.basic_details.physical_properties.volume_cm3} cm³`,
        recyclability: data.environmental.environmental_impact.recyclability,
        circularEconomy: data.environmental.environmental_impact.circular_economy,
      },
      features: data.basic_details.features_and_specifications.key_features.split("\n"),
      specifications: data.basic_details.features_and_specifications.specifications.split("\n"),
      materials: {
        components: data.materials.materials_composition.components.map((component) => ({
          name: component.component,
          material: component.material,
          supplier: component.supplier,
          weight: component.weight_kg,
          recycledContent: component.recycled_percentage,
        })),
        certifications: data.materials.materials_composition.certifications.split("\n"),
        chemicalInfo: data.materials.materials_composition.chemical_information,
      },
      packaging: {
        components: data.packaging.packaging_details.packaging_components.map((component) => ({
          name: component.component,
          material: component.material,
          supplier: component.supplier,
          weight: component.weight_kg,
          recycledContent: component.recycled_percentage,
        })),
        disposalInstructions: data.packaging.packaging_details.disposal_instructions,
      },
      supplyChain: {
        manufacturers: data.supply_chain.supply_chain_information.manufacturers.map((manufacturer) => ({
          name: manufacturer.name,
          location: manufacturer.location,
          role: manufacturer.role,
          certifications: manufacturer.certifications.split("\n"),
        })),
        processes: data.supply_chain.supply_chain_information.manufacturing_processes.map((process) => ({
          type: process.process,
          location: process.location,
        })),
      },
      environmentalImpact: {
        carbonFootprint: data.environmental.environmental_impact.carbon_footprint,
        energyConsumption: data.environmental.environmental_impact.energy_consumption,
        waterUsage: data.environmental.environmental_impact.water_usage,
        wasteEmissions: data.environmental.environmental_impact.waste_emissions,
      },
      careInstructions: data.care_and_repair.care_instructions.care_instructions.split("\n"),
      repair: {
        repairability: data.care_and_repair.repair_information.reparability,
        spareParts: data.care_and_repair.repair_information.spare_parts,
        repairServices: data.care_and_repair.repair_information.repair_services,
      },
      endOfLife: {
        disassembly: data.end_of_life.end_of_life_information.disassembly_instructions,
        recyclingOptions: data.end_of_life.end_of_life_information.recycling_options,
        takeback: data.end_of_life.end_of_life_information.take_back_programs,
      },
      company: {
        name: "Company Name", // Assuming company information is not provided in the incoming object
        website: "https://company-website.com", // Assuming company information is not provided in the incoming object
        support: "support@company.com", // Assuming company information is not provided in the incoming object
      },
    };

    return product;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductData(params.id);
      setProduct(data);
    };
    fetchData();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

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