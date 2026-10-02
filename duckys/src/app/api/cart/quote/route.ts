import { NextResponse } from "next/server";
import { getItem } from "@/lib/menu";
import { SelectionError, lineKey, summarize, unitPrice, validateSelections } from "@/lib/pricing";

/** Validates an item + options and returns the authoritative price before it goes in the cart. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const item = body?.itemId ? getItem(String(body.itemId)) : undefined;
  if (!item) return NextResponse.json({ error: "That item flew away 🦆" }, { status: 404 });

  try {
    const selections = validateSelections(item, body.selections ?? {});
    return NextResponse.json({
      key: lineKey(item.id, selections),
      itemId: item.id,
      name: item.name,
      emoji: item.emoji,
      selections,
      summary: summarize(item, selections),
      unitPrice: unitPrice(item, selections),
    });
  } catch (e) {
    const message = e instanceof SelectionError ? e.message : "Invalid options";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
