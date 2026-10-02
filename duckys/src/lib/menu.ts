import type { Category, MenuItem, OptionGroup } from "./types";

/*
 * TEMPORARY MENU — placeholder items until Ducky's sends the real menu.
 * Prices are in cents. Swap emojis for real photos later (see README).
 */

export const categories: Category[] = [
  { id: "pizza", name: "Pizza", emoji: "🍕", blurb: "Stone-baked, cheese-pulled, quack-approved." },
  { id: "burgers", name: "Burgers", emoji: "🍔", blurb: "Smashed thin, stacked high, zero apologies." },
  { id: "wings", name: "Wings", emoji: "🍗", blurb: "Sauced, tossed and a little bit extra." },
  { id: "sides", name: "Sides", emoji: "🍟", blurb: "The sidekicks that steal the show." },
  { id: "drinks", name: "Drinks", emoji: "🥤", blurb: "Wet your beak." },
  { id: "desserts", name: "Desserts", emoji: "🍰", blurb: "Because you deserve it. Obviously." },
];

// ---------- Reusable option groups ----------

const pizzaSize: OptionGroup = {
  id: "size",
  name: "Size",
  type: "single",
  required: true,
  options: [
    { id: "s", label: 'Small 8"', priceDelta: 0, note: "Feeds 1" },
    { id: "m", label: 'Medium 12"', priceDelta: 400, note: "Feeds 2" },
    { id: "l", label: 'Large 14"', priceDelta: 700, note: "Feeds 3–4" },
    { id: "xl", label: 'Party 18"', priceDelta: 1200, note: "Feeds the flock" },
  ],
};

const pizzaCrust: OptionGroup = {
  id: "crust",
  name: "Crust",
  type: "single",
  required: true,
  options: [
    { id: "classic", label: "Classic hand-tossed", priceDelta: 0 },
    { id: "thin", label: "Thin & crispy", priceDelta: 0 },
    { id: "pan", label: "Deep pan", priceDelta: 150 },
    { id: "stuffed", label: "Cheese-stuffed crust", priceDelta: 250 },
  ],
};

const pizzaExtras: OptionGroup = {
  id: "extras",
  name: "Extra toppings",
  type: "multi",
  required: false,
  max: 5,
  options: [
    { id: "cheese", label: "Extra cheese", priceDelta: 150 },
    { id: "jalapeno", label: "Jalapeños", priceDelta: 100 },
    { id: "mushroom", label: "Mushrooms", priceDelta: 100 },
    { id: "olives", label: "Black olives", priceDelta: 100 },
    { id: "pepperoni", label: "Extra pepperoni", priceDelta: 200 },
    { id: "pineapple", label: "Pineapple (we won't judge)", priceDelta: 100 },
  ],
};

const burgerPatty: OptionGroup = {
  id: "patty",
  name: "Patty",
  type: "single",
  required: true,
  options: [
    { id: "single", label: "Single", priceDelta: 0 },
    { id: "double", label: "Double", priceDelta: 300 },
    { id: "triple", label: "Triple (brave)", priceDelta: 550 },
  ],
};

const burgerAddons: OptionGroup = {
  id: "addons",
  name: "Add-ons",
  type: "multi",
  required: false,
  max: 4,
  options: [
    { id: "cheese", label: "Cheese slice", priceDelta: 100 },
    { id: "bacon", label: "Crispy beef bacon", priceDelta: 200 },
    { id: "egg", label: "Fried egg", priceDelta: 150 },
    { id: "jalapeno", label: "Jalapeños", priceDelta: 75 },
    { id: "onion", label: "Caramelised onions", priceDelta: 75 },
  ],
};

const spiceLevel: OptionGroup = {
  id: "spice",
  name: "Spice level",
  type: "single",
  required: true,
  options: [
    { id: "mild", label: "Mild 😇", priceDelta: 0 },
    { id: "medium", label: "Medium 😏", priceDelta: 0 },
    { id: "hot", label: "Hot 🥵", priceDelta: 0 },
    { id: "ducking-hot", label: "Ducking Hot ☠️", priceDelta: 0 },
  ],
};

const makeItAMeal: OptionGroup = {
  id: "meal",
  name: "Make it a meal?",
  type: "single",
  required: true,
  options: [
    { id: "none", label: "Just the burger", priceDelta: 0 },
    { id: "meal", label: "Meal: fries + drink", priceDelta: 450 },
    { id: "big-meal", label: "Big meal: large fries + large drink", priceDelta: 650 },
  ],
};

const wingSauce: OptionGroup = {
  id: "sauce",
  name: "Sauce flavour",
  type: "single",
  required: true,
  options: [
    { id: "buffalo", label: "Classic Buffalo", priceDelta: 0 },
    { id: "honey-garlic", label: "Honey Garlic", priceDelta: 0 },
    { id: "lemon-pepper", label: "Lemon Pepper (dry)", priceDelta: 0 },
    { id: "bbq", label: "Smoky BBQ", priceDelta: 0 },
    { id: "nashville", label: "Nashville Hot", priceDelta: 0 },
  ],
};

const dip: OptionGroup = {
  id: "dip",
  name: "Dips",
  type: "multi",
  required: false,
  max: 3,
  options: [
    { id: "ranch", label: "Ranch", priceDelta: 75 },
    { id: "garlic", label: "Garlic mayo", priceDelta: 75 },
    { id: "cheese", label: "Cheese sauce", priceDelta: 100 },
    { id: "chipotle", label: "Chipotle", priceDelta: 75 },
  ],
};

const sideSize: OptionGroup = {
  id: "size",
  name: "Size",
  type: "single",
  required: true,
  options: [
    { id: "regular", label: "Regular", priceDelta: 0 },
    { id: "large", label: "Large", priceDelta: 150 },
  ],
};

const drinkSize: OptionGroup = {
  id: "size",
  name: "Size",
  type: "single",
  required: true,
  options: [
    { id: "s", label: "Small", priceDelta: 0 },
    { id: "m", label: "Medium", priceDelta: 50 },
    { id: "l", label: "Large", priceDelta: 100 },
  ],
};

// ---------- Items ----------

export const menu: MenuItem[] = [
  // Pizza — each pizza is a "flavour", customised by size / crust / toppings
  {
    id: "margherita",
    categoryId: "pizza",
    name: "Margherita Quackeroni",
    description: "San Marzano tomato, fresh mozzarella, basil. Simple. Iconic. Like us.",
    emoji: "🍕",
    basePrice: 899,
    tags: ["veg"],
    optionGroups: [pizzaSize, pizzaCrust, pizzaExtras],
  },
  {
    id: "pepperoni",
    categoryId: "pizza",
    name: "Pepperoni Pond",
    description: "A lake of mozzarella with a flock of crispy cupped pepperoni.",
    emoji: "🍕",
    basePrice: 1099,
    tags: ["bestseller"],
    optionGroups: [pizzaSize, pizzaCrust, pizzaExtras],
  },
  {
    id: "bbq-chicken",
    categoryId: "pizza",
    name: "BBQ Chicken Waddle",
    description: "Smoky BBQ base, grilled chicken, red onion, coriander.",
    emoji: "🍕",
    basePrice: 1199,
    tags: [],
    optionGroups: [pizzaSize, pizzaCrust, pizzaExtras],
  },
  {
    id: "fiery-fajita",
    categoryId: "pizza",
    name: "Fiery Fajita",
    description: "Fajita chicken, peppers, onions, jalapeños. Bring milk.",
    emoji: "🌶️",
    basePrice: 1199,
    tags: ["spicy", "new"],
    optionGroups: [pizzaSize, pizzaCrust, pizzaExtras],
  },
  {
    id: "veggie-garden",
    categoryId: "pizza",
    name: "Veggie Garden",
    description: "Mushrooms, peppers, olives, sweetcorn, onions. Greens, but make it fun.",
    emoji: "🥦",
    basePrice: 999,
    tags: ["veg"],
    optionGroups: [pizzaSize, pizzaCrust, pizzaExtras],
  },
  {
    id: "duckys-supreme",
    categoryId: "pizza",
    name: "Ducky's Supreme",
    description: "Everything we've got. Pepperoni, beef, chicken, peppers, olives. Chaos, deliciously.",
    emoji: "👑",
    basePrice: 1399,
    tags: ["bestseller"],
    optionGroups: [pizzaSize, pizzaCrust, pizzaExtras],
  },

  // Burgers
  {
    id: "classic-quacker",
    categoryId: "burgers",
    name: "The Classic Quacker",
    description: "Smashed beef, American cheese, pickles, Ducky sauce, toasted brioche.",
    emoji: "🍔",
    basePrice: 799,
    tags: ["bestseller"],
    optionGroups: [burgerPatty, burgerAddons, makeItAMeal],
  },
  {
    id: "zinger",
    categoryId: "burgers",
    name: "Crispy Zinger Fowl Play",
    description: "Buttermilk fried chicken, slaw, spicy mayo. Crunch level: illegal.",
    emoji: "🍗",
    basePrice: 849,
    tags: ["spicy"],
    optionGroups: [spiceLevel, burgerAddons, makeItAMeal],
  },
  {
    id: "mushroom-swiss",
    categoryId: "burgers",
    name: "Mushroom Swiss Swagger",
    description: "Beef patty, sautéed mushrooms, melted Swiss, truffle mayo.",
    emoji: "🍄",
    basePrice: 949,
    tags: ["new"],
    optionGroups: [burgerPatty, burgerAddons, makeItAMeal],
  },

  // Wings
  {
    id: "wings",
    categoryId: "wings",
    name: "Saucy Wings",
    description: "Crispy wings tossed in the sauce of your choosing. Napkins sold separately (jk, free).",
    emoji: "🍗",
    basePrice: 699,
    tags: ["bestseller", "spicy"],
    optionGroups: [
      {
        id: "pieces",
        name: "How many?",
        type: "single",
        required: true,
        options: [
          { id: "6", label: "6 pieces", priceDelta: 0 },
          { id: "12", label: "12 pieces", priceDelta: 600 },
          { id: "24", label: "24 pieces", priceDelta: 1500, note: "Share. Or don't." },
        ],
      },
      wingSauce,
      dip,
    ],
  },
  {
    id: "tenders",
    categoryId: "wings",
    name: "Golden Tenders",
    description: "Hand-breaded chicken strips. Crunchy outside, juicy inside.",
    emoji: "🍤",
    basePrice: 649,
    tags: [],
    optionGroups: [
      {
        id: "pieces",
        name: "How many?",
        type: "single",
        required: true,
        options: [
          { id: "3", label: "3 pieces", priceDelta: 0 },
          { id: "5", label: "5 pieces", priceDelta: 350 },
          { id: "8", label: "8 pieces", priceDelta: 700 },
        ],
      },
      dip,
    ],
  },

  // Sides
  {
    id: "fries",
    categoryId: "sides",
    name: "Waddle Fries",
    description: "Skin-on, double-fried, dangerously salty.",
    emoji: "🍟",
    basePrice: 299,
    tags: ["veg"],
    optionGroups: [
      sideSize,
      {
        id: "seasoning",
        name: "Seasoning",
        type: "single",
        required: true,
        options: [
          { id: "salted", label: "Sea salt", priceDelta: 0 },
          { id: "peri", label: "Peri-peri", priceDelta: 0 },
          { id: "cajun", label: "Cajun", priceDelta: 0 },
          { id: "loaded", label: "Loaded (cheese + jalapeños)", priceDelta: 200 },
        ],
      },
    ],
  },
  {
    id: "onion-rings",
    categoryId: "sides",
    name: "Onion Rings",
    description: "Beer-battered (alcohol-free) and golden.",
    emoji: "🧅",
    basePrice: 349,
    tags: ["veg"],
    optionGroups: [sideSize, dip],
  },
  {
    id: "garlic-bread",
    categoryId: "sides",
    name: "Cheesy Garlic Bread",
    description: "Garlic butter, mozzarella, herbs. Vampires hate it.",
    emoji: "🥖",
    basePrice: 399,
    tags: ["veg"],
    optionGroups: [
      {
        id: "style",
        name: "Style",
        type: "single",
        required: true,
        options: [
          { id: "plain", label: "Classic", priceDelta: 0 },
          { id: "cheesy", label: "Extra cheesy", priceDelta: 100 },
        ],
      },
    ],
  },

  // Drinks
  {
    id: "soft-drink",
    categoryId: "drinks",
    name: "Fizzy Pond",
    description: "Ice-cold soft drink.",
    emoji: "🥤",
    basePrice: 199,
    tags: [],
    optionGroups: [
      drinkSize,
      {
        id: "flavour",
        name: "Flavour",
        type: "single",
        required: true,
        options: [
          { id: "cola", label: "Cola", priceDelta: 0 },
          { id: "diet-cola", label: "Diet cola", priceDelta: 0 },
          { id: "lemon-lime", label: "Lemon-lime", priceDelta: 0 },
          { id: "orange", label: "Orange", priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: "shake",
    categoryId: "drinks",
    name: "Thicc Shake",
    description: "So thick the straw stands up on its own.",
    emoji: "🥛",
    basePrice: 499,
    tags: ["bestseller"],
    optionGroups: [
      {
        id: "flavour",
        name: "Flavour",
        type: "single",
        required: true,
        options: [
          { id: "vanilla", label: "Vanilla", priceDelta: 0 },
          { id: "chocolate", label: "Chocolate", priceDelta: 0 },
          { id: "strawberry", label: "Strawberry", priceDelta: 0 },
          { id: "oreo", label: "Oreo", priceDelta: 100 },
          { id: "lotus", label: "Lotus Biscoff", priceDelta: 150 },
        ],
      },
      {
        id: "toppings",
        name: "Toppings",
        type: "multi",
        required: false,
        max: 2,
        options: [
          { id: "cream", label: "Whipped cream", priceDelta: 50 },
          { id: "sprinkles", label: "Sprinkles", priceDelta: 50 },
        ],
      },
    ],
  },
  {
    id: "lemonade",
    categoryId: "drinks",
    name: "Mint Lemonade",
    description: "Fresh lemon, mint, crushed ice. Instant attitude adjustment.",
    emoji: "🍋",
    basePrice: 349,
    tags: ["veg", "new"],
    optionGroups: [drinkSize],
  },

  // Desserts
  {
    id: "lava-cake",
    categoryId: "desserts",
    name: "Molten Lava Cake",
    description: "Warm chocolate cake with a gooey centre that oozes drama.",
    emoji: "🍫",
    basePrice: 549,
    tags: ["bestseller"],
    optionGroups: [
      {
        id: "side",
        name: "Serve with",
        type: "single",
        required: true,
        options: [
          { id: "none", label: "Nothing, I'm a purist", priceDelta: 0 },
          { id: "ice-cream", label: "Vanilla ice cream", priceDelta: 150 },
        ],
      },
    ],
  },
  {
    id: "brownie",
    categoryId: "desserts",
    name: "Fudge Brownie",
    description: "Dense, fudgy, unreasonably good.",
    emoji: "🟫",
    basePrice: 399,
    tags: ["veg"],
    optionGroups: [],
  },
  {
    id: "sundae",
    categoryId: "desserts",
    name: "Duckling Sundae",
    description: "Two scoops, hot fudge, nuts, cherry on top. Obviously.",
    emoji: "🍨",
    basePrice: 449,
    tags: ["veg"],
    optionGroups: [
      {
        id: "scoops",
        name: "Scoop flavours",
        type: "single",
        required: true,
        options: [
          { id: "vanilla", label: "Vanilla", priceDelta: 0 },
          { id: "chocolate", label: "Chocolate", priceDelta: 0 },
          { id: "mixed", label: "One of each", priceDelta: 0 },
        ],
      },
    ],
  },
];

export function getItem(id: string): MenuItem | undefined {
  return menu.find((m) => m.id === id);
}
