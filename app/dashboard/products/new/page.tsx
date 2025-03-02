"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, ArrowLeft, Upload, Save, Plus, Trash } from "lucide-react"

const LAMBDA_URL = "https://jvr6bib2t26jsx3kf6hhnwomzu0jsyeq.lambda-url.eu-north-1.on.aws"; // Replace with your actual Lambda URL

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  // State variables for form fields
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    batch: "",
    category: "electronics",
    description: "",
    size_height: "",
    size_width: "",
    size_depth: "",
    color: "",
    weight: "",
    volume: "",
    features: "",
    specifications: "",
    component1: "",
    material1: "",
    supplier1: "",
    weight1: "",
    recycled_percentage1: "",
    component2: "",
    material2: "",
    supplier2: "",
    weight2: "",
    recycled_percentage2: "",
    certifications: "",
    chemical_info: "",
    manufacturer_name1: "",
    manufacturer_location1: "",
    manufacturer_role1: "",
    manufacturer_certifications1: "",
    manufacturer_name2: "",
    manufacturer_location2: "",
    manufacturer_role2: "",
    manufacturer_certifications2: "",
    process1: "",
    process_location1: "",
    process2: "",
    process_location2: "",
    packaging_component1: "",
    packaging_material1: "",
    packaging_supplier1: "",
    packaging_weight1: "",
    packaging_recycled_percentage1: "",
    packaging_component2: "",
    packaging_material2: "",
    packaging_supplier2: "",
    packaging_weight2: "",
    packaging_recycled_percentage2: "",
    disposal_instructions: "",
    carbon_footprint: "",
    energy_consumption: "",
    water_usage: "",
    waste_emissions: "",
    recyclability: "",
    circular_economy: "",
    care_instructions: "",
    repairability: "",
    spare_parts: "",
    repair_services: "",
    disassembly_instructions: "",
    recycling_options: "",
    take_back_programs: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const payload = {
      product_name: formData.name,
      product_data: {
        basic_details: {
          basic_information: {
            product_name: formData.name,
            SKU: formData.sku,
            batch_number: formData.batch,
            category: formData.category,
            description: formData.description,
          },
          physical_properties: {
            size: {
              height_cm: formData.size_height,
              width_cm: formData.size_width,
              depth_cm: formData.size_depth,
            },
            color: formData.color,
            weight_kg: formData.weight,
            volume_cm3: formData.volume,
          },
          features_and_specifications: {
            key_features: formData.features,
            specifications: formData.specifications,
          },
        },
        materials: {
          materials_composition: {
            components: [
              {
                component: formData.component1,
                material: formData.material1,
                supplier: formData.supplier1,
                weight_kg: formData.weight1,
                recycled_percentage: formData.recycled_percentage1,
              },
              {
                component: formData.component2,
                material: formData.material2,
                supplier: formData.supplier2,
                weight_kg: formData.weight2,
                recycled_percentage: formData.recycled_percentage2,
              },
            ],
            certifications: formData.certifications,
            chemical_information: formData.chemical_info,
          },
        },
        supply_chain: {
          supply_chain_information: {
            manufacturers: [
              {
                name: formData.manufacturer_name1,
                location: formData.manufacturer_location1,
                role: formData.manufacturer_role1,
                certifications: formData.manufacturer_certifications1,
              },
              {
                name: formData.manufacturer_name2,
                location: formData.manufacturer_location2,
                role: formData.manufacturer_role2,
                certifications: formData.manufacturer_certifications2,
              },
            ],
            manufacturing_processes: [
              {
                process: formData.process1,
                location: formData.process_location1,
              },
              {
                process: formData.process2,
                location: formData.process_location2,
              },
            ],
          },
        },
        packaging: {
          packaging_details: {
            packaging_components: [
              {
                component: formData.packaging_component1,
                material: formData.packaging_material1,
                supplier: formData.packaging_supplier1,
                weight_kg: formData.packaging_weight1,
                recycled_percentage: formData.packaging_recycled_percentage1,
              },
              {
                component: formData.packaging_component2,
                material: formData.packaging_material2,
                supplier: formData.packaging_supplier2,
                weight_kg: formData.packaging_weight2,
                recycled_percentage: formData.packaging_recycled_percentage2,
              },
            ],
            disposal_instructions: formData.disposal_instructions,
          },
        },
        environmental: {
          environmental_impact: {
            carbon_footprint: formData.carbon_footprint,
            energy_consumption: formData.energy_consumption,
            water_usage: formData.water_usage,
            waste_emissions: formData.waste_emissions,
            recyclability: formData.recyclability,
            circular_economy: formData.circular_economy,
          },
        },
        care_and_repair: {
          care_instructions: {
            care_instructions: formData.care_instructions,
          },
          repair_information: {
            reparability: formData.repairability,
            spare_parts: formData.spare_parts,
            repair_services: formData.repair_services,
          },
        },
        end_of_life: {
          end_of_life_information: {
            disassembly_instructions: formData.disassembly_instructions,
            recycling_options: formData.recycling_options,
            take_back_programs: formData.take_back_programs,
          },
        },
      },
    }

    try {
      const response = await fetch(`${LAMBDA_URL}/create_qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push("/dashboard/products")
      } else {
        console.error("Failed to create product")
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="supply_chain">Supply Chain</TabsTrigger>
            <TabsTrigger value="packaging">Packaging</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="care-repair">Care & Repair</TabsTrigger>
            <TabsTrigger value="end-of-life">End of Life</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details about your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" placeholder="Enter product name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" name="sku" placeholder="Enter product SKU" value={formData.sku} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="batch">Batch Number</Label>
                  <Input id="batch" name="batch" placeholder="Enter batch number" value={formData.batch} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={formData.category} name="category" onValueChange={(value) => setFormData((prevData) => ({ ...prevData, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="health">Health & Beauty</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Enter product description" value={formData.description} onChange={handleInputChange} className="min-h-[120px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Physical Properties</CardTitle>
                <CardDescription>Enter the physical characteristics of your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="size_height">Height (cm)</Label>
                    <Input id="size_height" name="size_height" placeholder="e.g., 10" value={formData.size_height} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="size_width">Width (cm)</Label>
                    <Input id="size_width" name="size_width" placeholder="e.g., 5" value={formData.size_width} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="size_depth">Depth (cm)</Label>
                    <Input id="size_depth" name="size_depth" placeholder="e.g., 2" value={formData.size_depth} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" name="color" placeholder="e.g., Matte Black" value={formData.color} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" name="weight" placeholder="e.g., 0.25" value={formData.weight} onChange={handleInputChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="volume">Volume (cm³)</Label>
                    <Input id="volume" name="volume" placeholder="e.g., 0.0027" value={formData.volume} onChange={handleInputChange} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features & Specifications</CardTitle>
                <CardDescription>Add technical details about your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="features">Key Features</Label>
                  <Textarea id="features" name="features" placeholder="Enter key product features (one per line)" value={formData.features} onChange={handleInputChange} className="min-h-[100px]" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="specifications">Specifications</Label>
                  <Textarea id="specifications" name="specifications" placeholder="Enter product specifications (one per line)" value={formData.specifications} onChange={handleInputChange} className="min-h-[100px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Materials Composition</CardTitle>
                <CardDescription>Add details about the materials used in your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Components</Label>
                    <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      Add Component
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Component</TableHead>
                          <TableHead>Material</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Weight</TableHead>
                          <TableHead>Recycled %</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Input placeholder="e.g., Headband" className="w-full" name="component1" value={formData.component1} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Aluminum" className="w-full" name="material1" value={formData.material1} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="Supplier name, location" className="w-full" name="supplier1" value={formData.supplier1} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 65g" className="w-full" name="weight1" value={formData.weight1} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 30%" className="w-full" name="recycled_percentage1" value={formData.recycled_percentage1} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Input placeholder="e.g., Headband" className="w-full" name="component2" value={formData.component2} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Aluminum" className="w-full" name="material2" value={formData.material2} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="Supplier name, location" className="w-full" name="supplier2" value={formData.supplier2} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 65g" className="w-full" name="weight2" value={formData.weight2} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 30%" className="w-full" name="recycled_percentage2" value={formData.recycled_percentage2} onChange={handleInputChange} />
                          </TableCell>
                          <TableCell>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                            Add components to provide detailed material information
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea id="certifications" name="certifications" placeholder="Enter relevant certifications (one per line)" value={formData.certifications} onChange={handleInputChange} className="min-h-[80px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="chemical_info">Chemical Information</Label>
                  <Textarea id="chemical_info" name="chemical_info" placeholder="Enter information about chemicals used or present in the product" value={formData.chemical_info} onChange={handleInputChange} className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supply_chain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Information</CardTitle>
                <CardDescription>Add details about manufacturers and production processes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Manufacturers</Label>
                    <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      Add Manufacturer
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Certifications</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Input placeholder="Manufacturer name" className="w-full" name="manufacturer_name1" value={formData.manufacturer_name1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Shenzhen, China" className="w-full" name="manufacturer_location1" value={formData.manufacturer_location1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Final Assembly" className="w-full" name="manufacturer_role1" value={formData.manufacturer_role1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., ISO 9001, ISO 14001" className="w-full" name="manufacturer_certifications1" value={formData.manufacturer_certifications1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Manufacturing Processes</Label>
                    <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      Add Process
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Process</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Input placeholder="e.g., Component Manufacturing" className="w-full" name="process1" value={formData.process1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Taiwan, China, Malaysia" className="w-full" name="process_location1" value={formData.process_location1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packaging" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Packaging Details</CardTitle>
                <CardDescription>Add information about product packaging materials.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Packaging Components</Label>
                    <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      Add Component
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Component</TableHead>
                          <TableHead>Material</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Weight</TableHead>
                          <TableHead>Recycled %</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Input placeholder="e.g., Outer Box" className="w-full" name="component1" value={formData.component1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Cardboard" className="w-full" name="material1" value={formData.material1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="Supplier name, location" className="w-full" name="supplier1" value={formData.supplier1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 120g" className="w-full" name="weight1" value={formData.weight1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 90%" className="w-full" name="recycled_percentage1" value={formData.recycled_percentage1} onChange={handleInputChange}  />
                          </TableCell>
                          <TableCell>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="disposal-instructions">Disposal Instructions</Label>
                  <Textarea id="disposal-instructions" name="disposal_instructions" placeholder="Enter instructions for proper disposal of packaging" value={formData.disposal_instructions} onChange={handleInputChange} className="min-h-[100px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>{"Add information about the product's environmental footprint."}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="carbon-footprint">Carbon Footprint</Label>
                    <Input id="carbon-footprint" name="carbon_footprint" value={formData.carbon_footprint} onChange={handleInputChange} placeholder="e.g., 8.5 kg CO2e for full product lifecycle" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="energy-consumption">Energy Consumption</Label>
                    <Input id="energy-consumption" name="energy_consumption" value={formData.energy_consumption} onChange={handleInputChange} placeholder="e.g., Manufacturing: 12 kWh per unit" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="water-usage">Water Usage</Label>
                    <Input id="water-usage" name="water_usage" value={formData.water_usage} onChange={handleInputChange} placeholder="e.g., Manufacturing: 45 liters per unit" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="waste-emissions">Waste Emissions</Label>
                    <Input id="waste-emissions" name="waste_emissions" value={formData.waste_emissions} onChange={handleInputChange} placeholder="e.g., 0.5 kg non-recyclable manufacturing waste per unit" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="recyclability">Recyclability</Label>
                  <Input id="recyclability" name="recyclability" value={formData.recyclability} onChange={handleInputChange} placeholder="e.g., 80% recyclable components" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="circular-economy">Circular Economy</Label>
                  <Textarea id="circular-economy" name="circular_economy" placeholder="Describe how this product fits into a circular economy" value={formData.circular_economy} onChange={handleInputChange} className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care-repair" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Care Instructions</CardTitle>
                <CardDescription>Add information about how to maintain the product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="care-instructions">Care Instructions</Label>
                  <Textarea id="care-instructions" name="care_instructions" placeholder="Enter care instructions (one per line)" value={formData.care_instructions} onChange={handleInputChange} className="min-h-[120px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Repair Information</CardTitle>
                <CardDescription>Add details about repairing and servicing the product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="repairability">Repairability</Label>
                  <Input id="repairability" name="repairability" placeholder="e.g., Repairability score: 7/10" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="spare-parts">Spare Parts</Label>
                  <Textarea id="spare-parts" name="spare_parts" placeholder="Information about available spare parts" value={formData.spare_parts} onChange={handleInputChange} className="min-h-[80px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="repair-services">Repair Services</Label>
                  <Textarea id="repair-services" name="repair_services" placeholder="Information about repair services and warranty" value={formData.repair_services} onChange={handleInputChange} className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="end-of-life" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>End-of-Life Information</CardTitle>
                <CardDescription>Add details about proper disposal and recycling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="disassembly">Disassembly Instructions</Label>
                  <Textarea id="disassembly" name="disassembly_instructions" placeholder="Instructions for disassembling the product for recycling" value={formData.disassembly_instructions} onChange={handleInputChange} className="min-h-[100px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="recycling-options">Recycling Options</Label>
                  <Textarea id="recycling-options" name="recycling_options" placeholder="Information about recycling options for the product" value={formData.recycling_options} onChange={handleInputChange} className="min-h-[100px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="takeback">Take-Back Programs</Label>
                  <Textarea id="takeback" name="take_back_programs" placeholder="Information about manufacturer take-back programs" value={formData.take_back_programs} onChange={handleInputChange} className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload images of your product that will be displayed when the QR code is scanned.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                    <div className="flex flex-col items-center justify-center space-y-2 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Drag & drop files or click to upload</p>
                        <p className="text-xs text-muted-foreground">Supports JPG, PNG and WebP up to 5MB</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {/* Placeholder for uploaded images */}
                    <div className="relative aspect-square rounded-md bg-muted/50 flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">Preview</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Settings</CardTitle>
                <CardDescription>Customize how your QR code will look and function.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="qr-type">QR Code Type</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select QR code type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="branded">Branded</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="qr-color">QR Code Color</Label>
                  <div className="flex gap-4">
                    <Input id="qr-color" type="color" defaultValue="#6366f1" className="w-12 h-10 p-1" />
                    <Input type="text" defaultValue="#6366f1" className="flex-1" />
                  </div>
                </div>

                <div className="grid gap-4">
                  <Label>Preview</Label>
                  <div className="flex items-center justify-center p-6 bg-white rounded-lg">
                    <div className="h-48 w-48 flex items-center justify-center">
                      <QrCode className="h-full w-full text-primary" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="gap-1">
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}

// Import Table components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"