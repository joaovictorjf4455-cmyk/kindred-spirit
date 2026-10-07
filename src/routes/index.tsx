import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Headphones,
  Heart,
  Laptop,
  Menu,
  Monitor,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Watch,
  X,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const categories = [
  { name: "Smartphones", icon: Smartphone },
  { name: "Notebooks", icon: Laptop },
  { name: "Áudio", icon: Headphones },
  { name: "Monitores", icon: Monitor },
  { name: "Wearables", icon: Watch },
];

const products = [
  { name: "iPhone 16 Pro", category: "Smartphones", price: "R$ 7.499", oldPrice: "R$ 8.299", discount: "10% OFF", rating: "4.9", reviews: "328", image: "https://images.unsplash.com/photo-1592286927505-2fd9c9b2f7b7?auto=format&fit=crop&w=900&q=85" },
  { name: "MacBook Air M3", category: "Notebooks", price: "R$ 8.799", oldPrice: "R$ 9.599", discount: "8% OFF", rating: "4.8", reviews: "214", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=85" },
  { name: "Sony WH-1000XM5", category: "Áudio", price: "R$ 2.199", oldPrice: "R$ 2.699", discount: "18% OFF", rating: "4.9", reviews: "506", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85" },
  { name: "Apple Watch Series 10", category: "Wearables", price: "R$ 3.299", oldPrice: "R$ 3.699", discount: "11% OFF", rating: "4.8", reviews: "187", image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=85" },
];

function Index() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const categoryMatch = activeCategory === "Todos" || p.category === activeCategory;
        const searchMatch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
        return categoryMatch && searchMatch;
      }),
    [activeCategory, search],
  );

  const addToCart = () => setCart((value) => value + 1);

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#101828]">
      <div className="bg-[#101828] px-4 py-2 text-center text-xs font-medium text-white">
        <span>⚡ Semana do Consumidor: até 30% OFF + frete grátis acima de R$ 199</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-5 px-5 lg:px-8">
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <a href="#" className="flex items-center gap-2.5 text-xl font-black tracking-tight">
            <span className="grid size-10 place-items-center rounded-xl bg-[#2563eb] text-white shadow-lg shadow-blue-200">
              <Zap className="size-5 fill-current" />
            </span>
            <span>Volt<span className="text-[#2563eb]">.</span></span>
          </a>

          <nav className={`absolute left-0 top-20 w-full border-b bg-white p-5 lg:static lg:ml-5 lg:flex lg:w-auto lg:border-0 lg:p-0 ${menuOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col gap-4 text-sm font-semibold lg:flex-row lg:items-center lg:gap-7">
              <a href="#ofertas" className="hover:text-blue-600">Ofertas</a>
              <a href="#produtos" className="hover:text-blue-600">Eletrônicos</a>
              <a href="#beneficios" className="hover:text-blue-600">Por que a Volt?</a>
              <a href="#depoimentos" className="hover:text-blue-600">Avaliações</a>
            </div>
          </nav>

          <div className="ml-auto hidden max-w-md flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 md:flex">
            <Search className="size-5 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Busque por produto ou categoria..." className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-slate-400" />
          </div>

          <button onClick={() => setCart((value) => value)} className="relative rounded-xl p-2.5 hover:bg-slate-100" aria-label="Carrinho">
            <ShoppingBag className="size-5" />
            {cart > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-blue-600 text-[10px] font-bold text-white">{cart}</span>}
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0b1220]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20 lg:px-8">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
              <Sparkles className="size-3.5" /> Tecnologia que acompanha você
            </div>
            <h1 className="max-w-xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Upgrade no seu mundo. <span className="text-blue-400">Sem complicação.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
              Os melhores eletrônicos, preços que fazem sentido e uma experiência de compra feita para você.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#ofertas" className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-xl shadow-blue-950/40 transition hover:bg-blue-500">
                Ver ofertas <ArrowRight className="size-4" />
              </a>
              <a href="#produtos" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-6 text-sm font-bold text-white transition hover:bg-white/10">
                Explorar produtos
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-blue-400" /> Compra segura</span>
              <span className="flex items-center gap-2"><Truck className="size-4 text-blue-400" /> Envio rápido</span>
              <span className="flex items-center gap-2"><Headphones className="size-4 text-blue-400" /> Suporte humano</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-3 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1600086827875-a63b01f1335c?auto=format&fit=crop&w=1200&q=85" alt="Setup moderno com eletrônicos" className="h-[390px] w-full rounded-[1.5rem] object-cover" />
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-[#0b1220]/85 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs text-slate-400">Oferta destaque</p><p className="mt-1 font-bold text-white">Setup Pro 2025</p></div>
                  <span className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-black text-white">-25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-5 py-5 lg:px-8">
          <button onClick={() => setActiveCategory("Todos")} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold ${activeCategory === "Todos" ? "bg-[#101828] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Todos</button>
          {categories.map(({ name, icon: Icon }) => (
            <button key={name} onClick={() => setActiveCategory(name)} className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ${activeCategory === name ? "bg-[#101828] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              <Icon className="size-4" /> {name}
            </button>
          ))}
        </div>
      </section>

      <section id="ofertas" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Só por tempo limitado</p><h2 className="mt-1 text-3xl font-black tracking-tight">Ofertas que valem o clique</h2></div>
          <a href="#produtos" className="hidden items-center gap-1 text-sm font-bold text-blue-600 sm:flex">Ver tudo <ChevronRight className="size-4" /></a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.name} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
              <div className="relative bg-slate-100">
                <img src={product.image} alt={product.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-black text-white">{product.discount}</span>
                <button className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-slate-500 shadow-sm hover:text-red-500" aria-label="Favoritar"><Heart className="size-4" /></button>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-400">{product.category}</p>
                <h3 className="mt-1 font-bold">{product.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs"><Star className="size-3.5 fill-amber-400 text-amber-400" /><b>{product.rating}</b><span className="text-slate-400">({product.reviews})</span></div>
                <div className="mt-4 flex items-end gap-2"><span className="text-xl font-black">{product.price}</span><del className="text-xs text-slate-400">{product.oldPrice}</del></div>
                <button onClick={addToCart} className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#101828] text-sm font-bold text-white transition hover:bg-blue-600"><ShoppingBag className="size-4" /> Adicionar ao carrinho</button>
              </div>
            </article>
          ))}
        </div>
        {filteredProducts.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">Nenhum produto encontrado. Tente outra busca.</div>}
      </section>

      <section id="beneficios" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-12 sm:grid-cols-3 lg:px-8">
          {[
            [Truck, "Entrega rápida", "Despachamos seu pedido com agilidade e rastreio completo."],
            [ShieldCheck, "Compra protegida", "Pagamento seguro e garantia para você comprar tranquilo."],
            [Headphones, "Suporte de verdade", "Time especializado para ajudar antes e depois da compra."],
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="flex gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon className="size-5" /></span>
              <div><h3 className="font-bold">{title as string}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{text as string}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="depoimentos" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="rounded-[2rem] bg-blue-600 px-6 py-12 text-center text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-100">Quem compra, recomenda</p>
          <div className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-1">{[1,2,3,4,5].map((i) => <Star key={i} className="size-5 fill-current" />)}</div>
          <blockquote className="mx-auto mt-5 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">“Comprei meu notebook na Volt e foi a melhor experiência online que já tive. Entrega rápida e atendimento impecável.”</blockquote>
          <p className="mt-5 text-sm text-blue-100">Mariana S. · Cliente verificada</p>
        </div>
      </section>

      <footer className="bg-[#101828] px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div><div className="flex items-center gap-2 text-lg font-black"><span className="grid size-8 place-items-center rounded-lg bg-blue-600"><Zap className="size-4 fill-current" /></span>Volt.</div><p className="mt-2 text-xs text-slate-400">Tecnologia sem complicação.</p></div>
          <p className="text-xs text-slate-500">© 2025 Volt. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
