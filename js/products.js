// ==========================================
// 📦 PURCHASEPALACE DATABASE (Inventory Only)
// ==========================================

const products = [
  // --- NEW ARRIVALS ---
  {
    id: 1,
    name: "Dell Latitude 5580",
    price: 109.99,
    image: "img/laptop_product_feature.jpg", // Make sure this file exists!
    category: "computing",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 2,
    name: "Tecno Pop 10pro",
    price: 86.52,
    image:
      "https://images.unsplash.com/photo-1597415581463-4b7a5a87be62?w=500&auto=format&fit=crop&q=60",
    category: "mobiles",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 3,
    name: "Casio Vent",
    price: 50.67,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop&q=60",
    category: "fashion",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    price: 60.99,
    image:
      "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=500&auto=format&fit=crop&q=60",
    category: "shoes",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 5,
    name: "Baby Toys",
    price: 50.21,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=60",
    category: "baby-products",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 6,
    name: "Thinking Fast and Slow",
    price: 5.59,
    image:
      "https://images.unsplash.com/photo-1593340010859-83edd3d6d13f?w=500&auto=format&fit=crop&q=60",
    category: "books",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 7,
    name: "Baseball Cap",
    price: 4.92,
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&auto=format&fit=crop&q=60",
    category: "fashion",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 8,
    name: "Nike Ball",
    price: 10.15,
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&auto=format&fit=crop&q=60",
    category: "sports",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 9,
    name: "Bleu de Chanel perfume",
    price: 125.49,
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop&q=60",
    category: "beauty",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 10,
    name: "Stainless Water Bottle",
    price: 36.74,
    image:
      "https://images.unsplash.com/photo-1628582357531-3da2e5a05875?w=500&auto=format&fit=crop&q=60",
    category: "sports",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 11,
    name: "Tee-Shirt",
    price: 9.65,
    image:
      "https://images.unsplash.com/photo-1651761179569-4ba2aa054997?w=500&auto=format&fit=crop&q=60",
    category: "fashion",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 12,
    name: "Two-Seater Sofa",
    price: 1789.99,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60",
    category: "furniture",
    badge: "New",
    section: "arrivals",
  },

  // --- MOST POPULAR ---
  {
    id: 13,
    name: "Stehling Keyboard",
    price: 2323.52,
    image:
      "https://images.unsplash.com/photo-1542590943-168e4c89eeb5?w=500&auto=format&fit=crop&q=60",
    category: "electronics",
    badge: "Hot",
    section: "popular",
  },
  {
    id: 14,
    name: "Office Chair",
    price: 46.52,
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop&q=60",
    category: "furniture",
    badge: "Top Rated",
    section: "popular",
  },
  {
    id: 15,
    name: "Baofeng Walkie Talkie",
    price: 10.67,
    image:
      "https://images.unsplash.com/photo-1692198552910-ccaa39a6aba4?w=500&auto=format&fit=crop&q=60",
    category: "electronics",
    badge: "Trending",
    section: "popular",
  },
  {
    id: 16,
    name: "Samsung Galaxy Tab S10 FE",
    price: 200.99,
    image:
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=500&auto=format&fit=crop&q=60",
    category: "mobiles",
    badge: "Most Popular",
    section: "popular",
  },
  {
    id: 17,
    name: "Smart Tv",
    price: 50.21,
    image:
      "https://images.unsplash.com/photo-1521607630287-ee2e81ad3ced?w=500&auto=format&fit=crop&q=60",
    category: "electronics",
    badge: "Top Rated",
    section: "popular",
  },
  {
    id: 18,
    name: "BMW M3",
    price: 168500.0,
    image:
      "https://images.unsplash.com/photo-1584809394311-364392a5011b?w=500&auto=format&fit=crop&q=60",
    category: "automotive",
    badge: "TOP RATED",
    section: "popular",
  },
  {
    id: 19,
    name: "Holy Bible KJV",
    price: 4.92,
    image:
      "https://images.unsplash.com/photo-1681117338192-8c80863355e1?w=500&auto=format&fit=crop&q=60",
    category: "books",
    badge: "Most Popular",
    section: "popular",
  },
  {
    id: 20,
    name: "CCTV Camera",
    price: 59.65,
    image:
      "https://images.unsplash.com/photo-1656057497463-37e68d6ff329?w=500&auto=format&fit=crop&q=60",
    category: "electronics",
    badge: "HOT",
    section: "popular",
  },


  {
    id: 21,
    name: "Organic Basmati Rice",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
    category: "food",
    badge: "Organic",
    section: "arrivals",
  },
  {
    id: 22,
    name: "Premium Roasted Coffee",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500",
    category: "beverages",
    badge: "Best Seller",
    section: "popular",
  },
  {
    id: 23,
    name: "Matte Liquid Lipstick",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=500",
    category: "makeup",
    badge: "Trending",
    section: "arrivals",
  },
  {
    id: 24,
    name: "Electric Fruit Juicer",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500",
    category: "home-appliances",
    badge: "New",
    section: "arrivals",
  },
  {
    id: 25,
    name: "Adjustable Dumbbell Set",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500",
    category: "sports",
    badge: "Heavy Duty",
    section: "popular",
  }
];
