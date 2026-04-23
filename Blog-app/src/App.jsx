import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from 'react-router-dom';
import authService from "./appWrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/Index";
function App() {
  const [loading, setLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
    })
    .catch(()=>{
      dispatch(logout());
    })
    .finally(()=>setLoading(false));
  },[])


  return !loading?(
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ): null
}

export default App
