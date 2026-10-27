import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, LockKeyhole, UserRound } from "lucide-react";

export const Route = createFileRoute("/conta")({ component: Account, head: () => ({ meta: [{ title: "Minha Conta | Vibe Digital" }, { name: "description", content: "Acesse ou crie sua conta na Vibe Digital." }] }) });
const base = "https://sumiouuwiancxkroffgl.supabase.co";
const key = "sb_publishable_ST-BGkmR12iXNHM9GdTDFQ_TfNxDbIy";
type AccountUser = { id: string; email?: string; user_metadata?: { full_name?: string } };
function Account() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<AccountUser | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    if (password.length < 8) { setMessage("Use uma senha com pelo menos 8 caracteres."); return; }
    if (mode === "register" && name.trim().length < 2) { setMessage("Informe seu nome."); return; }
    setBusy(true); setMessage("");
    try {
      const isRegister = mode === "register";
      const response = await fetch(base + (isRegister ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password"), {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: key },
        body: JSON.stringify(isRegister ? { email: email.trim().toLowerCase(), password, data: { full_name: name.trim() } } : { email: email.trim().toLowerCase(), password })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const code = String(data.code || data.error_code || "").toLowerCase();
        if (response.status === 429 || code.includes("rate_limit") || code.includes("over_email_send_rate_limit")) {
          setMessage("O Supabase limitou temporariamente as tentativas. Aguarde antes de tentar novamente; repetir agora não vai liberar o cadastro.");
        } else if (code.includes("email_not_confirmed")) {
          setMessage("Confirme seu e-mail antes de entrar. Confira também a pasta de spam.");
        } else if (code.includes("user_already_exists") || code.includes("email_exists")) {
          setMessage("Este e-mail já possui cadastro. Use a opção Entrar.");
        } else if (code.includes("email_address_invalid")) {
          setMessage("Confira o endereço de e-mail informado.");
        } else if (code.includes("weak_password")) {
          setMessage("Escolha uma senha mais forte, com pelo menos 8 caracteres.");
        } else if (response.status >= 500) {
          setMessage("O serviço de cadastro está temporariamente indisponível. Tente mais tarde.");
        } else {
          setMessage(isRegister ? "Não foi possível concluir o cadastro. Confira os dados ou tente novamente mais tarde." : "Não foi possível entrar. Confira seu e-mail, senha e confirmação de cadastro.");
        }
        return;
      }
      setPassword("");
      if (data.access_token && data.user) {
        setUser(data.user);
        setMessage("Acesso realizado com sucesso!");
      } else if (isRegister) {
        setMessage("Cadastro solicitado. Se a confirmação de e-mail estiver habilitada, confira sua caixa de entrada antes de entrar. Não compartilhe códigos com ninguém.");
        setMode("login");
      } else {
        setMessage("Não foi possível iniciar a sessão. Tente novamente.");
      }
    } catch { setMessage("Não foi possível conectar agora. Tente novamente mais tarde."); }
    finally { setBusy(false); }
  };
  return (
    <main className="min-h-screen bg-[#F4F6F8] px-4 py-10 text-[#202840]">
      <div className="mx-auto max-w-md">
        <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2459B8]"><ArrowLeft className="size-4" /> Voltar à loja</a>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-[#142B56] px-7 py-8 text-center text-white">
            <div className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-[#2674E8]"><UserRound className="size-7" /></div>
            <h1 className="text-2xl font-black">Minha Conta</h1>
            <p className="mt-2 text-sm text-blue-100">Vibe Digital • Tecnologia para você</p>
          </div>
          <div className="p-6 sm:p-8">
            {user ? (
              <div className="space-y-4">
                <h2 className="text-xl font-black">Olá, {user.user_metadata?.full_name || "cliente"}!</h2>
                <p className="text-sm text-slate-600">Você entrou com {user.email}. Sua conta foi autenticada.</p>
                <p className="rounded-xl bg-blue-50 p-4 text-sm leading-6">As compras continuam sendo finalizadas no checkout externo de cada produto. O histórico de pedidos ainda não está integrado à sua conta.</p>
                <button type="button" onClick={() => { setUser(null); setMessage("Você saiu da sua conta neste aparelho."); }} className="w-full rounded-xl border border-slate-300 px-4 py-3 font-bold">Sair</button>
              </div>
            ) : (
              <>
                <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-bold">
                  <button type="button" onClick={() => { setMode("login"); setMessage(""); }} className={`rounded-lg px-3 py-3 ${mode === "login" ? "bg-white text-[#2459B8] shadow-sm" : "text-slate-600"}`}>Entrar</button>
                  <button type="button" onClick={() => { setMode("register"); setMessage(""); }} className={`rounded-lg px-3 py-3 ${mode === "register" ? "bg-white text-[#2459B8] shadow-sm" : "text-slate-600"}`}>Criar conta</button>
                </div>
                <form onSubmit={submit} className="space-y-4">
                  {mode === "register" && <label className="block text-sm font-semibold">Nome completo<input required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal" /></label>}
                  <label className="block text-sm font-semibold">E-mail<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal" /></label>
                  <label className="block text-sm font-semibold">Senha<input required type="password" minLength={8} autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block min-h-12 w-full rounded-xl border border-slate-300 px-4 font-normal" /></label>
                  <button disabled={busy} type="submit" className="min-h-12 w-full rounded-xl bg-[#246BE0] px-4 py-3 font-black text-white disabled:opacity-60">{busy ? "Aguarde..." : mode === "register" ? "Criar minha conta" : "Entrar na minha conta"}</button>
                </form>
                <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-600"><LockKeyhole className="mt-0.5 size-4 shrink-0" /> Sua senha é enviada diretamente ao serviço de autenticação Supabase. O cadastro é opcional para comprar.</p>
              </>
            )}
            {message && <p role="status" className="mt-5 rounded-xl bg-slate-100 p-3 text-sm">{message}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
