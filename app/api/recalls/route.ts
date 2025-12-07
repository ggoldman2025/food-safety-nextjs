import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const recalls = await prisma.recall.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return NextResponse.json(recalls)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recalls" }, { status: 500 })
  }
}
