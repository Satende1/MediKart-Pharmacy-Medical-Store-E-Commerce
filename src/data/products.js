import Paracentamol from "../assets/products/product1.png";
import BP from "../assets/products/product3.png";
import Sanitizer from "../assets/products/product4.png";
import Thermometer from "../assets/products/product5.png";
import Protein from "../assets/products/product6.png";
import Face from "../assets/products/product7.png";
import VitaminD from "../assets/products/product8.png";

import Dolo650 from "../assets/FlashSale/Debo650.jpg";
import Crocin from "../assets/FlashSale/crocin.jpg";
import Revital from "../assets/FlashSale/revital.jpg";
import Limcee from "../assets/FlashSale/limcee.jpg";
import Glucometer from "../assets/FlashSale/glucometer.jpg";
import BPMonitor from "../assets/FlashSale/bpMonitor.jpg";
import N95Mask from "../assets/FlashSale/n95mask.jpg";
import CoughSyrup from "../assets/FlashSale/Cough Syrup.png"; // Change path if needed


const products = [
  {
    id: 1,
    name: "Paracetamol",
    brand: "Micro Labs",
    category: "Tablets",
    price: 99,
    rating: 4.8,
    reviews: 1250,
    discount: 10,
    image: Paracentamol,
    packSize: "10 Tablets",
    expiry: "18 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Effective paracetamol tablets for fever and pain relief."
  },

  {
    id: 2,
    name: "Blood Pressure Monitor",
    brand: "Omron",
    category: "Devices",
    price: 1499,
    rating: 4.9,
    reviews: 1450,
    discount: 12,
    image: BP,
    packSize: "1 Device",
    expiry: "2 Years",
    delivery: "3-4 Business Days",
    returnPolicy: "14 Days Return Eligible",
    stock: true,
    description:
      "Digital blood pressure monitor for accurate home monitoring."
  },

  {
    id: 3,
    name: "Hand Sanitizer",
    brand: "Savlon",
    category: "Medical",
    price: 199,
    rating: 4.6,
    reviews: 2100,
    discount: 15,
    image: Sanitizer,
    packSize: "200ml",
    expiry: "12 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Kills 99.9% germs while keeping hands moisturized."
  },

  {
    id: 4,
    name: "Digital Thermometer",
    brand: "Dr. Trust",
    category: "Devices",
    price: 299,
    rating: 4.8,
    reviews: 450,
    discount: 10,
    image: Thermometer,
    packSize: "1 Device",
    expiry: "3 Years",
    delivery: "2-3 Business Days",
    returnPolicy: "14 Days Return Eligible",
    stock: true,
    description:
      "Fast and accurate temperature measurement."
  },

  {
    id: 5,
    name: "Protein Powder",
    brand: "GNC",
    category: "Supplements",
    price: 899,
    rating: 4.7,
    reviews: 320,
    discount: 5,
    image: Protein,
    packSize: "500g",
    expiry: "12 Months",
    delivery: "3-4 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "High-quality protein powder for muscle recovery."
  },

  {
    id: 6,
    name: "Face Wash",
    brand: "Neutrogena",
    category: "Skincare",
    price: 249,
    rating: 4.9,
    reviews: 890,
    discount: 15,
    image: Face,
    packSize: "150ml",
    expiry: "18 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Gentle face wash suitable for all skin types."
  },

  {
    id: 7,
    name: "Vitamin D Capsules",
    brand: "Sundown Naturals",
    category: "Supplements",
    price: 399,
    rating: 4.6,
    reviews: 640,
    discount: 12,
    image: VitaminD,
    packSize: "60 Capsules",
    expiry: "24 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Supports bone health and improves immunity."
  },

  {
    id: 8,
    name: "Dolo 650",
    brand: "Micro Labs",
    category: "Tablets",
    price: 120,
    rating: 4.8,
    reviews: 1350,
    discount: 20,
    image: Dolo650,
    packSize: "15 Tablets",
    expiry: "24 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Popular medicine for fever, headache and body pain."
  },
  {
    id: 9,
    name: "Crocin Advance",
    brand: "GSK",
    category: "Tablets",
    price: 350,
    rating: 4.7,
    reviews: 940,
    discount: 22,
    image: Crocin,
    packSize: "20 Tablets",
    expiry: "24 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Fast relief from fever, headache and body pain."
  },

  {
    id: 10,
    name: "Revital H",
    brand: "Sun Pharma",
    category: "Supplements",
    price: 2499,
    rating: 4.9,
    reviews: 1500,
    discount: 20,
    image: Revital,
    packSize: "60 Capsules",
    expiry: "24 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Daily multivitamin supplement for energy, stamina and immunity."
  },

  {
    id: 11,
    name: "Limcee Vitamin C",
    brand: "Abbott",
    category: "Supplements",
    price: 250,
    rating: 4.8,
    reviews: 870,
    discount: 28,
    image: Limcee,
    packSize: "30 Tablets",
    expiry: "24 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Chewable Vitamin C tablets that help strengthen immunity."
  },

  {
    id: 12,
    name: "Glucometer Kit",
    brand: "Accu-Chek",
    category: "Devices",
    price: 1899,
    rating: 4.8,
    reviews: 1100,
    discount: 21,
    image: Glucometer,
    packSize: "1 Kit",
    expiry: "3 Years",
    delivery: "3-4 Business Days",
    returnPolicy: "14 Days Return Eligible",
    stock: true,
    description:
      "Accurate blood glucose monitoring kit with test strips."
  },

  {
    id: 13,
    name: "BP Monitor Deluxe",
    brand: "Omron",
    category: "Devices",
    price: 2999,
    rating: 4.9,
    reviews: 1650,
    discount: 15,
    image: BPMonitor,
    packSize: "1 Device",
    expiry: "3 Years",
    delivery: "3-4 Business Days",
    returnPolicy: "14 Days Return Eligible",
    stock: true,
    description:
      "Automatic upper-arm blood pressure monitor for home use."
  },

  {
    id: 14,
    name: "N95 Face Mask",
    brand: "3M",
    category: "Medical",
    price: 399,
    rating: 4.7,
    reviews: 720,
    discount: 25,
    image: N95Mask,
    packSize: "10 Masks",
    expiry: "36 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Premium N95 mask offering superior protection from dust and viruses."
  },

  {
    id: 15,
    name: "Cough Syrup",
    brand: "Benadryl",
    category: "Syrup",
    price: 180,
    rating: 4.6,
    reviews: 620,
    discount: 10,
    image: CoughSyrup,
    packSize: "100ml",
    expiry: "18 Months",
    delivery: "2-3 Business Days",
    returnPolicy: "7 Days Return Eligible",
    stock: true,
    description:
      "Provides effective relief from dry and wet cough."
  },
];

export default products;