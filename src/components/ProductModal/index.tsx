"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product, getProductImage, getProductTitle, getProductDescription } from "@/lib/data";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setImageError(false); // Сбрасываем ошибку при открытии нового товара
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const image = imageError ? "/images/placeholder.jpg" : getProductImage(product);
  const title = getProductTitle(product);
  const description = getProductDescription(product);

  const handleImageError = () => {
    setImageError(true);
  };

  const specifications = [
    { label: "Артикул", value: product["Артикул"] },
    { label: "Код", value: product["Код"] },
    { label: "Производитель", value: product["Производитель"] },
    { label: "Страна происхождения", value: product["Страна происхождения"] },
    { label: "Гарантия", value: product["Гарантия"] },
    { label: "Единица измерения", value: product["Ед. изм."] },
    { label: "Масса", value: product["Масса, кг"] ? `${product["Масса, кг"]} кг` : undefined },
    { label: "Объем", value: product["Объем, м3"] ? `${product["Объем, м3"]} м³` : undefined },
    { label: "Мощность", value: product["Мощность, Вт"] ? `${product["Мощность, Вт"]} Вт` : undefined },
    {
      label: "Напряжение",
      value: product["Напряжение питания, В"] ? `${product["Напряжение питания, В"]} В` : undefined,
    },
    { label: "Класс защиты", value: product["Класс защиты от поражения электрическим током"] },
    { label: "Рабочая среда", value: product["Рабочая среда"] },
    {
      label: "Максимальное давление",
      value: product["Максимальное давление, бар"] ? `${product["Максимальное давление, бар"]} бар` : undefined,
    },
    {
      label: "Производительность",
      value: product["Производительность, л/мин "] ? `${product["Производительность, л/мин "]} л/мин` : undefined,
    },
  ].filter((spec) => spec.value);

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "300px",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={handleImageError}
                    unoptimized={imageError}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h6>Описание</h6>
                <p className="text-muted">{description || "Описание отсутствует"}</p>

                {product["Назначение"] && (
                  <>
                    <h6>Назначение</h6>
                    <p className="text-muted">{product["Назначение"]}</p>
                  </>
                )}
              </div>
            </div>

            {specifications.length > 0 && (
              <div className="mt-4">
                <h6>Характеристики</h6>
                <div className="row">
                  {specifications.map((spec, index) => (
                    <div key={index} className="col-md-6 mb-2">
                      <strong>{spec.label}:</strong> {spec.value}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product["Раздел 1"] && (
              <div className="mt-3">
                <h6>Категория</h6>
                <p className="text-muted mb-1">{product["Раздел 1"]}</p>
                {product["Раздел 2"] && <p className="text-muted">{product["Раздел 2"]}</p>}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Закрыть
            </button>
            <button type="button" className="btn btn-primary">
              Заказать
            </button>
            <a
              href={`/product/${product["Код"]}`}
              className="btn btn-outline-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Подробнее
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
