import dolo from "../assets/FlashSale/Debo650.jpg";
import crocin from "../assets/FlashSale/crocin.jpg";
import revital from "../assets/FlashSale/revital.jpg";
import glucometer from "../assets/FlashSale/glucometer.jpg";
import bpmonitor from "../assets/FlashSale/bpMonitor.jpg";
import vitamin from "../assets/FlashSale/Vitamin C.png";
import syrup from "../assets/FlashSale/Cough Syrup.png";




const products = [
  {
    id: 1,
    name: "Dolo 650",
    brand: "Micro Labs",
    category: "Tablets",
    price: 35,
    rating: 4.6,
    reviews: 2100,
    discount: 5,
    image: dolo,
    packSize: "10 tablets",
    expiry: "18 months",
    delivery: "2-3 business days",
    returnPolicy: "7 days return eligible",
    stock: true,
    description:
      "Dolo 650 delivers fast fever relief and pain management with a trusted paracetamol formulation for everyday ailments.",
  },
  {
    id: 2,
    name: "Crocin Advance",
    brand: "GlaxoSmithKline",
    category: "Medicine",
    price: 48,
    rating: 4.4,
    reviews: 1740,
    discount: 10,
    image: crocin,
    packSize: "10 tablets",
    expiry: "12 months",
    delivery: "2-3 business days",
    returnPolicy: "7 days return eligible",
    stock: true,
    description:
      "Crocin Advance is a fast-acting pain reliever designed for headaches, body pain, and fever with soothing comfort.",
  },
  {
    id: 3,
    name: "Revital H",
    brand: "Reckitt",
    category: "Supplements",
    price: 325,
    rating: 4.8,
    reviews: 980,
    discount: 8,
    image: revital,
    packSize: "60 capsules",
    expiry: "24 months",
    delivery: "3-4 business days",
    returnPolicy: "No returns",
    stock: true,
    description:
      "Revital H boosts energy and immunity with essential vitamins, minerals, and amino acids for active lifestyles.",
  },
  {
    id: 4,
    name: "Digital Glucometer",
    brand: "Accu-Chek",
    category: "Devices",
    price: 899,
    rating: 4.7,
    reviews: 1120,
    discount: 12,
    image: glucometer,
    packSize: "1 device",
    expiry: "2 years",
    delivery: "4-5 business days",
    returnPolicy: "14 days return eligible",
    stock: true,
    description:
      "This easy-to-use digital glucometer provides accurate blood sugar readings in seconds for daily diabetes monitoring.",
  },
  {
    id: 5,
    name: "BP Monitor",
    brand: "Omron",
    category: "Devices",
    price: 1599,
    rating: 4.5,
    reviews: 860,
    discount: 15,
    image: bpmonitor,
    packSize: "1 device",
    expiry: "2 years",
    delivery: "4-5 business days",
    returnPolicy: "14 days return eligible",
    stock: true,
    description:
      "The BP Monitor gives reliable blood pressure tracking with a comfortable cuff and easy digital display for home use.",
  },
  {
    id: 6,
    name: "Vitamin C",
    brand: "Himalaya",
    category: "Supplements",
    price: 199,
    rating: 4.2,
    reviews: 670,
    discount: 0,
    image: vitamin,
    packSize: "60 tablets",
    expiry: "18 months",
    delivery: "2-3 business days",
    returnPolicy: "7 days return eligible",
    stock: true,
    description:
      "Vitamin C supports immunity and skin health with a gentle formula suitable for daily supplementation.",
  },
  {
    id: 7,
    name: "Cough Syrup",
    brand: "Dabur",
    category: "Syrup",
    price: 120,
    rating: 4.1,
    reviews: 520,
    discount: 7,
    image: syrup,
    packSize: "100 ml",
    expiry: "12 months",
    delivery: "2-3 business days",
    returnPolicy: "7 days return eligible",
    stock: true,
    description:
      "This cough syrup offers soothing relief from cough and throat irritation with a mild herbal blend.",
  },
];

export default products;