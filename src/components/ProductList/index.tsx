"use client";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import ProductModal from "../ProductModal";
import AdvancedPagination from "../AdvancedPagination";
import Loader from "../Loader";
import { Product } from "@/lib/data";
import { gaEvent } from "@/components/Analytics";

interface ProductListProps {
  categoryId: string;
  categoryTitle?: string;
}

interface ApiResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    sortBy: string;
    sortOrder: string;
  };
}

export default function ProductList({ categoryId, categoryTitle }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Состояние фильтров
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "manufacturer" | "code">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  // Состояние пагинации
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 30,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Функция для загрузки данных
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        categoryId,
        page: currentPage.toString(),
        limit: limit.toString(),
        search: searchTerm,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/products?${params}`);

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const data: ApiResponse = await response.json();

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при изменении фильтров
  useEffect(() => {
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  }, [searchTerm, sortBy, sortOrder, limit]);

  useEffect(() => {
    fetchProducts();
  }, [categoryId, currentPage, limit, searchTerm, sortBy, sortOrder]);

  const handleProductClick = (product: Product) => {
    gaEvent("product_modal_open", { product_code: product["Код"] });
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (page: number) => {
    gaEvent("pagination_click", { page });
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (newLimit: number) => {
    gaEvent("change_items_per_page", { limit: newLimit });
    setLimit(newLimit);
  };

  // Вычисляем индексы отображаемых товаров
  const startItem = (pagination.currentPage - 1) * pagination.limit + 1;
  const endItem = Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          <i className="bi bi-exclamation-triangle display-4"></i>
        </div>
        <h4 className="text-red-600 mb-2">Ошибка загрузки</h4>
        <p className="text-muted">{error}</p>
        <button onClick={fetchProducts} className="btn btn-primary mt-3">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header with search and filters */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-1">{categoryTitle || "Товары"}</h2>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
            {/* Info and Items per page - теперь всегда сверху */}
            <div>
              <div className="mb-1 text-dark" style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                Показано {startItem}-{endItem} из {pagination.totalProducts} товаров
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted me-2">Товаров на странице:</span>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="form-select form-select-sm w-auto"
                  style={{ minWidth: 70, height: 32, fontSize: "1rem", padding: "2px 16px 2px 8px", borderRadius: 8 }}
                >
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            {/* Search and Sort */}
            <div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0">
              {/* Search */}
              <div className="input-group" style={{ minWidth: "250px" }}>
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Поиск товаров..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    gaEvent("search", { query: e.target.value });
                  }}
                />
              </div>
              {/* Sort */}
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as "name" | "manufacturer" | "code");
                    gaEvent("sort_change", { sortBy: e.target.value });
                  }}
                  style={{ minWidth: "140px" }}
                >
                  <option value="name">По названию</option>
                  <option value="manufacturer">По производителю</option>
                  <option value="code">По коду</option>
                </select>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    gaEvent("sort_order_toggle", { sortOrder: sortOrder === "asc" ? "desc" : "asc" });
                  }}
                  title={sortOrder === "asc" ? "По убыванию" : "По возрастанию"}
                >
                  <i className={`bi bi-sort-${sortOrder === "asc" ? "up" : "down"}`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && <Loader text="Загрузка товаров..." />}

      {/* Products grid */}
      {!loading && products.length > 0 && (
        <>
          <div className="row">
            {products.map((product, index) => (
              <ProductCard key={`${product["Код"]}-${index}`} product={product} onClick={handleProductClick} />
            ))}
          </div>

          {/* Advanced Pagination */}
          <div className="mt-5">
            <AdvancedPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalProducts}
              itemsPerPage={pagination.limit}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleLimitChange}
            />
          </div>
        </>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-search display-1 text-muted"></i>
          <h4 className="mt-3">Товары не найдены</h4>
          <p className="text-muted">Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
