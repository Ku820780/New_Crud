import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AddProduct from './components/product/AddProduct';

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },,{
    path:"/signup",
    element:<Signup />
  },{
    path:"/login",
    element:<Login />
  },{
    path:"/addproduct",
    element:<AddProduct />
  }
])
function App() {

  return (
    <>
     <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;
