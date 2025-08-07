import { useMemo } from 'react'
import './index.css'

function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600" />
          <span className="text-lg font-semibold tracking-tight">FinSight</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <a className="hover:text-white transition" href="#features">Fonctionnalités</a>
          <a className="hover:text-white transition" href="#research">Recherche</a>
          <a className="hover:text-white transition" href="#pricing">Tarifs</a>
          <a className="hover:text-white transition" href="#docs">Docs</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex h-9 items-center rounded-md border border-white/10 px-3 text-sm text-zinc-200 hover:bg-white/5">Se connecter</button>
          <button className="inline-flex h-9 items-center rounded-md bg-brand-600 px-4 text-sm font-medium text-white shadow-subtle hover:bg-brand-500">Créer un compte</button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="border-b border-white/5 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-400/90">Plateforme financière</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-semibold leading-tight">
              Suivez, testez et optimisez votre <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">portefeuille</span>
            </h1>
            <p className="mt-4 text-zinc-300 max-w-xl">
              Outils professionnels pour la gestion quantitative: backtests, simulations de Monte Carlo, attribution de performance et alertes en temps réel.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-100">Démarrer gratuitement</button>
              <button className="inline-flex h-11 items-center rounded-md border border-white/10 px-5 text-sm font-medium text-zinc-100 hover:bg-white/5">Voir la démo</button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
              <Kpi label="Actifs suivis" value="12 438" delta="+128" />
              <Kpi label="Stratégies" value="58" delta="+3" />
              <Kpi label="Backtests" value="1 207" delta="+41" />
            </div>
          </div>
          <div className="relative">
            <div className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-xl shadow-subtle p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Indice synthétique (YTD)</span>
                <span className="text-sm text-emerald-400">+14.2%</span>
              </div>
              <ChartArea />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniStat title="Sharpe" value="1.42" trend="up" />
                <MiniStat title="Max Drawdown" value="-6.9%" trend="down" />
                <MiniStat title="Volatilité" value="12.3%" trend="flat" />
                <MiniStat title="VaR 95%" value="-2.1%" trend="down" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Kpi({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-xl shadow-subtle p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        {delta && <span className="text-xs text-emerald-400">{delta}</span>}
      </div>
    </div>
  )
}

function MiniStat({ title, value, trend }: { title: string; value: string; trend?: 'up' | 'down' | 'flat' }) {
  const color = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-zinc-300'
  return (
    <div className="rounded-lg border border-white/5 bg-zinc-900/40 p-3">
      <div className="text-xs text-zinc-400">{title}</div>
      <div className={`mt-1 text-sm font-medium ${color}`}>{value}</div>
    </div>
  )
}

function ChartArea() {
  const points = useMemo(() => {
    // Simple synthetic series
    const values: number[] = []
    let value = 100
    for (let i = 0; i < 36; i++) {
      value += (Math.random() - 0.3) * 4
      values.push(Math.max(90, value))
    }
    const max = Math.max(...values)
    const min = Math.min(...values)
    const width = 560
    const height = 200
    const path = values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * width
        const y = height - ((v - min) / (max - min)) * height
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
    return { path, width, height }
  }, [])

  return (
    <div className="mt-4">
      <svg width="100%" height={220} viewBox={`0 0 ${points.width} ${points.height}`} className="rounded-md bg-gradient-to-b from-zinc-900 to-zinc-950">
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={points.path} stroke="#34d399" strokeWidth="2" fill="none" />
        <path d={`${points.path} L ${points.width},${points.height} L 0,${points.height} Z`} fill="url(#grad)" />
      </svg>
    </div>
  )
}

function Features() {
  const features = [
    {
      title: 'Backtesting institutionnel',
      desc: 'Moteur rapide pour évaluer stratégies multi-actifs, règles d’allocation, et gestion du risque.',
    },
    {
      title: 'Simulations de Monte Carlo',
      desc: 'Scénarios probabilistes, distributions de rendements et stress tests en un clic.',
    },
    {
      title: 'Données et recherche',
      desc: 'Données marchés, facteurs, et API pour développer et affiner vos modèles.',
    },
    {
      title: 'Portefeuilles dynamiques',
      desc: 'Suivi quotidien, attribution de performance et rééquilibrages automatisés.',
    },
  ]
  return (
    <section id="features" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold">Ce que vous pouvez faire</h2>
          <p className="mt-2 text-zinc-300">Des outils conçus pour les investisseurs exigeants, inspirés par les plateformes de courtage modernes.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-xl shadow-subtle p-5">
              <div className="h-8 w-8 rounded bg-brand-600/20 border border-brand-500/30" />
              <div className="mt-3 font-medium">{f.title}</div>
              <p className="mt-1 text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResearchCTA() {
  return (
    <section id="research" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-2xl font-semibold">Un espace de recherche moderne</h3>
          <p className="mt-2 text-zinc-300">Notebook intégré, visualisations avancées et librairies Python pour itérer rapidement sur vos idées et exécuter des expériences reproductibles.</p>
          <div className="mt-6 flex gap-3">
            <button className="inline-flex h-10 items-center rounded-md bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-500">Ouvrir le Research</button>
            <button className="inline-flex h-10 items-center rounded-md border border-white/10 px-4 text-sm font-medium text-gray-100 hover:bg-white/5">Documentation</button>
          </div>
        </div>
        <div className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-xl shadow-subtle p-4">
          <div className="h-48 rounded-lg bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-500/30 via-zinc-900 to-zinc-950" />
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded border border-white/5 p-3 bg-zinc-900/40">Signals</div>
            <div className="rounded border border-white/5 p-3 bg-zinc-900/40">Factors</div>
            <div className="rounded border border-white/5 p-3 bg-zinc-900/40">Pipelines</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const tiers = [
    { name: 'Starter', price: 'Gratuit', features: ['Portefeuille personnel', 'Backtests de base', 'Données EOD'] },
    { name: 'Pro', price: '49€/mois', features: ['Backtests avancés', 'Monte Carlo illimité', 'Données intraday'] },
    { name: 'Institution', price: 'Sur mesure', features: ['SLA dédié', 'Intégrations tierces', 'Support prioritaire'] },
  ]
  return (
    <section id="pricing" className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <h3 className="text-2xl font-semibold">Tarification</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div key={t.name} className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-xl shadow-subtle p-6 flex flex-col">
              <div className="text-sm text-zinc-400">{t.name}</div>
              <div className="mt-2 text-2xl font-semibold">{t.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-100">Choisir</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-brand-400 to-brand-600" />
          <span>© {new Date().getFullYear()} FinSight</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-zinc-200">Mentions légales</a>
          <a href="#" className="hover:text-zinc-200">Confidentialité</a>
          <a href="#" className="hover:text-zinc-200">Sécurité</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-full bg-zinc-900 text-zinc-100 antialiased">
      <NavBar />
      <Hero />
      <Features />
      <ResearchCTA />
      <Pricing />
      <Footer />
    </div>
  )
}
