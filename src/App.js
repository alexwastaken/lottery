import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.js'
import Powerball from './components/Powerball.js'
import TellMeMore from './components/DataPage'
import Cover from './components/cover.js'
import { power, mega} from './componentData.js'
import Counter from "./components/counterComp.js"
import Reduxs from "./components/reduxData.js"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path={"/powerball"} element={<Powerball select={power} />}></Route>
      <Route path={"/mega"} element={<Powerball select={mega}/>}></Route>
      <Route path={"/tellmemorepower"} element={<TellMeMore select={power}/>}></Route>
      <Route path={"/tellmemoremega"} element={<TellMeMore select={mega}/>}></Route>
      <Route path={"/cover"} element={<Cover />}></Route>
      <Route path={"/apislice"} element={<Reduxs />}></Route>
      <Route path={"/counter"} element={<Counter />}></Route>
    </Routes>
  );
}

export default App;
