import Hero from './components/Hero'
import About from './components/About'
import FeaturedWork from './components/FeaturedWork'
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
    </PageShell>
  )
}

export default App
