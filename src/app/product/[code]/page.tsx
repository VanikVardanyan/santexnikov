import { getProductByCode, getProductTitle, getProductDescription, getProductImage, Product } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ code: string }>;

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { code } = await params;
  const product: Product | null = await getProductByCode(code);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Товар не найден</h2>
        <p className="text-muted">Возможно, ссылка устарела или товар был удалён.</p>
        <Link href="/catalog" className="btn btn-primary mt-3">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-5 text-center">
          <Image
            src={getProductImage(product)}
            alt={getProductTitle(product)}
            width={350}
            height={350}
            className="rounded shadow-sm bg-white"
            style={{ objectFit: "contain", maxHeight: 350 }}
          />
        </div>
        <div className="col-md-7">
          <h1 className="mb-3" style={{ fontSize: "2rem", fontWeight: 600 }}>
            {getProductTitle(product)}
          </h1>
          <div className="mb-3 text-muted">
            Код товара: <b>{product["Код"]}</b>
          </div>
          <div className="mb-4" style={{ whiteSpace: "pre-line" }}>
            {getProductDescription(product)}
          </div>
          <div className="mb-4">
            <b>Производитель:</b> {product.Производитель || "—"}
            <br />
            <b>Артикул:</b> {product["Артикул"] || "—"}
            <br />
            <b>Ед. изм.:</b> {product["Ед. изм."] || "—"}
            <br />
            <b>Страна:</b> {product["Страна происхождения"] || "—"}
          </div>
          <Link href="/catalog" className="btn btn-outline-primary me-2">
            ← В каталог
          </Link>
        </div>
      </div>
      {/* Характеристики */}
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="mb-3">Характеристики</h4>
          <table className="table table-bordered table-sm bg-white">
            <tbody>
              {Object.entries(product)
                .filter(([key, value]) => {
                  return (
                    ["Код", "Наименование на сайте", "Описание", "Детальная картинка", "Картинка анонса"].indexOf(
                      key
                    ) === -1 &&
                    value &&
                    String(value).trim() !== ""
                  );
                })
                .map(([key, value]) => (
                  <tr key={key}>
                    <td style={{ minWidth: 180 }}>{key}</td>
                    <td>{String(value)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
