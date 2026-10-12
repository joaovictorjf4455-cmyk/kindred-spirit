import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin")({ component: Admin });
const base = "https://ondwevgwqzvpmbycoimq.supabase.co";
const key = "sb_publishable_7IGQQLaQGXhg0HVeGDdd2g_LWklzHkI";
type Cart = { id: string; created_at: string; customer_name: string; whatsapp: string; items: { name: string; quantity: number }[]; status: string };
function Admin() {
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