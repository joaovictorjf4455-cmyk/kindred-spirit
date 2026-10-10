import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, ChevronRight, Headphones, Heart, Menu,
  Search, ShieldCheck, ShoppingBag, Sparkles, Star, Truck, UserRound, CreditCard,
  Watch, X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const categories = [
  { name: "Áudio", icon: Headphones },
  { name: "Boombox", icon: ShoppingBag },
  { name: "Teclado", icon: ShoppingBag },
  { name: "Relógios", icon: Watch },
  { name: "Acessórios", icon: ShoppingBag },
];

const products = [
  { name: "PRATA - P9- Fone De Ouvido Bluetooth Air - S/ Fio Wireless Headphone | AJ-D24", category: "Áudio", price: "R$ 99,90", oldPrice: "R$ 149,90", discount: "33% OFF", rating: "4.8", reviews: "Produto em destaque", image: "data:image/jpeg;base64,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", checkout: "https://pay.kaiross.com.br/Pnt8zHTsmLmH" },
  { name: "PRETO - FONE HEADSET GAMER RGB Rainbow", category: "Áudio", price: "R$ 99,90", oldPrice: "", discount: "", rating: "4.8", reviews: "Oferta especial", image: "/gamer.jpg", checkout: "https://pay.kaiross.com.br/1tl7a6atNmMU" },
  { name: "PRETO - D20 - Relógio Inteligente", category: "Relógios", price: "R$ 99,90", oldPrice: "", discount: "", rating: "4.8", reviews: "Oferta especial", image: "https://app.seuarmazemdrop.com.br/uploads/1756474573-3.png", checkout: "https://pay.kaiross.com.br/8UiczJZxaWGb" },
  { name: "Smartwatch C20Pro com chamada Bluetooth e modo esportivo outdoor", category: "Relógios", price: "R$ 500,00", oldPrice: "R$ 1.000,00", discount: "50% OFF", rating: "4.8", reviews: "Oferta especial", image: "https://i5.walmartimages.com/seo/C20-PRO-Military-Smart-Watches-Men-IP68-Waterproof-Rugged-Bluetooth-Call-Answer-Dial-Calls-1-83-Tactical-Fitness-Watch-Tracker-Android-iOS-Outdoor-Sp_a9806e58-368a-4f70-b9a7-b77fc1d86769.9c217738ee84b32b67a7223eef00e453.jpeg?odnBg=FFFFFF&odnHeight=1200&odnWidth=1200", checkout: "https://pay.kaiross.com.br/yGf0c73o8S1l" },
  { name: "PRETO - Caixa De Som Boombox Bluetooth Bivolt", category: "Boombox", price: "R$ 500,00", oldPrice: "R$ 1.000,00", discount: "50% OFF", rating: "4.8", reviews: "Oferta em destaque", image: "https://app.seuarmazemdrop.com.br/uploads/1752234501-4.png", checkout: "https://pay.kaiross.com.br/iUtzjjIQUYbv" },
  { name: "CARREGADOR PORTÁTIL DOBRÁVEL Magsafe 3 em 1 - Branco", category: "Acessórios", price: "R$ 99,90", oldPrice: "R$ 189,90", discount: "47% OFF", rating: "4.8", reviews: "Oferta especial", image: "/magsafe.jpg", checkout: "https://pay.kaiross.com.br/crT4puVOrlIX" },
  { name: "Bateria Powerbank MagSafe Apple — encaixe magnético", category: "Acessórios", price: "R$ 99,90", oldPrice: "R$ 149,90", discount: "33% OFF", rating: "5.0", reviews: "Novo", image: "https://m.magazineluiza.com.br/a-static/420x420/bateria-magsafe-apple-para-iphones-12-12-pro-12-max-e-12-mini-branco-mjwy3be-a/kabum/462812/2caaad4cb668bbc0e571a3aeedc5cc9c.jpeg", checkout: "https://pay.kaiross.com.br/LTrcwjrKwkEv" },
  { name: "BRANCO - Conjunto de Teclado + Mouse Sem Fio Bluetooth Para Notebook e Tablet", category: "Teclado", price: "R$ 99,90", oldPrice: "", discount: "", rating: "4.8", reviews: "Oferta especial", image: "/tecladomouse.jpg", checkout: "https://pay.kaiross.com.br/SdGy86ZVqs1x" },
  { name: "BRANCO - Conjunto de Teclado + Mouse Sem Fio Bluetooth Para Notebook e Tablet", category: "Teclado", price: "R$ 99,90", oldPrice: "", discount: "", rating: "4.8", reviews: "Oferta especial", image: "https://raw.githubusercontent.com/joaovictorjf4455-cmyk/kindred-spirit/main/public/tecladomouse-preto.jpg?rev=6067bf3", checkout: "https://pay.kaiross.com.br/FAcrHlBuEbH9" },
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
    <main className="storefront min-h-screen bg-[#F4F6F8] text-[#2B2D42]">
      <div className="promo-strip bg-[#2B2D42] px-4 py-2 text-center text-xs font-bold text-white">
        <span>⚡ OFERTAS ESPECIAIS • Tecnologia para o seu dia a dia</span>
      </div>

      <header className="ohmira-header sticky top-0 z-30 text-white">
        <div className="mx-auto flex min-h-[82px] max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <a href="#" aria-label="Ohmira Eletrônicos — página inicial" className="group flex shrink-0 items-center gap-2.5">
            <svg viewBox="0 0 48 48" aria-hidden="true" className="size-11 drop-shadow-[0_3px_8px_rgba(45,108,223,0.28)]">
              <defs><linearGradient id="ohmira-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="48%" stopColor="#AAB7CE"/><stop offset="100%" stopColor="#F8FAFF"/></linearGradient><linearGradient id="ohmira-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#69B5FF"/><stop offset="100%" stopColor="#1760D5"/></linearGradient></defs>
              <path d="M24 5.5a17.5 17.5 0 1 0 17.5 17.5" fill="none" stroke="url(#ohmira-metal)" strokeWidth="5.5" strokeLinecap="round"/>
              <path d="M24 2.5v15" stroke="url(#ohmira-blue)" strokeWidth="5.5" strokeLinecap="round"/>
              <path d="M5.5 31.5c7.5 8 24 8.5 35-5.5 2-2.5 3.5-5 4.5-7.5-10.5 7-24.5 9.5-40 7.5" fill="none" stroke="url(#ohmira-blue)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="flex flex-col leading-none">
              <span className="text-[1.55rem] font-black tracking-[-0.055em] text-white">Ohmira</span>
              <span className="mt-1 text-[0.58rem] font-bold tracking-[0.32em] text-[#72A8FF]">ELETRÔNICOS</span>
            </span>
          </a>
          <div className="ohmira-search ml-auto hidden max-w-xl flex-1 items-center rounded-xl px-3 md:flex">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="O que você está buscando?" className="h-11 w-full bg-transparent px-2 text-sm text-slate-900 outline-none placeholder:text-slate-500" />
            <Search className="size-5 shrink-0 text-white" />
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-0 md:gap-3">
            <div className="hidden items-center gap-2 px-2 lg:flex"><UserRound className="size-5 text-[#4389FF]"/><span className="text-xs leading-4"><b className="block">Minha conta</b><span className="text-slate-300">Bem-vindo(a)</span></span></div>
            <div className="hidden items-center gap-2 px-2 sm:flex"><Heart className="size-5 text-[#4389FF]"/><span className="text-xs leading-4"><b className="block">Favoritos</b><span className="text-slate-300">Salve produtos</span></span></div>
            <button className="relative flex items-center gap-2 rounded-xl p-2.5 transition hover:bg-white/10" aria-label="Carrinho">
              <ShoppingBag className="size-5 text-[#4389FF]" />
              <span className="hidden text-xs sm:block"><b className="block">Carrinho</b><span className="text-slate-300">{cart} itens</span></span>
              {cart > 0 && <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-[#0877FF] text-[10px] font-bold text-white">{cart}</span>}
            </button>
          </div>
        </div>
        <nav className={`ohmira-nav ${menuOpen ? "block" : "hidden"} lg:block`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3 text-sm font-semibold sm:flex-row sm:items-center sm:gap-7 lg:px-8">
            <a href="#categorias" className="flex items-center gap-2 py-2 text-white"><Menu className="size-4"/> Todas as categorias</a>
            <a href="#inicio" onClick={() => setMenuOpen(false)} className="py-2 text-[#65A4FF]">Início</a>
            <a href="#produtos" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#65A4FF]">Eletrônicos</a>
            <a href="#ofertas" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#65A4FF]">Ofertas</a>
            <a href="#beneficios" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#65A4FF]">Compra segura</a>
            <a href="#depoimentos" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#65A4FF]">Avaliações</a>
          </div>
        </nav>
      </header>

      <section id="inicio" className="reference-hero relative overflow-hidden">
        <div className="reference-hero-glow" aria-hidden="true"/>
        <div className="relative mx-auto grid max-w-7xl items-center gap-5 px-5 py-8 md:min-h-[360px] md:grid-cols-[0.92fr_1.08fr] md:py-10 lg:px-8">
          <div className="relative z-10 py-3">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0877FF] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-blue-950/30"><Sparkles className="size-4"/> Oferta em destaque</span>
            <p className="text-base font-bold text-white/90">Ohmira apresenta</p>
            <h1 className="mt-2 max-w-xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">Boombox Bluetooth. <span className="text-[#1680FF]">Som potente, oferta imperdível.</span></h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">Curta seus momentos com a caixa de som Boombox Bluetooth por tempo limitado com 50% OFF.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://pay.kaiross.com.br/iUtzjjIQUYbv" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0877FF] px-6 text-sm font-extrabold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500">Comprar Boombox <ArrowRight className="size-4"/></a>
              <a href="#produtos" className="inline-flex h-12 items-center rounded-xl border border-white/25 px-5 text-sm font-bold text-white transition hover:bg-white/10">Ver produtos</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-300"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#4396FF]"/> Compra segura</span><span className="flex items-center gap-2"><Truck className="size-4 text-[#4396FF]"/> Entrega rápida</span><span className="flex items-center gap-2"><CreditCard className="size-4 text-[#4396FF]"/> Pagamento facilitado</span></div>
          </div>
          <div className="reference-product-stage relative flex min-h-[270px] items-center justify-center md:min-h-[330px]">
            <div className="reference-orbit reference-orbit-one" aria-hidden="true"/><div className="reference-orbit reference-orbit-two" aria-hidden="true"/>
            <img src="https://app.seuarmazemdrop.com.br/uploads/1752234501-4.png" alt="Caixa de som Boombox preta" className="boombox-hero-image relative z-10 max-h-[330px] w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] md:max-h-[390px]" />
            <div className="absolute right-0 top-3 z-20 grid size-24 -rotate-6 place-items-center rounded-[1.6rem] bg-[#0877FF] text-center text-white shadow-xl shadow-blue-950/50 sm:right-5 sm:size-28"><span><b className="block text-3xl font-black sm:text-4xl">50%</b><span className="text-sm font-black uppercase">OFF*</span></span></div>
            <div className="absolute bottom-2 left-2 z-20 rounded-2xl border border-white/15 bg-[#101B30]/90 px-4 py-3 text-white shadow-xl backdrop-blur sm:left-8"><p className="text-[10px] font-bold uppercase tracking-widest text-[#75B2FF]">Destaque da loja</p><p className="mt-1 font-extrabold">Boombox Bluetooth</p><p className="text-xs text-slate-300">Som para curtir cada momento</p></div>
          </div>
        </div>
      </section>
      <section id="categorias" className="reference-trust-strip border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 py-5 sm:grid-cols-4 lg:px-8">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2"><ShieldCheck className="size-8 shrink-0 text-[#3988FF]"/><span className="text-xs leading-5"><b className="block text-white">Compra segura</b><span className="text-slate-300">Mais tranquilidade</span></span></div>
          <div className="flex items-center gap-3 rounded-xl px-2 py-2"><Truck className="size-8 shrink-0 text-[#3988FF]"/><span className="text-xs leading-5"><b className="block text-white">Entrega rápida</b><span className="text-slate-300">Acompanhe seu pedido</span></span></div>
          <div className="flex items-center gap-3 rounded-xl px-2 py-2"><CreditCard className="size-8 shrink-0 text-[#3988FF]"/><span className="text-xs leading-5"><b className="block text-white">Pagamento facilitado</b><span className="text-slate-300">Praticidade para comprar</span></span></div>
          <div className="flex items-center gap-3 rounded-xl px-2 py-2"><Headphones className="size-8 shrink-0 text-[#3988FF]"/><span className="text-xs leading-5"><b className="block text-white">Suporte especializado</b><span className="text-slate-300">Conte com a Ohmira</span></span></div>
        </div>
      </section>
      <section className="category-filter border-b border-[#E1E4EA] bg-white">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto bg-[#F4F6F8] px-5 py-5 lg:px-8">
          <button onClick={() => setActiveCategory("Todos")} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold ${activeCategory === "Todos" ? "bg-[#2D6CDF] text-white" : "bg-white text-[#55596D] hover:bg-[#E8EBF0]"}`}>Todos</button>
          {categories.map(({ name, icon: Icon }) => (
            <button key={name} onClick={() => setActiveCategory(name)} className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ${activeCategory === name ? "bg-[#2D6CDF] text-white" : "bg-white text-[#55596D] hover:bg-[#E8EBF0]"}`}>
              <Icon className="size-4" /> {name}
            </button>
          ))}
        </div>
      </section>

      <section id="ofertas" className="offers-section mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-widest text-[#0877FF]">Escolhas da Ohmira</p><h2 className="mt-1 text-3xl font-black tracking-tight">Produtos em <span className="text-[#0877FF]">destaque</span></h2></div>
          <a href="#produtos" className="hidden items-center gap-1 text-sm font-bold text-[#2D6CDF] sm:flex">Ver tudo <ChevronRight className="size-4" /></a>
        </div>
        <div id="produtos" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.name} className="product-card group overflow-hidden rounded-2xl border border-[#E1E4EA] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B2D42]/10">
              <div className="product-image-wrap relative bg-white">
                <img src={product.image} alt={product.name} onError={(event) => { if (product.name.includes("Powerbank")) {
      event.currentTarget.onerror = null;
      event.currentTarget.src = "https://m.magazineluiza.com.br/a-static/420x420/bateria-magsafe-apple-para-iphones-12-12-pro-12-max-e-12-mini-branco-mjwy3be-a/kabum/462812/2caaad4cb668bbc0e571a3aeedc5cc9c.jpeg";
    } }} className={`h-56 w-full transition duration-500 group-hover:scale-[1.02] ${product.name.includes("Powerbank") ? "bg-white object-contain p-5 drop-shadow-[0_14px_22px_rgba(15,23,42,0.10)]" : product.name.includes("C20Pro") ? "bg-white object-contain p-3" : product.name.includes("HEADSET GAMER RGB") ? "bg-white object-contain p-3" : product.category === "Acessórios" ? "bg-white object-contain p-3" : "object-cover"}`} />
                {product.discount && <span className="absolute left-3 top-3 rounded-lg bg-[#2D6CDF] px-2.5 py-1 text-[11px] font-black text-white">{product.discount}</span>}
                <button className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-[#686C7E] shadow-sm hover:text-red-500" aria-label="Favoritar"><Heart className="size-4" /></button>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-[#777B8D]">{product.category}</p>
                <h3 className="mt-1 font-bold">{product.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs"><Star className="size-3.5 fill-amber-400 text-amber-400" /><b>{product.rating}</b><span className="text-[#777B8D]">({product.reviews})</span></div>
                <div className="mt-4 flex items-end gap-2"><span className="text-xl font-black text-[#2D6CDF]">{product.price}</span>{product.oldPrice && <del className="text-xs text-[#777B8D]">{product.oldPrice}</del>}</div>
                {"checkout" in product ? (
                  <a href={product.checkout} target="_blank" rel="noreferrer" className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#2D6CDF] text-sm font-bold text-white transition hover:bg-[#2459B8]">
                    <ShoppingBag className="size-4" /> Comprar agora
                  </a>
                ) : (
                  <button onClick={addToCart} className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#2D6CDF] text-sm font-bold text-white transition hover:bg-[#2459B8]">
                    <ShoppingBag className="size-4" /> Adicionar ao carrinho
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
        {filteredProducts.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-[#686C7E]">Nenhum produto encontrado. Tente outra busca.</div>}
      </section>

      <section id="beneficios" className="benefits-section border-y border-[#E1E4EA] bg-white">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-12 sm:grid-cols-3 lg:px-8">
          {[
            [Truck, "Entrega rápida", "Despachamos seu pedido com agilidade e rastreio completo."],
            [ShieldCheck, "Compra protegida", "Pagamento seguro e garantia para você comprar tranquilo."],
            [Headphones, "Suporte de verdade", "Time especializado para ajudar antes e depois da compra."],
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="flex gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#F4F6F8] text-[#2D6CDF]"><Icon className="size-5" /></span>
              <div><h3 className="font-bold">{title as string}</h3><p className="mt-1 text-sm leading-6 text-[#686C7E]">{text as string}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="depoimentos" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="testimonial-panel rounded-[2rem] bg-[#2D6CDF] px-6 py-12 text-center text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-widest text-[#DCE7FF]">Quem compra, recomenda</p>
          <div className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-1">{[1,2,3,4,5].map((i) => <Star key={i} className="size-5 fill-current" />)}</div>
          <blockquote className="mx-auto mt-5 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">“Comprei na Ohmira Eletrônicos e foi a melhor experiência online que já tive. Entrega rápida e atendimento impecável.”</blockquote>
          <p className="mt-5 text-sm text-[#DCE7FF]">Mariana S. · Cliente verificada</p>
        </div>
      </section>

      <footer className="bg-[#2B2D42] px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div><div className="flex items-center gap-2.5"><svg viewBox="0 0 48 48" aria-hidden="true" className="size-9"><path d="M24 5.5a17.5 17.5 0 1 0 17.5 17.5" fill="none" stroke="#DCE6F7" strokeWidth="5.5" strokeLinecap="round"/><path d="M24 2.5v15" stroke="#2D6CDF" strokeWidth="5.5" strokeLinecap="round"/><path d="M5.5 31.5c7.5 8 24 8.5 35-5.5 2-2.5 3.5-5 4.5-7.5-10.5 7-24.5 9.5-40 7.5" fill="none" stroke="#2D6CDF" strokeWidth="3.8" strokeLinecap="round"/></svg><span className="flex flex-col leading-none"><span className="text-lg font-black tracking-tight">Ohmira</span><span className="mt-1 text-[0.48rem] font-bold tracking-[0.28em] text-[#2D6CDF]">ELETRÔNICOS</span></span></div><p className="mt-2 text-xs text-[#777B8D]">Tecnologia que facilita sua vida.</p></div>
          <p className="text-xs text-[#686C7E]">© 2026 Ohmira Eletrônicos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
