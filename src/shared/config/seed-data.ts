export const STORAGE_LOCATIONS = [
  { id: "loc-fridge", name: "Nevera", type: "fridge", sortOrder: 0 },
  { id: "loc-freezer", name: "Congelador", type: "freezer", sortOrder: 1 },
  { id: "loc-pantry", name: "Despensa", type: "pantry", sortOrder: 2 },
  { id: "loc-drinks", name: "Bebidas", type: "drinks", sortOrder: 3 },
  { id: "loc-snacks", name: "Snacks", type: "snacks", sortOrder: 4 },
];

export const FOOD_CATALOG = [
  { id: "food-milk", name: "Leche entera", defaultUnit: "L", category: "Lácteos" },
  { id: "food-eggs", name: "Huevos", defaultUnit: "unidad", category: "Lácteos" },
  { id: "food-butter", name: "Mantequilla", defaultUnit: "g", category: "Lácteos" },
  { id: "food-cheese", name: "Queso cheddar", defaultUnit: "g", category: "Lácteos" },
  { id: "food-yogurt", name: "Yogur griego", defaultUnit: "unidad", category: "Lácteos" },
  { id: "food-chicken", name: "Pechuga de pollo", defaultUnit: "g", category: "Carne" },
  { id: "food-beef", name: "Carne picada", defaultUnit: "g", category: "Carne" },
  { id: "food-salmon", name: "Salmón", defaultUnit: "g", category: "Pescado" },
  { id: "food-rice", name: "Arroz integral", defaultUnit: "g", category: "Cereales" },
  { id: "food-pasta", name: "Penne", defaultUnit: "g", category: "Cereales" },
  { id: "food-bread", name: "Pan de masa madre", defaultUnit: "unidad", category: "Panadería" },
  { id: "food-tomato", name: "Tomates", defaultUnit: "unidad", category: "Verduras" },
  { id: "food-onion", name: "Cebolla", defaultUnit: "unidad", category: "Verduras" },
  { id: "food-garlic", name: "Ajo", defaultUnit: "unidad", category: "Verduras" },
  { id: "food-spinach", name: "Espinacas frescas", defaultUnit: "g", category: "Verduras" },
  { id: "food-pepper", name: "Pimiento", defaultUnit: "unidad", category: "Verduras" },
  { id: "food-carrot", name: "Zanahorias", defaultUnit: "unidad", category: "Verduras" },
  { id: "food-potato", name: "Patatas", defaultUnit: "unidad", category: "Verduras" },
  { id: "food-avocado", name: "Aguacate", defaultUnit: "unidad", category: "Frutas" },
  { id: "food-lemon", name: "Limón", defaultUnit: "unidad", category: "Frutas" },
  { id: "food-banana", name: "Plátanos", defaultUnit: "unidad", category: "Frutas" },
  { id: "food-apple", name: "Manzanas", defaultUnit: "unidad", category: "Frutas" },
  { id: "food-olive-oil", name: "Aceite de oliva", defaultUnit: "ml", category: "Aceites" },
  { id: "food-salt", name: "Sal", defaultUnit: "g", category: "Condimentos" },
  { id: "food-pepper-spice", name: "Pimienta negra", defaultUnit: "g", category: "Condimentos" },
];

export const RECIPES = [
  {
    id: "recipe-pasta-tomato",
    title: "Pasta con salsa de tomate fresco",
    description: "Una pasta sencilla y deliciosa con salsa de tomate y ajo.",
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    tags: ["cena", "rápido", "vegetariano"],
    instructions: `Pon a hervir agua con sal en una olla grande. Cocina la pasta según las instrucciones.
Mientras, calienta aceite de oliva en una sartén a fuego medio.
Añade el ajo picado y cocina 30 segundos hasta que esté fragante.
Añade los tomates troceados, sal y pimienta. Cocina 10-12 minutos hasta que se deshagan.
Escurre la pasta y mézclala con la salsa.
Sirve con albahaca fresca si tienes.`,
    ingredients: [
      { foodCatalogItemId: "food-pasta", nameFallback: "Penne", quantity: 400, unit: "g", optional: false, sortOrder: 0 },
      { foodCatalogItemId: "food-tomato", nameFallback: "Tomates", quantity: 6, unit: "unidad", optional: false, sortOrder: 1 },
      { foodCatalogItemId: "food-garlic", nameFallback: "Ajo", quantity: 3, unit: "unidad", optional: false, sortOrder: 2 },
      { foodCatalogItemId: "food-olive-oil", nameFallback: "Aceite de oliva", quantity: 30, unit: "ml", optional: false, sortOrder: 3 },
      { foodCatalogItemId: "food-salt", nameFallback: "Sal", quantity: 5, unit: "g", optional: false, sortOrder: 4 },
      { foodCatalogItemId: "food-pepper-spice", nameFallback: "Pimienta", quantity: 2, unit: "g", optional: true, sortOrder: 5 },
    ],
  },
  {
    id: "recipe-chicken-rice",
    title: "Bol de pollo con arroz",
    description: "Una comida equilibrada con pechuga de pollo sobre arroz integral.",
    servings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    tags: ["comida", "cena", "saludable"],
    instructions: `Sazona las pechugas con sal, pimienta y aceite de oliva.
Cocina el pollo en una sartén a fuego medio-alto 6-7 minutos por cada lado.
Mientras, cocina el arroz integral según las instrucciones.
Corta el pollo en lonchas y sírvelo sobre el arroz.
Añade verduras frescas si tienes.`,
    ingredients: [
      { foodCatalogItemId: "food-chicken", nameFallback: "Pechuga de pollo", quantity: 400, unit: "g", optional: false, sortOrder: 0 },
      { foodCatalogItemId: "food-rice", nameFallback: "Arroz integral", quantity: 200, unit: "g", optional: false, sortOrder: 1 },
      { foodCatalogItemId: "food-olive-oil", nameFallback: "Aceite de oliva", quantity: 15, unit: "ml", optional: false, sortOrder: 2 },
      { foodCatalogItemId: "food-salt", nameFallback: "Sal", quantity: 3, unit: "g", optional: false, sortOrder: 3 },
      { foodCatalogItemId: "food-pepper-spice", nameFallback: "Pimienta", quantity: 2, unit: "g", optional: false, sortOrder: 4 },
      { foodCatalogItemId: "food-pepper", nameFallback: "Pimiento", quantity: 1, unit: "unidad", optional: true, sortOrder: 5 },
    ],
  },
  {
    id: "recipe-omelette",
    title: "Tortilla francesa clásica",
    description: "Una tortilla esponjosa con queso y espinacas.",
    servings: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 5,
    tags: ["desayuno", "rápido", "vegetariano"],
    instructions: `Bate los huevos con una pizca de sal y pimienta.
Calienta la mantequilla en una sartén antiadherente a fuego medio-bajo.
Vierte los huevos y deja cuajar 1-2 minutos.
Añade las espinacas y el queso en una mitad.
Dobla la tortilla por la mitad y deslízala al plato.`,
    ingredients: [
      { foodCatalogItemId: "food-eggs", nameFallback: "Huevos", quantity: 3, unit: "unidad", optional: false, sortOrder: 0 },
      { foodCatalogItemId: "food-butter", nameFallback: "Mantequilla", quantity: 15, unit: "g", optional: false, sortOrder: 1 },
      { foodCatalogItemId: "food-cheese", nameFallback: "Queso", quantity: 30, unit: "g", optional: false, sortOrder: 2 },
      { foodCatalogItemId: "food-spinach", nameFallback: "Espinacas", quantity: 30, unit: "g", optional: true, sortOrder: 3 },
      { foodCatalogItemId: "food-salt", nameFallback: "Sal", quantity: 1, unit: "g", optional: false, sortOrder: 4 },
    ],
  },
  {
    id: "recipe-salmon-veggies",
    title: "Salmón al horno con verduras",
    description: "Salmón saludable con patatas y zanahorias asadas.",
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    tags: ["cena", "saludable"],
    instructions: `Precalienta el horno a 200°C.
Coloca el salmón en una bandeja, rocía con aceite de oliva, sal y pimienta.
Corta las patatas y zanahorias, mézclalas con aceite, sal y pimienta.
Coloca las verduras alrededor del salmón en la bandeja.
Hornea 20-25 minutos hasta que el salmón se desmenuce fácilmente.
Exprime limón sobre el salmón antes de servir.`,
    ingredients: [
      { foodCatalogItemId: "food-salmon", nameFallback: "Salmón", quantity: 300, unit: "g", optional: false, sortOrder: 0 },
      { foodCatalogItemId: "food-potato", nameFallback: "Patatas", quantity: 3, unit: "unidad", optional: false, sortOrder: 1 },
      { foodCatalogItemId: "food-carrot", nameFallback: "Zanahorias", quantity: 3, unit: "unidad", optional: false, sortOrder: 2 },
      { foodCatalogItemId: "food-olive-oil", nameFallback: "Aceite de oliva", quantity: 30, unit: "ml", optional: false, sortOrder: 3 },
      { foodCatalogItemId: "food-lemon", nameFallback: "Limón", quantity: 1, unit: "unidad", optional: false, sortOrder: 4 },
      { foodCatalogItemId: "food-salt", nameFallback: "Sal", quantity: 3, unit: "g", optional: false, sortOrder: 5 },
      { foodCatalogItemId: "food-pepper-spice", nameFallback: "Pimienta", quantity: 2, unit: "g", optional: false, sortOrder: 6 },
    ],
  },
  {
    id: "recipe-avocado-toast",
    title: "Tostada de aguacate",
    description: "Tostada sencilla de aguacate con un toque de limón.",
    servings: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 2,
    tags: ["desayuno", "rápido", "vegetariano"],
    instructions: `Tuesta el pan de masa madre hasta que esté dorado.
Machaca el aguacate con un tenedor, añade sal, pimienta y zumo de limón.
Unta el aguacate sobre la tostada.
Rocía con un poco de aceite de oliva si quieres.`,
    ingredients: [
      { foodCatalogItemId: "food-bread", nameFallback: "Pan de masa madre", quantity: 2, unit: "unidad", optional: false, sortOrder: 0 },
      { foodCatalogItemId: "food-avocado", nameFallback: "Aguacate", quantity: 1, unit: "unidad", optional: false, sortOrder: 1 },
      { foodCatalogItemId: "food-lemon", nameFallback: "Limón", quantity: 0.5, unit: "unidad", optional: false, sortOrder: 2 },
      { foodCatalogItemId: "food-salt", nameFallback: "Sal", quantity: 1, unit: "g", optional: false, sortOrder: 3 },
      { foodCatalogItemId: "food-pepper-spice", nameFallback: "Pimienta", quantity: 1, unit: "g", optional: true, sortOrder: 4 },
    ],
  },
  {
    id: "recipe-beef-stir-fry",
    title: "Salteado de carne con verduras",
    description: "Salteado rápido de carne con cebolla, pimiento y zanahoria.",
    servings: 3,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    tags: ["cena", "rápido"],
    instructions: `Corta la carne en tiras finas.
Calienta aceite en un wok o sartén grande a fuego alto.
Saltea la carne 2-3 minutos hasta que esté dorada. Retírala.
Añade la cebolla, el pimiento y las zanahorias en rodajas. Cocina 3-4 minutos.
Vuelve a poner la carne, mezcla todo.
Sazona con sal y pimienta. Sirve sobre arroz si tienes.`,
    ingredients: [
      { foodCatalogItemId: "food-beef", nameFallback: "Carne picada", quantity: 500, unit: "g", optional: false, sortOrder: 0 },
      { foodCatalogItemId: "food-onion", nameFallback: "Cebolla", quantity: 2, unit: "unidad", optional: false, sortOrder: 1 },
      { foodCatalogItemId: "food-pepper", nameFallback: "Pimiento", quantity: 2, unit: "unidad", optional: false, sortOrder: 2 },
      { foodCatalogItemId: "food-carrot", nameFallback: "Zanahorias", quantity: 2, unit: "unidad", optional: false, sortOrder: 3 },
      { foodCatalogItemId: "food-olive-oil", nameFallback: "Aceite de oliva", quantity: 20, unit: "ml", optional: false, sortOrder: 4 },
      { foodCatalogItemId: "food-salt", nameFallback: "Sal", quantity: 3, unit: "g", optional: false, sortOrder: 5 },
      { foodCatalogItemId: "food-pepper-spice", nameFallback: "Pimienta", quantity: 2, unit: "g", optional: false, sortOrder: 6 },
    ],
  },
];

const now = new Date();
const day = 86400000;

export const INVENTORY_ITEMS = [
  { id: "inv-1", foodCatalogItemId: "food-milk", storageLocationId: "loc-fridge", quantity: 1, unit: "L", purchaseDate: new Date(now.getTime() - 3 * day), expirationDate: new Date(now.getTime() + 2 * day), status: "use_soon" as const },
  { id: "inv-2", foodCatalogItemId: "food-eggs", storageLocationId: "loc-fridge", quantity: 6, unit: "unidad", purchaseDate: new Date(now.getTime() - 5 * day), expirationDate: new Date(now.getTime() + 9 * day), status: "fresh" as const },
  { id: "inv-3", foodCatalogItemId: "food-butter", storageLocationId: "loc-fridge", quantity: 200, unit: "g", purchaseDate: new Date(now.getTime() - 7 * day), expirationDate: new Date(now.getTime() + 14 * day), status: "fresh" as const },
  { id: "inv-4", foodCatalogItemId: "food-cheese", storageLocationId: "loc-fridge", quantity: 150, unit: "g", purchaseDate: new Date(now.getTime() - 4 * day), expirationDate: new Date(now.getTime() + 1 * day), status: "critical" as const },
  { id: "inv-5", foodCatalogItemId: "food-chicken", storageLocationId: "loc-fridge", quantity: 500, unit: "g", purchaseDate: new Date(now.getTime() - 1 * day), expirationDate: new Date(now.getTime() + 2 * day), status: "use_soon" as const },
  { id: "inv-6", foodCatalogItemId: "food-spinach", storageLocationId: "loc-fridge", quantity: 100, unit: "g", purchaseDate: new Date(now.getTime() - 2 * day), expirationDate: new Date(now.getTime() - 1 * day), status: "expired" as const },
  { id: "inv-7", foodCatalogItemId: "food-tomato", storageLocationId: "loc-fridge", quantity: 8, unit: "unidad", purchaseDate: new Date(now.getTime() - 3 * day), expirationDate: new Date(now.getTime() + 4 * day), status: "fresh" as const },
  { id: "inv-8", foodCatalogItemId: "food-rice", storageLocationId: "loc-pantry", quantity: 1000, unit: "g", purchaseDate: new Date(now.getTime() - 30 * day), expirationDate: new Date(now.getTime() + 180 * day), status: "fresh" as const },
  { id: "inv-9", foodCatalogItemId: "food-pasta", storageLocationId: "loc-pantry", quantity: 500, unit: "g", purchaseDate: new Date(now.getTime() - 20 * day), expirationDate: new Date(now.getTime() + 200 * day), status: "fresh" as const },
  { id: "inv-10", foodCatalogItemId: "food-bread", storageLocationId: "loc-pantry", quantity: 1, unit: "unidad", purchaseDate: new Date(now.getTime() - 1 * day), expirationDate: new Date(now.getTime() + 2 * day), status: "use_soon" as const },
  { id: "inv-11", foodCatalogItemId: "food-onion", storageLocationId: "loc-pantry", quantity: 5, unit: "unidad", purchaseDate: new Date(now.getTime() - 10 * day), expirationDate: new Date(now.getTime() + 20 * day), status: "fresh" as const },
  { id: "inv-12", foodCatalogItemId: "food-garlic", storageLocationId: "loc-pantry", quantity: 1, unit: "unidad", purchaseDate: new Date(now.getTime() - 14 * day), expirationDate: new Date(now.getTime() + 30 * day), status: "fresh" as const },
  { id: "inv-13", foodCatalogItemId: "food-olive-oil", storageLocationId: "loc-pantry", quantity: 500, unit: "ml", purchaseDate: new Date(now.getTime() - 60 * day), expirationDate: new Date(now.getTime() + 300 * day), status: "fresh" as const },
  { id: "inv-14", foodCatalogItemId: "food-potato", storageLocationId: "loc-pantry", quantity: 6, unit: "unidad", purchaseDate: new Date(now.getTime() - 7 * day), expirationDate: new Date(now.getTime() + 14 * day), status: "fresh" as const },
  { id: "inv-15", foodCatalogItemId: "food-carrot", storageLocationId: "loc-fridge", quantity: 4, unit: "unidad", purchaseDate: new Date(now.getTime() - 4 * day), expirationDate: new Date(now.getTime() + 7 * day), status: "fresh" as const },
  { id: "inv-16", foodCatalogItemId: "food-pepper", storageLocationId: "loc-fridge", quantity: 3, unit: "unidad", purchaseDate: new Date(now.getTime() - 3 * day), expirationDate: new Date(now.getTime() + 5 * day), status: "fresh" as const },
  { id: "inv-17", foodCatalogItemId: "food-avocado", storageLocationId: "loc-fridge", quantity: 2, unit: "unidad", purchaseDate: new Date(now.getTime() - 2 * day), expirationDate: new Date(now.getTime() + 1 * day), status: "use_soon" as const },
  { id: "inv-18", foodCatalogItemId: "food-lemon", storageLocationId: "loc-fridge", quantity: 3, unit: "unidad", purchaseDate: new Date(now.getTime() - 5 * day), expirationDate: new Date(now.getTime() + 9 * day), status: "fresh" as const },
  { id: "inv-19", foodCatalogItemId: "food-yogurt", storageLocationId: "loc-fridge", quantity: 4, unit: "unidad", purchaseDate: new Date(now.getTime() - 3 * day), expirationDate: new Date(now.getTime() + 5 * day), status: "fresh" as const },
  { id: "inv-20", foodCatalogItemId: "food-banana", storageLocationId: "loc-pantry", quantity: 5, unit: "unidad", purchaseDate: new Date(now.getTime() - 2 * day), expirationDate: new Date(now.getTime() + 3 * day), status: "fresh" as const },
];

export const SHOPPING_LIST_ITEMS = [
  { id: "sl-1", label: "Albahaca", quantity: 1, unit: "unidad", category: "Hierbas", checked: false },
  { id: "sl-2", label: "Parmesano", quantity: 100, unit: "g", category: "Lácteos", checked: false },
  { id: "sl-3", label: "Caldo de pollo", quantity: 1, unit: "unidad", category: "Despensa", checked: true },
];
