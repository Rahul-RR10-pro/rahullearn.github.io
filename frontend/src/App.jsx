
import { useMemo, useState } from "react";
import "./App.css";

const fragrances = [
  { name: "Rose Elegance", brand: "ScentAura", type: "Floral", category: "Women", price: 1800, color: "rose", emoji: "🌹" },
  { name: "Midnight Oud", brand: "ScentAura", type: "Woody", category: "Men", price: 2600, color: "navy", emoji: "🌙" },
  { name: "Golden Bloom", brand: "Aura Luxe", type: "Fresh", category: "Women", price: 2100, color: "gold", emoji: "🌼" },
  { name: "Velvet Musk", brand: "ScentAura", type: "Oriental", category: "Unisex", price: 2400, color: "plum", emoji: "✨" },
  { name: "Ocean Mist", brand: "Blue Note", type: "Fresh", category: "Men", price: 1700, color: "blue", emoji: "🌊" },
  { name: "Vanilla Dream", brand: "Aura Luxe", type: "Oriental", category: "Women", price: 2200, color: "cream", emoji: "🤍" },
  { name: "Cedar Woods", brand: "Blue Note", type: "Woody", category: "Men", price: 2300, color: "green", emoji: "🌿" },
  { name: "Citrus Spark", brand: "ScentAura", type: "Citrus", category: "Unisex", price: 1500, color: "citrus", emoji: "🍋" },
  { name: "Jasmine Whisper", brand: "Aura Luxe", type: "Floral", category: "Women", price: 2000, color: "lilac", emoji: "🌸" },
  { name: "Amber Nights", brand: "Blue Note", type: "Oriental", category: "Unisex", price: 2800, color: "amber", emoji: "🔥" },
];

const sizes = [
  { ml: 30, factor: 0.55 },
  { ml: 50, factor: 0.75 },
  { ml: 75, factor: 0.9 },
  { ml: 100, factor: 1 },
  { ml: 150, factor: 1.35 },
];

const products = fragrances.flatMap((fragrance, index) =>
  sizes.map((size, sizeIndex) => ({
    id: index * sizes.length + sizeIndex + 1,
    ...fragrance,
    size: size.ml,
    price: Math.round((fragrance.price * size.factor) / 10) * 10,
  }))
);

const categories = ["All", "Women", "Men", "Unisex", "Gift Sets", "New Arrivals"];
const brands = ["ScentAura", "Aura Luxe", "Blue Note"];
const types = ["Floral", "Woody", "Fresh", "Oriental", "Citrus"];

function Header({ cartCount, search, setSearch }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home">
        <span className="brand-mark">✿</span>
        <span>
          <strong>ScentAura</strong>
          <small>Luxury in Every Drop</small>
        </span>
      </a>

      <nav className="main-nav">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#about">About</a>
      </nav>

      <label className="search-box">
        <span>⌕</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search perfumes, brands..."
          aria-label="Search perfumes"
        />
        {search && (
          <button onClick={() => setSearch("")} aria-label="Clear search">
            ×
          </button>
        )}
      </label>

      <a className="cart-link" href="#shop">
        ♡ <span className="cart-count">{cartCount}</span>
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">THE ART OF FRAGRANCE</p>
        <h1>Find Your<br />Signature Scent.</h1>
        <p>Luxury perfumes for every mood, occasion and personality.</p>
        <a className="primary-button" href="#shop">
          Explore Collection <span>→</span>
        </a>
        <div className="hero-benefits">
          <span>✓ Authentic products</span>
          <span>✓ Secure shopping</span>
          <span>✓ Carefully packed</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="Decorative perfume bottle">
        <span className="hero-flower flower-a">✿</span>
        <span className="hero-flower flower-b">✾</span>
        <div className="hero-bottle">
          <div className="hero-cap" />
          <div className="hero-bottle-label">
            <small>SCENTAURA</small>
            <strong>Rose</strong>
            <span>EAU DE PARFUM</span>
          </div>
        </div>
        <p className="hero-note">A scent<br />to remember.</p>
      </div>
    </section>
  );
}

function CategoryBar({ selected, onSelect }) {
  return (
    <section className="category-section">
      <div className="category-list">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`category-item ${selected === category ? "active" : ""}`}
            onClick={() => onSelect(category)}
          >
            <span className={`category-icon category-${index}`}>
              {["✧", "♀", "♂", "◉", "🎁", "✦"][index]}
            </span>
            <span>{category}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  toggleBrand,
  selectedTypes,
  toggleType,
  maxPrice,
  setMaxPrice,
  clearFilters,
}) {
  return (
    <aside className="filters">
      <div className="filter-heading">
        <h3>Filters</h3>
        <button onClick={clearFilters}>Clear all</button>
      </div>

      <div className="filter-group">
        <h4>Category</h4>
        {categories.map((category) => (
          <label className="check-row" key={category}>
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Brand</h4>
        {brands.map((brand) => (
          <label className="check-row" key={brand}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Fragrance Type</h4>
        {types.map((type) => (
          <label className="check-row" key={type}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Maximum Price</h4>
        <input
          className="price-slider"
          type="range"
          min="500"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
        />
        <div className="price-labels">
          <span>₹500</span>
          <strong>₹{maxPrice.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <button className="clear-filter-button" onClick={clearFilters}>
        Reset Filters
      </button>
    </aside>
  );
}

function ProductCard({ product, onAddToCart, isFavorite, onToggleFavorite }) {
  return (
    <article className="product-card">
      <div className={`product-art art-${product.color}`}>
        <span className="product-badge">SIGNATURE</span>
        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <div className="mini-bottle">
          <span className="mini-cap" />
          <span className="mini-bottle-label">
            <small>SA</small>
            <span>{product.emoji}</span>
          </span>
        </div>
      </div>

      <div className="product-details">
        <p className="product-brand">{product.brand} · {product.type}</p>
        <h3>{product.name}</h3>
        <p className="product-size">{product.size} ml · Eau de Parfum</p>
        <div className="product-price-row">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <span>★ 4.8</span>
        </div>
        <button className="add-cart-button" onClick={() => onAddToCart(product)}>
          + Add to Cart
        </button>
      </div>
    </article>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  function toggleItem(value, list, setList) {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  }

  function clearFilters() {
    setSelectedCategory("All");
    setSelectedBrands([]);
    setSelectedTypes([]);
    setMaxPrice(5000);
    setSearch("");
  }

  function addToCart(product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        `${product.name} ${product.brand} ${product.type}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory ||
        (selectedCategory === "New Arrivals" && product.id > 40) ||
        (selectedCategory === "Gift Sets" && product.size === 150);

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(product.type);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesType &&
        product.price <= maxPrice
      );
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, selectedCategory, selectedBrands, selectedTypes, maxPrice, sortBy]);

  return (
    <div className="app-shell">
      <Header cartCount={cart.length} search={search} setSearch={setSearch} />
      <main>
        <Hero />
        <CategoryBar
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <section className="catalog-section" id="shop">
          <div className="catalog-title">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>Discover Your Fragrance</h2>
              <p className="catalog-subtitle">
                Explore scents that make every moment memorable.
              </p>
            </div>
            <label className="sort-control">
              Sort by
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>

          <div className="catalog-layout">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrands={selectedBrands}
              toggleBrand={(brand) => toggleItem(brand, selectedBrands, setSelectedBrands)}
              selectedTypes={selectedTypes}
              toggleType={(type) => toggleItem(type, selectedTypes, setSelectedTypes)}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
            />

            <div className="products-area">
              <div className="results-row">
                <p><strong>{filteredProducts.length}</strong> products found</p>
                {favorites.length > 0 && <span>♡ {favorites.length} saved</span>}
              </div>

              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span>🌸</span>
                  <h3>No fragrances found</h3>
                  <p>Try changing your search or filters.</p>
                  <button className="primary-button" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="trust-strip" id="about">
          <div><strong>✧ Authenticity</strong><span>Quality you can trust</span></div>
          <div><strong>♧ Thoughtful Selection</strong><span>Scents for every mood</span></div>
          <div><strong>♡ Customer First</strong><span>A lovely shopping experience</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#home">✿ ScentAura</a>
        <p>Luxury in Every Drop.</p>
        <small>© 2026 ScentAura · Demo storefront</small>
      </footer>

      {cart.length > 0 && (
        <div className="cart-notice" role="status">
          Added to cart · {cart.length} item{cart.length === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );
}

export default App;
