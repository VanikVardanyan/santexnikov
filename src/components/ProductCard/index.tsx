"use client";
import Image from "next/image";
import { useState } from "react";
import { Product, getProductImage, getProductTitle, getProductDescription } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }

    // Google Analytics tracking
    window.dataLayer?.push({
      event: "productClick",
      eventCategory: "Товар",
      eventAction: "Клик по товару",
      eventLabel: getProductTitle(product),
    });
  };

  const image = imageError ? "/images/placeholder.jpg" : getProductImage(product);
  const title = getProductTitle(product);
  const description = getProductDescription(product);
  const shortDescription = description.length > 150 ? description.substring(0, 150) + "..." : description;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div
        className="card h-100 border-0 shadow-sm rounded-3"
        style={{
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: onClick ? "pointer" : "default",
        }}
        onMouseEnter={(e) => {
          if (onClick) {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
          }
        }}
        onMouseLeave={(e) => {
          if (onClick) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)";
          }
        }}
        onClick={handleClick}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "250px",
            borderTopLeftRadius: "0.75rem",
            borderTopRightRadius: "0.75rem",
            overflow: "hidden",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            unoptimized={imageError} // Отключаем оптимизацию для placeholder
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title fw-semibold mb-2" style={{ fontSize: "0.95rem" }}>
            {title}
          </h6>

          {product["Артикул"] && <p className="text-muted small mb-2">Артикул: {product["Артикул"]}</p>}

          {shortDescription && <p className="card-text text-muted small mb-3 flex-grow-1">{shortDescription}</p>}

          <div className="mt-auto">
            {product["Производитель"] && (
              <p className="text-muted small mb-1">Производитель: {product["Производитель"]}</p>
            )}

            {product["Гарантия"] && <p className="text-success small mb-0">Гарантия: {product["Гарантия"]}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
