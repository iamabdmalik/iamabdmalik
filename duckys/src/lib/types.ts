export type Option = {
  id: string;
  label: string;
  /** Price added on top of the item's base price, in cents. */
  priceDelta: number;
  note?: string;
};

export type OptionGroup = {
  id: string;
  name: string;
  /** "single" = pick exactly one (radio), "multi" = pick any (checkbox). */
  type: "single" | "multi";
  required: boolean;
  /** Max picks for multi groups. */
  max?: number;
  options: Option[];
};

export type Tag = "bestseller" | "spicy" | "veg" | "new";

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  /** Placeholder visual until real food photos are added. */
  emoji: string;
  /** Base price in cents (before options). */
  basePrice: number;
  tags: Tag[];
  optionGroups: OptionGroup[];
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
};

/** groupId -> selected option ids */
export type Selections = Record<string, string[]>;

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  emoji: string;
  selections: Selections;
  summary: string;
  unitPrice: number;
  quantity: number;
};

export type OrderType = "delivery" | "pickup";

export type OrderRequest = {
  customer: { name: string; phone: string; address?: string; notes?: string };
  orderType: OrderType;
  lines: { itemId: string; selections: Selections; quantity: number }[];
};

export type Order = {
  id: string;
  createdAt: string;
  status: "received" | "preparing" | "out-for-delivery" | "ready" | "completed";
  orderType: OrderType;
  customer: OrderRequest["customer"];
  lines: { itemId: string; name: string; summary: string; quantity: number; unitPrice: number; lineTotal: number }[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  etaMinutes: number;
};
