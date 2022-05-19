import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from './component/Login';
import { Home } from './component/Home';
import { Entertainment } from './component/Entertainment';
import { Sports } from './component/Sports';
import { Reaction } from './component/Reaction';
import { ArtistsPage } from './component/ArtistsPage';
import { Cartoon } from './component/Cartoon';
import { Artists } from './component/Artists';
import { Detail } from './component/Detail';
import { SignUp } from './component/Signup';
import { Header } from './component/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reaction" element={<Reaction />} />
        <Route exact path='/entertainment' element={<Entertainment />} />
        <Route exact path='/sports' element={<Sports />} />
        <Route exact path='/artists' element={<Artists />} />
        <Route exact path='/artistspg' element={<ArtistsPage />} />
        <Route exact path='/cartoon' element={<Cartoon />} />
        <Route path='/details' element={<Detail />} />
      </Routes>
    </Router>

  );
}

export default App;
