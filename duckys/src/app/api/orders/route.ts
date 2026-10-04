import { NextResponse } from "next/server";
import { OrderError, buildOrder, saveOrder } from "@/lib/orders";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  try {
    const order = buildOrder(body);
    await saveOrder(order);
    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    if (e instanceof OrderError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error(e);
    return NextResponse.json({ error: "Something went quackers. Try again." }, { status: 500 });
  }
}
