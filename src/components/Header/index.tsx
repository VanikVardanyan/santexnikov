"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap");
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <div>
          <Link className="navbar-brand" href="/">
            СанТехников
          </Link>
          <div>
            <a href="tel:+89858336510" className="nav-link fw-semibold d-block d-lg-none">
              📞 8 (985) 833–65–10
            </a>
          </div>
        </div>

        {/* Burger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu + phone */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Меню слева */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/catalog">
                Каталог
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contacts">
                Контакты
              </Link>
            </li>
          </ul>

          {/* Номер телефона справа */}
          <div>
            <a href="tel:+7499390905" className="nav-link fw-semibold d-none d-lg-block">
              📞 8 (985) 833–65–10
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
