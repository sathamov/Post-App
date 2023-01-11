import axios from "axios";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/Header/Header";
import { ViewPost } from "./components/ViewPost/ViewPost";
import { useInfoContext } from "./Context";
import { Home } from "./pages/Home";
import { MyPosts } from "./pages/MyPosts";
import { New } from "./pages/New";
import { Registor } from "./pages/Registor";

function App() {

  const { user, setUser, token, baseURL , show } = useInfoContext()

  useEffect(() => {

    const getUser = async () => {
      const res = await axios.get(baseURL, { headers: { access_token: token } })
      setUser(res.data.user)
    }

    getUser()
  }, [token, baseURL, setUser])

  return (
    <Router>
      <div className="App">

        { show &&  <Header /> }
        
        <Routes>
          {<Route path="/" element={user ? <Home /> : <Registor />} />}
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/new" element={<New />} />
          <Route path="/register" element={<Registor />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
