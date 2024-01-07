import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Survey from './components/login/Survey';
import './App.css';
import Game from './components/game/Game';
import Map from './components/game/Map';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AnimatePresence initial={false}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 0 }}
                key="survey"
              >
                <Survey />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="/map"
          element={
            <AnimatePresence initial={false}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 0 }}
                key="map"
              >
                <Map />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="/game"
          element={
            <AnimatePresence initial={false}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="game"
              >
                <Game />
              </motion.div>
            </AnimatePresence>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
