"use client";
import Image from "next/image";
import Link from "next/link";
import { CategoryInfo } from "@/lib/data";

interface ProductCategoryCardProps {
  category: CategoryInfo;
}

export default function ProductCategoryCard({ category }: ProductCategoryCardProps) {
  const clickHandler = () => {
    window.dataLayer?.push({
      event: "categoryClick",
      eventCategory: "Категория",
      eventAction: "Клик по категории",
      eventLabel: category.title,
    });
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <Link href={`/catalog/${category.id}`} style={{ textDecoration: "none" }}>
        <div
          className="card h-100 d-flex flex-column border-0 shadow-sm rounded-3"
          style={{ transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={clickHandler}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "200px",
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              overflow: "hidden",
            }}
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="card-body d-flex flex-column justify-content-end text-center">
            <h5 className="card-title mt-auto fw-semibold text-dark">{category.title}</h5>
            <p className="card-text text-muted small mb-0">{category.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
