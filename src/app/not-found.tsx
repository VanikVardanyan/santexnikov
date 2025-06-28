import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="display-1 text-muted">404</h1>
            <h2 className="mb-4">Страница не найдена</h2>
            <p className="text-muted mb-4">К сожалению, запрашиваемая страница не существует или была перемещена.</p>
            <div className="d-flex gap-3 justify-content-center">
              <Link href="/" className="btn btn-primary">
                На главную
              </Link>
              <Link href="/catalog" className="btn btn-outline-secondary">
                В каталог
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
