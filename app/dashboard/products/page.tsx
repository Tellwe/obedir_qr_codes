"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, QrCode, Edit, Trash, Eye, Recycle } from "lucide-react"

// Sample product data
const initialProducts =  [
  {
    id: "1",
    name: "EcoTech Performance Jacket",
    category: "Textiles",
    createdAt: "2025-03-02",
    status: "active",
    scans: 145,
    recyclability: "85%",
    materials: ["Recycled Polyester", "Organic Cotton", "Recycled Nylon"]
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Textiles",
    createdAt: "2024-06-10",
    status: "active",
    scans: 89,
    recyclability: "95%",
    materials: ["Organic Cotton", "Water-based Dye"]
  },
  {
    id: "3",
    name: "Merino Wool Sweater",
    category: "Textiles",
    createdAt: "2024-08-15",
    status: "active",
    scans: 212,
    recyclability: "80%",
    materials: ["Merino Wool", "Natural Dyes"]
  },
  {
    id: "4",
    name: "Denim Jeans",
    category: "Textiles",
    createdAt: "2024-09-25",
    status: "inactive",
    scans: 37,
    recyclability: "75%",
    materials: ["Organic Cotton", "Recycled Polyester", "Metal Buttons"]
  },
  {
    id: "5",
    name: "Recycled Polyester Windbreaker",
    category: "Textiles",
    createdAt: "2024-11-05",
    status: "active",
    scans: 64,
    recyclability: "90%",
    materials: ["Recycled Polyester", "Waterproof Coating"]
  }
]

export default function ProductsPage() {
  const [products] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your products and their QR codes.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>View and manage all your products with QR codes.</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
            <Input
              type="search"
              placeholder="Search products..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scans</TableHead>
                <TableHead>Recyclability</TableHead>
                <TableHead>Materials</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No products found. Try a different search or add a new product.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                    </TableCell>
                    <TableCell>{product.scans}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Recycle className="h-3.5 w-3.5 text-primary" />
                        {product.recyclability}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.materials.slice(0, 2).map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                        {product.materials.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.materials.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <QrCode className="h-4 w-4" />
                          <span className="sr-only">QR Code</span>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/product/${product.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}