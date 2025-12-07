import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const stores = await prisma.companyLink.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(stores)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stores" }, { status: 500 })
  }
}
