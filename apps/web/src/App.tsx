import './index.css'
import { LanguageProvider } from './contexts/LanguageProvider'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/layout/Header'
import { HeroSection } from './components/landing/HeroSection'
import { ProblemSection } from './components/landing/ProblemSection'
import { WorkflowSection } from './components/landing/WorkflowSection'
import { BentoFeatures } from './components/landing/BentoFeatures'
import { LiveStream } from './components/landing/LiveStream'
import { SprintScopeSection } from './components/landing/SprintScopeSection'
import { SecuritySection } from './components/landing/SecuritySection'
import { CTASection } from './components/landing/CTASection'
import { Footer } from './components/layout/Footer'

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="bg-bg-light dark:bg-bg-dark text-text-charcoal dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20 dark:selection:bg-primary/30 selection:text-primary-dark dark:selection:text-primary transition-colors duration-300">
          <Header />
          <main className="flex-grow">
            <HeroSection />
            <ProblemSection />
            <WorkflowSection />
            <BentoFeatures />
            <LiveStream />
            <SprintScopeSection />
            <SecuritySection />
            <CTASection />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
