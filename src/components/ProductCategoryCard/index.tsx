"use client";
import Image from "next/image";

interface ProductCategoryCardProps {
  title: string;
  image: string;
}

export default function ProductCategoryCard({ title, image }: ProductCategoryCardProps) {
  return (
    <div className="col-12 col-md-3 mb-4">
      <div
        className="card h-100 d-flex flex-column border-0 shadow-sm rounded-3"
        style={{ transition: "transform 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-end text-center">
          <h5 className="card-title mt-auto fw-semibold">{title}</h5>
        </div>
      </div>
    </div>
  );
}
