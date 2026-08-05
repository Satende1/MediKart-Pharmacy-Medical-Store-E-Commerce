import React from "react";
import "./Gallery.css";

import img1 from "../../assets/gallery/gallery1.jpg";
import img2 from "../../assets/gallery/gallery2.jpg";
import img3 from "../../assets/gallery/gallery3.jpg";
import img4 from "../../assets/gallery/gallery4.jpg";
import img5 from "../../assets/gallery/gallery5.jpg";
import img6 from "../../assets/gallery/gallery6.jpg";
import img7 from "../../assets/gallery/gallery7.jpg";
import img8 from "../../assets/gallery/gallery8.jpg";

const galleryImages = [
    {
        id: 1,
        image: img1,
        title: "Medicines",
    },
    {
        id: 2,
        image: img2,
        title: "Healthcare",
    },
    {
        id: 3,
        image: img3,
        title: "Personal Care",
    },
    {
        id: 4,
        image: img4,
        title: "Medical Devices",
    },
    {
        id: 5,
        image: img5,
        title: "Baby Care",
    },
    {
        id: 6,
        image: img6,
        title: "Eye Care",
    },
    {
        id: 7,
        image: img7,
        title: "Hair Care",
    },
    {
        id: 8,
        image: img8,
        title: "Premium Healthcare",
    },
];

function Gallery() {
    return (
        <div className="gallery-container">

            <div className="gallery-header">
                <h1>MEDIKART Gallery</h1>

                <p>
                    Explore our premium healthcare products and services.
                </p>
            </div>

            <div className="gallery-grid">

                {galleryImages.map((item) => (

                    <div
                        className="gallery-card"
                        key={item.id}
                    >

                        <img
                            src={item.image}
                            alt={item.title}
                        />

                        <div className="gallery-overlay">
                            <h3>{item.title}</h3>
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Gallery;