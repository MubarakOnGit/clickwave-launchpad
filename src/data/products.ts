export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  featured: boolean;
  popular: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    price: 299,
    originalPrice: 399,
    image: "/src/assets/product-headphones.jpg",
    category: "Audio",
    rating: 4.8,
    reviews: 1247,
    featured: true,
    popular: true,
    tags: ["wireless", "noise-cancelling", "premium"]
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with our advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.",
    price: 249,
    originalPrice: 349,
    image: "/src/assets/product-smartwatch.jpg",
    category: "Wearables",
    rating: 4.6,
    reviews: 892,
    featured: true,
    popular: true,
    tags: ["fitness", "GPS", "health"]
  },
  {
    id: "3",
    name: "Ultra-Thin Laptop",
    description: "Powerful performance in an ultra-thin design. Perfect for professionals who need portability without compromising on performance.",
    price: 1299,
    originalPrice: 1599,
    image: "/src/assets/product-laptop.jpg",
    category: "Computers",
    rating: 4.9,
    reviews: 563,
    featured: true,
    popular: false,
    tags: ["professional", "portable", "high-performance"]
  },
  {
    id: "4",
    name: "5G Smartphone Pro",
    description: "Experience the future with our flagship smartphone featuring 5G connectivity, triple camera system, and all-day battery.",
    price: 899,
    originalPrice: 1099,
    image: "/src/assets/product-smartphone.jpg",
    category: "Mobile",
    rating: 4.7,
    reviews: 2103,
    featured: false,
    popular: true,
    tags: ["5G", "camera", "flagship"]
  }
];

export const categories = [
  "All",
  "Audio",
  "Wearables", 
  "Computers",
  "Mobile",
  "Accessories"
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getPopularProducts = () => products.filter(product => product.popular);
export const getProductsByCategory = (category: string) => 
  category === "All" ? products : products.filter(product => product.category === category);