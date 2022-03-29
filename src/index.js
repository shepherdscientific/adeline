import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'

// json data
var jsonData = '{"artworks":[{"id":0,"name":"Idowu Sonanya","nationality":"(Nigerian, Born 1970)","title":"ELEKO BEACH","year":"2021","medium":"Acrylic on Canvas","size":"48x24","filename":"eleko","artist_id_fk":0},{"id":1,"name":"Idowu Sonanya","nationality":"(Nigerian, Born 1970)","title":"LEGEND ( PROF G. GRILLO )","year":"2018","medium":"Metal","size":"36x24","filename":"legend","artist_id_fk":0},{"id":2,"name":"Desmond Dubre","nationality":"(Nigerian, Born 1970)","title":"GIDIGBO","year":"2019","medium":"Oil on Canvas","size":"48x36","filename":"gidigbo","artist_id_fk":1},{"id":3,"name":"Desmond Dubre","nationality":"(Nigerian, Born 1970)","title":"PANDEMIC PANDEMONIUM","year":"2019","medium":"Mixed Media","size":"48x36","filename":"pandemic","artist_id_fk":1},{"id":4,"name":"Norbert Okpu","nationality":"(Nigerian, Born 1970)","title":"Dwellers","year":"2019","medium":"Acrylic on Board","size":"36x34","filename":"dwellers","artist_id_fk":2},{"id":5,"name":"Norbert Okpu","nationality":"(Nigerian, Born 1970)","title":"SELF PORTRAIT","year":"2019","medium":"Mixed Media","size":"36x36","filename":"selfnorbert","artist_id_fk":2},{"id":6,"name":"Sylvester Abiogun","nationality":"(Nigerian, Born 1972)","title":"LEGEND ( PROF G. GRILLO )","year":"2020","medium":"Oil on Canvas","size":"36x36","filename":"asoebi","artist_id_fk":3},{"id":7,"name":"Sylvester Abiogun","nationality":"(Nigerian, Born 1972)","title":"WHEN THE MARKETS REOPENED","year":"2020","medium":"Oil on Canvas","size":"20x24","filename":"markets","artist_id_fk":3},{"id":8,"name":"Lekii Adebisin","nationality":"(Nigerian, Born 1964)","title":"MESSAGE FROM HEAVEN","year":"2020","medium":"Acrylic on Canvas","size":"30x21","filename":"msgheaven","artist_id_fk":4}]}';

// parse json
var jsonParsed = JSON.parse(jsonData);

// access elements
console.log(jsonParsed.artworks);

const pexel = (id) => `http://localhost:3000/assets/images/${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
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
  //{ position: [-2.4, 0, 4], rotation: [0, Math.PI / 2.5, 0], url: pexel('violinbabe1') },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel('harvest') },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel('lagos') },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel('nature') },
  //{ position: [2.4, 0, 4], rotation: [0, -Math.PI / 2.5, 0], url: pexel('violinbabe2') }
]

createRoot(document.getElementById('root')).render(
  <Suspense fallback={null}>
    <App images={jsonParsed.artworks} />
  </Suspense>
)
