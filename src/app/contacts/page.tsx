// app/contacts/page.tsx
export default function Contacts() {
  return (
    <>
      <h2>Контакты</h2>
      <p>Москва, Пятницкое шоссе 18, радио рынок Митино, 5 Вход , Павильон 27</p>
      <p>Тел.: 8 (985) 833–65–10</p>
      <p>Email: Hayk_109@bk.ru</p>

      <h4 className="mt-4">Наше местоположение:</h4>
      <div style={{ width: "100%", height: "400px" }}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aee7130833cadebe144dc1cf7eae36cb01de9c18f75b341b76161edc8c9583453&amp;source=constructor"
          width="100%"
          height="400"
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
}
