import medicines from "../../assets/categories/medicines.png";
import healthcare from "../../assets/categories/Healthcare.jpg";
import personalcare from "../../assets/categories/personalcare.png";
import wellness from "../../assets/categories/wellness.png";
import devices from "../../assets/categories/devices.png";
import babycare from "../../assets/categories/BabyCare.jpg";

const categories = [
  {
    id: 1,
    name: "Medicines",
    image: medicines,
    path: "/category/medicines",
  },
  {
    id: 2,
    name: "Healthcare",
    image: healthcare,
    path: "/category/healthcare",
  },
  {
    id: 3,
    name: "Personal Care",
    image: personalcare,
    path: "/category/personal-care",
  },
  {
    id: 4,
    name: "Wellness",
    image: wellness,
    path: "/category/wellness",
  },
  {
    id: 5,
    name: "Medical Devices",
    image: devices,
    path: "/category/devices",
  },
  {
    id: 6,
    name: "Baby Care",
    image: babycare,
    path: "/category/baby-care",
  },
];

export default categories;