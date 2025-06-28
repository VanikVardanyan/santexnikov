export default function Loading() {
  return (
    <div style={{ minHeight: "60vh" }} className="d-flex flex-column justify-content-center align-items-center w-100">
      <div className="spinner-border text-primary mb-3" style={{ width: 48, height: 48 }} role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
      <div className="fw-medium text-muted" style={{ fontSize: "1.2rem" }}>
        Загрузка страницы товара...
      </div>
    </div>
  );
}
