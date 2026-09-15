import Hero from './components/Hero'
import About from './components/About'
import FeaturedWork from './components/FeaturedWork'
import Services from './components/Services'
import PageShell from './components/layout/PageShell'
import Divider from './components/layout/Divider'

function App() {
  return (
    <PageShell>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <FeaturedWork />
      <Divider />
      <Services />
      <Divider />
    </PageShell>
  )
}

export default App
