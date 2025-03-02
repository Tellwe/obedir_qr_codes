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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      product_name: formData.get("name"),
      product_data: {
        basic_details: {
          basic_information: {
            product_name: formData.get("name"),
            SKU: formData.get("sku"),
            batch_number: formData.get("batch"),
            category: formData.get("category"),
            description: formData.get("description"),
          },
          physical_properties: {
            size: {
              height_cm: formData.get("size_height"),
              width_cm: formData.get("size_width"),
              depth_cm: formData.get("size_depth"),
            },
            color: formData.get("color"),
            weight_kg: formData.get("weight"),
            volume_cm3: formData.get("volume"),
          },
          features_and_specifications: {
            key_features: formData.get("features"),
            specifications: formData.get("specifications"),
          },
        },
        materials: {
          materials_composition: {
            components: [
              {
                component: formData.get("component1"),
                material: formData.get("material1"),
                supplier: formData.get("supplier1"),
                weight_kg: formData.get("weight1"),
                recycled_percentage: formData.get("recycled_percentage1"),
              },
              {
                component: formData.get("component2"),
                material: formData.get("material2"),
                supplier: formData.get("supplier2"),
                weight_kg: formData.get("weight2"),
                recycled_percentage: formData.get("recycled_percentage2"),
              },
            ],
            certifications: formData.get("certifications"),
            chemical_information: formData.get("chemical_info"),
          },
        },
        supply_chain: {
          supply_chain_information: {
            manufacturers: [
              {
                name: formData.get("manufacturer_name1"),
                location: formData.get("manufacturer_location1"),
                role: formData.get("manufacturer_role1"),
                certifications: formData.get("manufacturer_certifications1"),
              },
              {
                name: formData.get("manufacturer_name2"),
                location: formData.get("manufacturer_location2"),
                role: formData.get("manufacturer_role2"),
                certifications: formData.get("manufacturer_certifications2"),
              },
            ],
            manufacturing_processes: [
              {
                process: formData.get("process1"),
                location: formData.get("process_location1"),
              },
              {
                process: formData.get("process2"),
                location: formData.get("process_location2"),
              },
            ],
          },
        },
        packaging: {
          packaging_details: {
            packaging_components: [
              {
                component: formData.get("packaging_component1"),
                material: formData.get("packaging_material1"),
                supplier: formData.get("packaging_supplier1"),
                weight_kg: formData.get("packaging_weight1"),
                recycled_percentage: formData.get("packaging_recycled_percentage1"),
              },
              {
                component: formData.get("packaging_component2"),
                material: formData.get("packaging_material2"),
                supplier: formData.get("packaging_supplier2"),
                weight_kg: formData.get("packaging_weight2"),
                recycled_percentage: formData.get("packaging_recycled_percentage2"),
              },
            ],
            disposal_instructions: formData.get("disposal_instructions"),
          },
        },
        environmental: {
          environmental_impact: {
            carbon_footprint: formData.get("carbon_footprint"),
            energy_consumption: formData.get("energy_consumption"),
            water_usage: formData.get("water_usage"),
            waste_emissions: formData.get("waste_emissions"),
            recyclability: formData.get("recyclability"),
            circular_economy: formData.get("circular_economy"),
          },
        },
        care_and_repair: {
          care_instructions: {
            care_instructions: formData.get("care_instructions"),
          },
          repair_information: {
            reparability: formData.get("repairability"),
            spare_parts: formData.get("spare_parts"),
            repair_services: formData.get("repair_services"),
          },
        },
        end_of_life: {
          end_of_life_information: {
            disassembly_instructions: formData.get("disassembly_instructions"),
            recycling_options: formData.get("recycling_options"),
            take_back_programs: formData.get("take_back_programs"),
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
            <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
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
                  <Input id="name" name="name" placeholder="Enter product name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" name="sku" placeholder="Enter product SKU" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="batch">Batch Number</Label>
                  <Input id="batch" name="batch" placeholder="Enter batch number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="electronics" name="category">
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
                  <Textarea id="description" name="description" placeholder="Enter product description" className="min-h-[120px]" />
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
                    <Input id="size_height" name="size_height" placeholder="e.g., 10" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="size_width">Width (cm)</Label>
                    <Input id="size_width" name="size_width" placeholder="e.g., 5" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="size_depth">Depth (cm)</Label>
                    <Input id="size_depth" name="size_depth" placeholder="e.g., 2" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" name="color" placeholder="e.g., Matte Black" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" name="weight" placeholder="e.g., 0.25" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="volume">Volume (cm³)</Label>
                    <Input id="volume" name="volume" placeholder="e.g., 0.0027" />
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
                  <Textarea id="features" name="features" placeholder="Enter key product features (one per line)" className="min-h-[100px]" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="specifications">Specifications</Label>
                  <Textarea id="specifications" name="specifications" placeholder="Enter product specifications (one per line)" className="min-h-[100px]" />
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
                            <Input placeholder="e.g., Headband" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Aluminum" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="Supplier name, location" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 65g" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 30%" className="w-full" />
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
                  <Textarea id="certifications" name="certifications" placeholder="Enter relevant certifications (one per line)" className="min-h-[80px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="chemical-info">Chemical Information</Label>
                  <Textarea id="chemical-info" name="chemical_info" placeholder="Enter information about chemicals used or present in the product" className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supply-chain" className="space-y-4">
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
                            <Input placeholder="Manufacturer name" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Shenzhen, China" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Final Assembly" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., ISO 9001, ISO 14001" className="w-full" />
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
                            <Input placeholder="e.g., Component Manufacturing" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Taiwan, China, Malaysia" className="w-full" />
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
                            <Input placeholder="e.g., Outer Box" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., Cardboard" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="Supplier name, location" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 120g" className="w-full" />
                          </TableCell>
                          <TableCell>
                            <Input placeholder="e.g., 90%" className="w-full" />
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
                  <Textarea id="disposal-instructions" name="disposal_instructions" placeholder="Enter instructions for proper disposal of packaging" className="min-h-[100px]" />
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
                    <Input id="carbon-footprint" name="carbon_footprint" placeholder="e.g., 8.5 kg CO2e for full product lifecycle" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="energy-consumption">Energy Consumption</Label>
                    <Input id="energy-consumption" name="energy_consumption" placeholder="e.g., Manufacturing: 12 kWh per unit" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="water-usage">Water Usage</Label>
                    <Input id="water-usage" name="water_usage" placeholder="e.g., Manufacturing: 45 liters per unit" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="waste-emissions">Waste Emissions</Label>
                    <Input id="waste-emissions" name="waste_emissions" placeholder="e.g., 0.5 kg non-recyclable manufacturing waste per unit" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="recyclability">Recyclability</Label>
                  <Input id="recyclability" name="recyclability" placeholder="e.g., 80% recyclable components" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="circular-economy">Circular Economy</Label>
                  <Textarea id="circular-economy" name="circular_economy" placeholder="Describe how this product fits into a circular economy" className="min-h-[80px]" />
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
                  <Textarea id="care-instructions" name="care_instructions" placeholder="Enter care instructions (one per line)" className="min-h-[120px]" />
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
                  <Textarea id="spare-parts" name="spare_parts" placeholder="Information about available spare parts" className="min-h-[80px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="repair-services">Repair Services</Label>
                  <Textarea id="repair-services" name="repair_services" placeholder="Information about repair services and warranty" className="min-h-[80px]" />
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
                  <Textarea id="disassembly" name="disassembly_instructions" placeholder="Instructions for disassembling the product for recycling" className="min-h-[100px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="recycling-options">Recycling Options</Label>
                  <Textarea id="recycling-options" name="recycling_options" placeholder="Information about recycling options for the product" className="min-h-[100px]" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="takeback">Take-Back Programs</Label>
                  <Textarea id="takeback" name="take_back_programs" placeholder="Information about manufacturer take-back programs" className="min-h-[80px]" />
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