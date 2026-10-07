import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, ChevronRight, Headphones, Heart, Laptop, Menu, Monitor,
  Search, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star, Truck,
  Watch, X, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const categories = [
  { name: "Smartphones", icon: Smartphone },
  { name: "Notebooks", icon: Laptop },
  { name: "Áudio", icon: Headphones },
  { name: "Monitores", icon: Monitor },
  { name: "Wearables", icon: Watch },
  { name: "Acessórios", icon: ShoppingBag },
];

const products = [
  { name: "PRATA - P9 - Fone De Ouvido Bluetooth Air - S/ Fio Wireless Headphone | AJ-D24", category: "Áudio", price: "R$ 99,90", oldPrice: "R$ 149,90", discount: "33% OFF", rating: "4.8", reviews: "Produto em destaque", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85", checkout: "https://pay.kaiross.com.br/Pnt8zHTsmLmH" },
  { name: "MacBook Air M3", category: "Notebooks", price: "R$ 8.799", oldPrice: "R$ 9.599", discount: "8% OFF", rating: "4.8", reviews: "214", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=85" },
  { name: "CARREGADOR PORTÁTIL DOBRÁVEL Magsafe 3 em 1 - Branco", category: "Acessórios", price: "R$ 99,90", oldPrice: "R$ 189,90", discount: "47% OFF", rating: "4.8", reviews: "Oferta especial", image: "data:image/jpeg;base64,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", checkout: "https://pay.kaiross.com.br/crT4puVOrlIX" },
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
        const searchMatch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase());
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

          <button className="relative rounded-xl p-2.5 hover:bg-slate-100" aria-label="Carrinho">
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
        <div id="produtos" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.name} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
              <div className="relative bg-slate-100">
                <img src={product.image} alt={product.name} className={`h-56 w-full transition duration-500 group-hover:scale-105 ${product.category === "Acessórios" ? "bg-white object-contain p-3" : "object-cover"}`} />
                <span className="absolute left-3 top-3 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-black text-white">{product.discount}</span>
                <button className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-slate-500 shadow-sm hover:text-red-500" aria-label="Favoritar"><Heart className="size-4" /></button>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-400">{product.category}</p>
                <h3 className="mt-1 font-bold">{product.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs"><Star className="size-3.5 fill-amber-400 text-amber-400" /><b>{product.rating}</b><span className="text-slate-400">({product.reviews})</span></div>
                <div className="mt-4 flex items-end gap-2"><span className="text-xl font-black text-blue-600">{product.price}</span><del className="text-xs text-slate-400">{product.oldPrice}</del></div>
                {"checkout" in product ? (
                  <a href={product.checkout} target="_blank" rel="noreferrer" className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-500">
                    <ShoppingBag className="size-4" /> Comprar agora
                  </a>
                ) : (
                  <button onClick={addToCart} className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#101828] text-sm font-bold text-white transition hover:bg-blue-600">
                    <ShoppingBag className="size-4" /> Adicionar ao carrinho
                  </button>
                )}
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
