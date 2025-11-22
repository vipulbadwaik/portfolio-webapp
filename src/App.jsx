import { useState } from 'react'
import BentoGrid from './Components/BentoGrid'
import GridItem from './Components/GridItem'
import DetailModal from './Components/DetailModal'
import Background from './Components/Background'
import Scene3D from './Components/Scene3D'
import { portfolioItems } from './data/portfolioData'
import { motion } from 'framer-motion'

function App() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white relative selection:bg-blue-500/30">
      <Background />
      <Scene3D />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
            Vipul Badwaik
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Full Stack Developer & UI/UX Enthusiast
          </p>
        </motion.div>

        <BentoGrid>
          {portfolioItems.map((item, i) => (
            <GridItem
              key={item.id}
              id={item.id}
              title={item.title}
              className={item.className}
              onClick={() => setSelectedId(item.id)}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="mb-4">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  {item.content}
                </div>
              </div>
            </GridItem>
          ))}
        </BentoGrid>

        <DetailModal selectedId={selectedId} setSelectedId={setSelectedId}>
          {portfolioItems.find(item => item.id === selectedId)?.detailedContent}
        </DetailModal>
      </div>
    </div>
  )
}

export default App
