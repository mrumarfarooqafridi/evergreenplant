// Mock database for development when MongoDB is not available
const mockUsers = [
  {
    _id: "admin001",
    name: "Admin User",
    email: "admin@evergreen.com",
    password: "$2a$10$hashedpassword", // "admin123" hashed
    role: "admin",
    isBlocked: false,
    wishlist: [],
    createdAt: new Date(),
  },
  {
    _id: "user001",
    name: "Test User",
    email: "user@test.com",
    password: "$2a$10$hashedpassword", // "user123" hashed
    role: "user",
    isBlocked: false,
    wishlist: [],
    createdAt: new Date(),
  },
];

const mockProducts = [
  {
    _id: "prod001",
    name: "Snake Plant",
    description: "Low-maintenance indoor plant known for air purification",
    price: 45,
    category: "indoor",
    stock: 25,
    images: ["/plant_imgs/snake-plant.png"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    _id: "prod002",
    name: "Peace Lily",
    description: "Beautiful flowering plant that thrives in low light",
    price: 35,
    category: "indoor",
    stock: 20,
    images: ["/plant_imgs/peace-lily.png"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    _id: "prod003",
    name: "Spider Plant",
    description: "Easy to grow plant with cascading leaves",
    price: 25,
    category: "indoor",
    stock: 30,
    images: ["/plant-placeholder.svg"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    _id: "prod004",
    name: "Pothos",
    description: "Trailing vine perfect for beginners",
    price: 20,
    category: "indoor",
    stock: 40,
    images: ["/plant-placeholder.svg"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    _id: "prod005",
    name: "Lavender",
    description: "Fragrant herb perfect for gardens",
    price: 15,
    category: "outdoor",
    stock: 50,
    images: ["/plant-placeholder.svg"],
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    _id: "prod006",
    name: "Rosemary",
    description: "Aromatic herb for cooking and gardens",
    price: 12,
    category: "outdoor",
    stock: 35,
    images: ["/plant-placeholder.svg"],
    isAvailable: true,
    createdAt: new Date(),
  },
];

const mockOrders = [];

module.exports = {
  mockUsers,
  mockProducts,
  mockOrders,
};
