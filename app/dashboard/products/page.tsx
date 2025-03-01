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
const initialProducts = [
  {
    id: "1",
    name: "Premium Headphones",
    category: "Electronics",
    createdAt: "2023-10-15",
    status: "active",
    scans: 145,
    recyclability: "80%",
    materials: ["Aluminum", "Plastic", "Leather"],
  },
  {
    id: "2",
    name: "Organic Coffee Beans",
    category: "Food & Beverage",
    createdAt: "2023-11-02",
    status: "active",
    scans: 89,
    recyclability: "95%",
    materials: ["Organic Coffee", "Paper", "Bioplastic"],
  },
  {
    id: "3",
    name: "Fitness Tracker",
    category: "Wearables",
    createdAt: "2023-12-10",
    status: "active",
    scans: 212,
    recyclability: "65%",
    materials: ["Silicone", "Electronics", "Glass"],
  },
  {
    id: "4",
    name: "Leather Wallet",
    category: "Accessories",
    createdAt: "2024-01-05",
    status: "inactive",
    scans: 37,
    recyclability: "90%",
    materials: ["Leather", "Cotton", "Metal"],
  },
  {
    id: "5",
    name: "Vitamin Supplement",
    category: "Health",
    createdAt: "2024-01-20",
    status: "active",
    scans: 64,
    recyclability: "75%",
    materials: ["Vitamins", "Gelatin", "Paper"],
  },
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