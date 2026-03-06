import { useEffect, useRef, useState } from 'react'
import { LANGUAGE_OPTIONS, useLanguage } from '../../contexts/languageContext'
import { useTheme } from '../../contexts/useTheme'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, copy } = useLanguage()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement | null>(null)

  const currentLanguage =
    LANGUAGE_OPTIONS.find((option) => option.code === language) ?? LANGUAGE_OPTIONS[0]

  useEffect(() => {
    if (!isLanguageMenuOpen) {
      return undefined
    }

    function handlePointerDown(event: MouseEvent) {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsLanguageMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLanguageMenuOpen])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-2 z-50 flex justify-center md:top-3">
      <div className="pointer-events-auto mx-4 flex h-14 w-full max-w-[1180px] items-center gap-8 rounded-full border border-border-light/70 bg-surface-white/80 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.15)] dark:border-border-dark/70 dark:bg-surface-dark/90 dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] dark:backdrop-blur-xl md:px-6">
        <a className="group mr-2 flex cursor-pointer items-center gap-2" href="#overview">
          <div className="size-6 text-primary transition-transform duration-500 group-hover:rotate-180">
            <span className="material-symbols-outlined text-2xl">token</span>
          </div>
          <span className="hidden text-lg font-bold tracking-tight text-text-charcoal dark:text-white sm:block">
            {copy.header.brand}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {copy.header.nav.map((item) => (
            <a
              key={item.label}
              className="text-xs font-medium uppercase tracking-wide text-text-silver-light transition-colors hover:text-primary-dark dark:text-text-silver-dark dark:hover:text-primary"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={(event) => toggleTheme(event)}
            aria-label={copy.header.themeLabel}
            className="flex size-8 items-center justify-center rounded-full text-text-silver-light transition-all duration-200 hover:scale-110 hover:bg-black/5 hover:text-primary hover:shadow-[0_0_12px_rgba(212,175,55,0.3)] active:scale-90 dark:text-text-silver-dark dark:hover:bg-white/5"
          >
            <span className="material-symbols-outlined text-lg">
              {theme === 'dark' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
          <div className="relative" ref={languageMenuRef}>
            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
              aria-label={copy.header.languageLabel}
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
              className="flex h-8 items-center gap-2 rounded-full border border-border-light px-3 text-xs font-bold text-text-charcoal transition-all duration-200 hover:border-primary/40 hover:text-primary dark:border-border-dark dark:text-white"
            >
              <span>{currentLanguage.label}</span>
              <span
                className={`material-symbols-outlined text-base transition-transform duration-200 ${
                  isLanguageMenuOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            <div
              className={`absolute right-0 top-[calc(100%+0.65rem)] min-w-[10rem] overflow-hidden rounded-2xl border border-border-light/80 bg-surface-white/95 p-1 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 dark:border-border-dark/80 dark:bg-surface-dark/95 ${
                isLanguageMenuOpen
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0'
              }`}
              role="menu"
              aria-label={copy.header.languageLabel}
            >
              {LANGUAGE_OPTIONS.map((option) => {
                const isActive = option.code === language

                return (
                  <button
                    key={option.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    onClick={() => {
                      setLanguage(option.code)
                      setIsLanguageMenuOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-text-silver-light hover:bg-black/5 hover:text-text-charcoal dark:text-text-silver-dark dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isActive ? (
                      <span className="material-symbols-outlined text-base">check</span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <a
            className="hidden px-2 text-xs font-bold text-text-charcoal transition-colors hover:text-primary-dark dark:text-white dark:hover:text-primary sm:block"
            href="#workflow"
          >
            {copy.header.workflowCta}
          </a>
          <a
            className="flex h-9 items-center justify-center rounded-full bg-primary px-4 text-xs font-bold text-white shadow-[0_4px_14px_rgba(212,175,55,0.4)] transition-colors hover:bg-primary-dark hover:shadow-[0_6px_20px_rgba(212,175,55,0.6)] dark:text-bg-dark dark:hover:bg-yellow-400 dark:hover:shadow-[0_0_20px_rgba(242,208,13,0.3)]"
            href="#dashboard"
          >
            {copy.header.dashboardCta}
          </a>
        </div>
      </div>
    </header>
  )
}
