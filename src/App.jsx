import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './page/Home';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    
    
    </>
  )
}

export default App
