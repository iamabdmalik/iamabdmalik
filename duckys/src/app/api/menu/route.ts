import { NextResponse } from "next/server";
import { categories, menu } from "@/lib/menu";

export function GET() {
  return NextResponse.json({ categories, items: menu });
}
