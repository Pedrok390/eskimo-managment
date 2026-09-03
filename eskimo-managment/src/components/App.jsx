import { useEffect, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Menu from './Menu/Menu'
import Dashboard from './Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom'
import Orders from './Orders/Orders'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Login from './Login/Login'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [popup, setPopup] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsAuthChecking(false);
      return;
    }

    api.getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthChecking(false);
      });
  }, []);

  useEffect(() => {
    api
      .getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function handleLogin(email, password) {
    return api
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return api.getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  function handleLogout(){
    api.logout()
    setCurrentUser(null);
    setIsLoggedIn(false);
  }
  function handleCreateProduct(productData) {
    return api
      .createProduct(productData)
      .then((newProduct) => {
        setProducts((currentProducts) => [
          ...currentProducts,
          newProduct
        ]);

        handleClosePopup();
      });
  }
  function handleUpdateProduct(productId, productData) {
  return api
    .updateProduct(productId, productData)
    .then((updatedProduct) => {
      console.log("RETORNO UPDATE:", updatedProduct);

      setProducts((currentProducts) => {
        console.log("ANTES:", currentProducts);

        const newProducts = currentProducts.map((product) =>
          product._id === updatedProduct._id
            ? updatedProduct
            : product
        );

        console.log("DEPOIS:", newProducts);

        return newProducts;
      });

      handleClosePopup();
    });
}
  function handleDeleteProduct(product){
    return api.deleteProduct(product._id)
      .then(() =>{
        setProducts((state) => state.filter((currentProduct) => currentProduct._id !== product._id))
      })
  }
  const handleOpenPopup = (popupItem) => {
    setPopup(popupItem)
  }
  const handleClosePopup = () => {
    setPopup(null)
  }
  return (
    <>
        <CurrentUserContext.Provider value={{currentUser}}>
        <Routes>
          <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isAuthChecking={isAuthChecking}>
              <div className='page'>
                <Sidebar handleLogout={handleLogout}/>
                <div className='page__menu'>
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>  
          }/>
          <Route path="/menu" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isAuthChecking={isAuthChecking}>
              <div className='page'>
                <Sidebar handleLogout={handleLogout}/>
                <div className='page__menu'>
                  <Menu 
                    products={products} 
                    popup={popup} 
                    onOpenPopup={handleOpenPopup} 
                    onClosePopup={handleClosePopup} 
                    handleCreateProduct={handleCreateProduct} 
                    handleUpdateProduct={handleUpdateProduct}
                    handleDeleteProduct={handleDeleteProduct}/>
                </div>
              </div>
            </ProtectedRoute>
          }/>
          <Route path="/orders" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isAuthChecking={isAuthChecking}>
              <div className='page'>
                <Sidebar handleLogout={handleLogout}/>
                <div className='page__menu'>
                  <Orders />
                </div>
              </div>
            </ProtectedRoute>
          }/>
        </Routes>
        </CurrentUserContext.Provider>
    </>
  )
}

export default App
