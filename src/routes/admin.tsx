import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin")({ component: Admin });
const base = "https://ondwevgwqzvpmbycoimq.supabase.co";
const key = "sb_publishable_7IGQQLaQGXhg0HVeGDdd2g_LWklzHkI";
type Cart = { id: string; created_at: string; customer_name: string; whatsapp: string; items: { name: string; quantity: number }[]; status: string };
type Review = { id:string; display_name:string; product_name:string; rating:number; comment:string; media_path:string|null; media_type:string|null; status:string; created_at:string }; 
function Admin() {
  const [reviews,setReviews]=useState<Review[]>([]);
  const [mediaUrls,setMediaUrls]=useState<Record<string,string>>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [carts, setCarts] = useState<Cart[]>([]);
  const [busy, setBusy] = useState(false);
  const signIn = async () => {
    setBusy(true); setMessage("");
    try {
      const r = await fetch(base + "/auth/v1/token?grant_type=password", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: key },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });
      const data = await r.json();
      if (!r.ok || !data.access_token) {
        setMessage(r.status === 400 ? "E-mail ou senha incorretos. Se você ainda não criou uma senha no Supabase, configure-a primeiro em Authentication → Users." : "Falha no login (" + r.status + "). Tente novamente.");
        return;
      }
      setPassword("");
      setToken(data.access_token);
      await loadCarts(data.access_token);
      await loadReviews(data.access_token);
    } catch { setMessage("Não foi possível conectar ao Supabase."); }
    finally { setBusy(false); }
  };
  const loadCarts = async (accessToken: string) => {
    try {
      const r = await fetch(base + "/rest/v1/saved_carts?select=id,created_at,customer_name,whatsapp,items,status&order=created_at.desc&limit=100", { headers: { apikey: key, Authorization: "Bearer " + accessToken } });
      if (!r.ok) throw Error("Acesso não autorizado");
      setCarts(await r.json());
      setMessage("Painel atualizado. Apenas administradores autorizados podem visualizar os registros.");
    } catch { setMessage("Não foi possível carregar os carrinhos. Verifique a autorização de administrador."); }
  };
  const loadReviews=async (accessToken:string)=>{try{const r=await fetch(base+"/rest/v1/product_reviews?select=id,display_name,product_name,rating,comment,media_path,media_type,status,created_at&order=created_at.desc&limit=100",{headers:{apikey:key,Authorization:"Bearer "+accessToken}});if(!r.ok)throw Error();const data:Review[]=await r.json();setReviews(data);for(const item of data){if(!item.media_path)continue;const media=await fetch(base+"/storage/v1/object/sign/review-media/"+item.media_path,{method:"POST",headers:{apikey:key,Authorization:"Bearer "+accessToken,"Content-Type":"application/json"},body:JSON.stringify({expiresIn:3600})});if(media.ok){const d=await media.json();if(d.signedURL)setMediaUrls(v=>({...v,[item.id]:base+"/storage/v1"+d.signedURL}));}}}catch{setMessage("Não foi possível carregar as avaliações. Confira o acesso de administrador.");}};
  const moderate=async(id:string,status:"approved"|"rejected")=>{const r=await fetch(base+"/rest/v1/product_reviews?id=eq."+encodeURIComponent(id),{method:"PATCH",headers:{apikey:key,Authorization:"Bearer "+token,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({status})});if(r.ok){setMessage(status==="approved"?"Avaliação aprovada.":"Avaliação rejeitada.");await loadReviews(token);}else setMessage("Falha ao moderar avaliação. Verifique as permissões.");};
  return <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
      <a href="/" className="text-sm text-blue-700">← Voltar à Vibe Digital</a>
      <h1 className="mt-5 text-2xl font-black">Painel administrativo · Vibe Digital</h1>
      <p className="mt-2 text-sm text-slate-600">Acesso exclusivo para administradores autorizados. Entre com seu e-mail e senha. Acesso exclusivo para administradores autorizados.</p>
      {!token ? <div className="mt-6 space-y-3">
        <label className="block text-sm font-semibold" htmlFor="admin-email">E-mail de administrador</label>
        <input id="admin-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border p-3" placeholder="seu@email.com" />
        <label className="block text-sm font-semibold" htmlFor="admin-password">Senha</label>
        <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border p-3" placeholder="Sua senha de administrador" />
        <button disabled={busy || !email.includes("@") || !password} onClick={() => void signIn()} className="rounded-lg bg-blue-700 px-4 py-3 font-bold text-white disabled:opacity-50">Entrar no painel</button>
        <p className="text-xs text-slate-600">Ainda não tem senha? O administrador do Supabase precisa definir uma senha para sua conta em Authentication → Users. Não compartilhe sua senha.</p>
      </div> : <div className="mt-6">
        <div className="flex flex-wrap gap-3"><button onClick={() => void loadCarts(token)} className="rounded-lg bg-blue-700 px-4 py-2 font-bold text-white">Atualizar</button><button onClick={() => { setToken(""); setCarts([]); setReviews([]); }} className="rounded-lg border px-4 py-2">Sair</button></div>
        <section className="mt-7 border-t pt-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-black">Avaliações dos produtos</h2><button onClick={()=>void loadReviews(token)} className="rounded-lg border px-3 py-2 text-sm font-bold">Atualizar avaliações</button></div><p className="mt-2 text-sm text-slate-600">Aprove opiniões reais, inclusive críticas respeitosas. Rejeite spam, ofensas e dados pessoais. Nunca marque uma compra como verificada sem comprovação.</p><div className="mt-4 space-y-3">{reviews.filter(r=>r.status==="pending").map(r=><article key={r.id} className="rounded-xl border p-4"><b>{r.product_name}</b><p className="mt-1 text-sm">{r.display_name} · {r.rating}/5 estrelas · {new Date(r.created_at).toLocaleDateString("pt-BR")}</p><p className="mt-2 whitespace-pre-wrap break-words text-sm">{r.comment}</p>{mediaUrls[r.id]&&(r.media_type==="video"?<video controls src={mediaUrls[r.id]} className="mt-2 max-h-64 w-full"/>:<img src={mediaUrls[r.id]} alt="Mídia da avaliação" className="mt-2 max-h-64 rounded-lg"/>)}<div className="mt-3 flex gap-2"><button onClick={()=>void moderate(r.id,"approved")} className="rounded-lg bg-green-700 px-3 py-2 text-sm font-bold text-white">Aprovar</button><button onClick={()=>void moderate(r.id,"rejected")} className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-bold text-white">Rejeitar</button></div></article>)}{reviews.filter(r=>r.status==="pending").length===0&&<p className="text-sm text-slate-600">Nenhuma avaliação aguardando aprovação.</p>}</div></section>
        <p className="mt-4 font-bold">{carts.length} carrinhos encontrados</p>
        <div className="mt-3 space-y-3">{carts.map(c => <article key={c.id} className="rounded-xl border p-4">
          <div className="font-bold">{c.customer_name}</div><p className="text-sm">{c.whatsapp} · {new Date(c.created_at).toLocaleString("pt-BR")} · {c.status}</p><a href={"https://wa.me/55" + c.whatsapp + "?text=" + encodeURIComponent("Olá, " + c.customer_name + "! Aqui é da Vibe Digital. Você autorizou contato sobre os produtos do seu carrinho. Posso ajudar?")} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block rounded-lg bg-green-700 px-3 py-2 text-sm font-bold text-white">Conversar no WhatsApp</a>
          <ul className="mt-2 list-inside list-disc text-sm">{c.items.map((i,j) => <li key={j}>{i.name} × {i.quantity}</li>)}</ul>
        </article>)}</div>
      </div>}
      {message && <p role="status" className="mt-4 text-sm text-slate-600">{message}</p>}
    </div>
  </main>;
}