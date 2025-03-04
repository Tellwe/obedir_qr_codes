"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ProductForm from "@/components/product-form"

const LAMBDA_URL = "https://jvr6bib2t26jsx3kf6hhnwomzu0jsyeq.lambda-url.eu-north-1.on.aws"; // Replace with your actual Lambda URL

export default function EditProductPage() {
  const { id } = useParams()
  const [initialData, setInitialData] = useState(null)

  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(`${LAMBDA_URL}/read_qr/${id}`)
          if (!response.ok) {
            throw new Error("Failed to fetch product data")
          }
          const data = await response.json()
          setInitialData(data)

        } catch (error) {
          console.error("Error fetching product data:", error)
        }
      }
      fetchProductData()
    }
  }, [id])

  if (!initialData) {
    return <div>Loading...</div>
  }

  return <ProductForm initialData={initialData} isEditMode={true} />
}