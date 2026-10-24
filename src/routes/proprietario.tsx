import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/proprietario")({ component: Proprietario });

function Proprietario() {
  const [scrollY, setScrollY] = useState(0);
  const [pointer, setPointer] = useState({x: 0, y: 0});
  useEffect(() => {
    let frame = 0;
    const onScroll = () => { if (frame) return; frame = requestAnimationFrame(() => { setScrollY(window.scrollY); frame = 0; }); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{from:"owner"|"assistant";text:string}[]>([
    {from:"assistant",text:"Olá, João! 👋 Bem-vindo à central da Vibe Digital. Posso te orientar sobre produtos, pedidos, avaliações e acesso ao painel."}
  ]);
  function send() {
    const q=question.trim(); if(!q)return;
    const s=q.toLowerCase();
    let answer="Posso te orientar sobre sua loja. Para fazer alterações reais, utilize as ferramentas autorizadas do painel administrativo.";
    if(s.includes("produto")||s.includes("preço")||s.includes("estoque")) answer="Os produtos e preços ainda são gerenciados pelo catálogo do site. Esta central não altera o catálogo automaticamente.";
    else if(s.includes("pedido")||s.includes("carrinho")||s.includes("cliente")) answer="Abra o painel administrativo para consultar os carrinhos salvos, após entrar com sua conta autorizada.";
    else if(s.includes("avalia")||s.includes("coment")) answer="No painel administrativo, você pode aprovar ou rejeitar avaliações após autenticação e autorização.";
    else if(s.includes("senha")||s.includes("entrar")||s.includes("acesso")) answer="Crie sua conta ou entre pelo painel administrativo. O acesso aos dados exige permissão de administrador no Supabase; não compartilhe sua senha.";
    setMessages(v=>[...v,{from:"owner",text:q},{from:"assistant",text:answer}]);setQuestion("");
  }
  return <main onPointerMove={e => { if (e.pointerType === "mouse") setPointer({x:(e.clientX / window.innerWidth - .5)*2,y:(e.clientY / window.innerHeight - .5)*2}); }} className="relative isolate min-h-screen overflow-hidden bg-[#08152f] text-white">\n    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">\n      <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 25% 15%, rgba(14,116,244,.27), transparent 52%), radial-gradient(ellipse at 80% 65%, rgba(6,182,212,.16), transparent 45%), linear-gradient(160deg,#08152f,#0b2045 55%,#08152f)"}} />\n      <div className="absolute left-[-15%] top-16 h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-[100px] motion-reduce:transform-none" style={{transform:`translate3d(0, ${Math.min(scrollY * .16, 260)}px, 0)`}} />\n      <div className="absolute right-[-10%] top-[32rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-[100px] motion-reduce:transform-none" style={{transform:`translate3d(0, ${-Math.min(scrollY * .09, 160)}px, 0)`}} />\n      <div className="absolute left-[22%] top-28 h-64 w-64 rounded-full border border-cyan-200/10 bg-gradient-to-br from-white/[.08] via-sky-400/[.03] to-transparent shadow-[inset_0_0_70px_rgba(125,211,252,.08),0_0_90px_rgba(56,189,248,.09)] backdrop-blur-[2px] transition-transform duration-700 motion-reduce:transform-none" style={{transform:`translate3d(${pointer.x*13}px, ${scrollY*.07+pointer.y*10}px, 0) rotate(-16deg)`}} />\n      <div className="absolute right-[12%] top-[34rem] h-80 w-80 rounded-[4rem] border border-blue-100/10 bg-gradient-to-tr from-blue-300/[.09] to-transparent shadow-[inset_0_1px_30px_rgba(255,255,255,.05),0_25px_100px_rgba(3,105,161,.15)] backdrop-blur-[2px] transition-transform duration-700 motion-reduce:transform-none" style={{transform:`translate3d(${pointer.x*-16}px, ${scrollY*-.04+pointer.y*-12}px, 0) rotate(23deg)`}} />\n      <div className="absolute inset-0 opacity-[.07]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)",backgroundSize:"56px 56px"}} />\n    </div>
    <div className="relative mx-auto max-w-6xl px-5 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <a href="/" className="text-xl font-black tracking-tight">VIBE <span className="text-sky-400">DIGITAL</span></a>
        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-200">Central do proprietário · acesso protegido</span>
      </header>
      <section className="mt-10 rounded-3xl border border-white/20 bg-gradient-to-br from-blue-700/95 via-blue-600/90 to-cyan-600/80 p-7 shadow-[0_30px_90px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-xl md:p-10">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-100">Sua loja, seu espaço</p>
        <h1 className="mt-3 text-3xl font-black md:text-5xl">Olá, proprietário João! 👋</h1>
        <p className="mt-4 max-w-2xl text-blue-50">Bem-vindo à sua central Vibe Digital. Acompanhe os caminhos de gestão da loja e converse com o assistente de orientação.</p>
        <a href="/admin" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-blue-800 shadow-lg">Entrar no painel administrativo →</a>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[{icon:"🛒",title:"Pedidos e carrinhos",desc:"Consulte os carrinhos registrados no painel autorizado."},{icon:"⭐",title:"Avaliações",desc:"Analise e modere opiniões enviadas por clientes."},{icon:"📦",title:"Produtos e preços",desc:"Veja o catálogo público; a edição direta ainda precisa ser integrada."}].map(x=><article key={x.title} className="rounded-2xl border border-white/15 bg-white/[.07] p-6 shadow-[0_18px_45px_rgba(0,0,0,.18),inset_0_1px_0_rgba(255,255,255,.09)] backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/[.1]"><div className="text-3xl">{x.icon}</div><h2 className="mt-4 text-xl font-bold">{x.title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-300">{x.desc}</p><a href={x.title==="Produtos e preços"?"/":x.title==="Avaliações"?"/admin#avaliacoes":"/admin#carrinhos"} className="mt-5 inline-block font-semibold text-sky-300">Abrir →</a></article>)}
      </section>
      <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white text-slate-900 shadow-xl">
        <div className="bg-slate-50 px-6 py-5"><h2 className="text-xl font-black">💬 Conversar com a Vibe Digital</h2><p className="mt-1 text-sm text-slate-600">Assistente de orientação com respostas predefinidas; não é um chat de IA nem altera dados.</p></div>
        <div aria-live="polite" className="max-h-96 min-h-56 space-y-3 overflow-y-auto p-6">{messages.map((m,i)=><div key={i} className={"flex "+(m.from==="owner"?"justify-end":"justify-start")}><p className={"max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed "+(m.from==="owner"?"bg-blue-700 text-white":"bg-slate-100 text-slate-800")}>{m.text}</p></div>)}</div>
        <form onSubmit={e=>{e.preventDefault();send();}} className="flex gap-2 border-t p-4"><input aria-label="Sua mensagem" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Pergunte sobre pedidos, produtos, avaliações..." className="min-w-0 flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/><button className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">Enviar</button></form>
      </section>
      <p className="py-8 text-center text-xs text-slate-400">O título de proprietário é uma saudação visual. Dados privados e ações administrativas continuam exigindo autenticação e autorização.</p>
    </div>
  </main>;
}
