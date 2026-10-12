import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin")({ component: Admin });
const base = "https://ondwevgwqzvpmbycoimq.supabase.co";
const key = "sb_publishable_7IGQQLaQGXhg0HVeGDdd2g_LWklzHkI";
type Cart = { id: string; created_at: string; customer_name: string; whatsapp: string; items: { name: string; quantity: number }[]; status: string };
function Admin() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [carts, setCarts] = useState<Cart[]>([]);
  const [busy, setBusy] = useState(false);
  const sendLink = async () => {
    setBusy(true); setMessage("");
    try {
      const r = await fetch(base + "/auth/v1/otp", { method: "POST", headers: { "Content-Type": "application/json", apikey: key }, body: JSON.stringify({ email, create_user: false, gotrue_meta_security: {} }) });
      setMessage(r.ok ? "Se seu e-mail estiver autorizado, confira sua caixa de entrada." : "Não foi possível enviar o acesso. Confira se o e-mail está autorizado.");
    } catch { setMessage("Não foi possível conectar ao serviço."); }
    setBusy(false);
  };
  const verifyCode = async (code: string) => {
    setBusy(true); setMessage("");
    try {
      const r = await fetch(base + "/auth/v1/verify", { method: "POST", headers: { "Content-Type": "application/json", apikey: key }, body: JSON.stringify({ email, token: code, type: "email" }) });
      const data = await r.json();
      if (!r.ok || !data.access_token) throw Error("Código inválido ou expirado.");
      setToken(data.access_token);
      await loadCarts(data.access_token);
    } catch { setMessage("Não foi possível confirmar o código."); }
    setBusy(false);
  };
  const loadCarts = async (accessToken: string) => {
    try {
      const r = await fetch(base + "/rest/v1/saved_carts?select=id,created_at,customer_name,whatsapp,items,status&order=created_at.desc&limit=100", { headers: { apikey: key, Authorization: "Bearer " + accessToken } });
      if (!r.ok) throw Error("Acesso não autorizado");
      setCarts(await r.json());
      setMessage("Painel atualizado. Apenas administradores autorizados podem visualizar os registros.");
    } catch { setMessage("Não foi possível carregar os carrinhos. Verifique a autorização de administrador."); }
  };
  return <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900">
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
      <a href="/" className="text-sm text-blue-700">← Voltar à Vibe Digital</a>
      <h1 className="mt-5 text-2xl font-black">Painel administrativo · Vibe Digital</h1>
      <p className="mt-2 text-sm text-slate-600">Acesso exclusivo para administradores autorizados. Não compartilhe códigos de acesso.</p>
      {!token ? <div className="mt-6 space-y-3">
        <label className="block text-sm font-semibold" htmlFor="admin-email">E-mail de administrador</label>
        <input id="admin-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border p-3" placeholder="seu@email.com" />
        <button disabled={busy || !email.includes("@")} onClick={sendLink} className="rounded-lg bg-blue-700 px-4 py-3 font-bold text-white disabled:opacity-50">Receber código por e-mail</button>
        <form onSubmit={e => { e.preventDefault(); const form = new FormData(e.currentTarget); void verifyCode(String(form.get("code") || "")); }} className="space-y-2">
          <label className="block text-sm font-semibold" htmlFor="admin-code">Código recebido por e-mail</label>
          <input id="admin-code" name="code" inputMode="numeric" autoComplete="one-time-code" className="w-full rounded-lg border p-3" />
          <button disabled={busy} className="rounded-lg border border-blue-700 px-4 py-3 font-bold text-blue-700">Entrar no painel</button>
        </form>
      </div> : <div className="mt-6">
        <div className="flex flex-wrap gap-3"><button onClick={() => void loadCarts(token)} className="rounded-lg bg-blue-700 px-4 py-2 font-bold text-white">Atualizar</button><button onClick={() => { setToken(""); setCarts([]); }} className="rounded-lg border px-4 py-2">Sair</button></div>
        <p className="mt-4 font-bold">{carts.length} carrinhos encontrados</p>
        <div className="mt-3 space-y-3">{carts.map(c => <article key={c.id} className="rounded-xl border p-4">
          <div className="font-bold">{c.customer_name}</div><p className="text-sm">{c.whatsapp} · {new Date(c.created_at).toLocaleString("pt-BR")} · {c.status}</p>
          <ul className="mt-2 list-inside list-disc text-sm">{c.items.map((i,j) => <li key={j}>{i.name} × {i.quantity}</li>)}</ul>
        </article>)}</div>
      </div>}
      {message && <p role="status" className="mt-4 text-sm text-slate-600">{message}</p>}
    </div>
  </main>;
}