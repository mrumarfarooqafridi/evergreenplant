const fileDatabase = require("./fileDatabase");

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding file database...");

    // Check if data already exists
    const existingUsers = await fileDatabase.getAllUsers();
    if (existingUsers.length > 0) {
      console.log("✅ Database already seeded");
      return;
    }

    // Create admin user
    const adminUser = await fileDatabase.createUser({
      name: "Admin User",
      email: "admin@evergreen.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: password
      role: "admin",
      isBlocked: false,
      wishlist: [],
    });

    // Create regular user
    const regularUser = await fileDatabase.createUser({
      name: "John Doe",
      email: "john@example.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: password
      role: "user",
      isBlocked: false,
      wishlist: [],
    });

    // Create sample products
    const products = [
      {
        name: "Monstera Deliciosa",
        description:
          "Beautiful Swiss cheese plant with large, glossy leaves. Perfect for indoor decoration.",
        price: 45.99,
        category: "Indoor Plants",
        images: ["/images/monstera.jpg"],
        stock: 15,
        featured: true,
        rating: 4.8,
        reviews: [],
      },
      {
        name: "Snake Plant",
        description:
          "Low-maintenance air-purifying plant with tall, upright leaves.",
        price: 25.99,
        category: "Indoor Plants",
        images: ["/plant_imgs/snake-plant.png"],
        stock: 20,
        featured: true,
        rating: 4.6,
        reviews: [],
      },
      {
        name: "Peace Lily",
        description:
          "Elegant white-flowering plant that thrives in low light conditions.",
        price: 35.99,
        category: "Flowering Plants",
        images: ["/plant_imgs/peace-lily.png"],
        stock: 12,
        featured: true,
        rating: 4.7,
        reviews: [],
      },
      {
        name: "Fiddle Leaf Fig",
        description:
          "Stunning large-leafed plant that makes a bold statement in any room.",
        price: 65.99,
        category: "Indoor Plants",
        images: ["/images/fiddle-leaf.jpg"],
        stock: 8,
        featured: true,
        rating: 4.9,
        reviews: [],
      },
      {
        name: "Pothos",
        description:
          "Trailing vine plant with heart-shaped leaves, very easy to care for.",
        price: 15.99,
        category: "Hanging Plants",
        images: ["/images/pothos.jpg"],
        stock: 25,
        featured: false,
        rating: 4.5,
        reviews: [],
      },
      {
        name: "Rubber Plant",
        description:
          "Glossy-leaved plant with burgundy stems, adds elegance to any space.",
        price: 40.99,
        category: "Indoor Plants",
        images: ["/images/rubber-plant.jpg"],
        stock: 10,
        featured: false,
        rating: 4.4,
        reviews: [],
      },
    ];

    for (const product of products) {
      await fileDatabase.createProduct(product);
    }

    console.log("✅ Database seeded successfully!");
    console.log(`👤 Created ${existingUsers.length + 2} users`);
    console.log(`🛍️ Created ${products.length} products`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

module.exports = seedDatabase;
