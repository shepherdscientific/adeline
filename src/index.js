import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'

const pexel = (id) => `http://localhost:5000/assets/images/${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel('eleko') },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel('gidigbo') },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel('arise') },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel('asoebi') },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel('confluence') },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel('hope') },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel('harvest') },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel('lagos') },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel('nature') },
  { position: [1.75, 0, 4], rotation: [0, -Math.PI / 2.5, 0], url: pexel('legend') }
]

createRoot(document.getElementById('root')).render(
  <Suspense fallback={null}>
    <App images={images} />
  </Suspense>
)
