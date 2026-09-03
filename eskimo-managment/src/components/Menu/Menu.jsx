import { useState, useEffect } from "react";
import AddProduct from "../Popup/components/AddProduct/AddProduct"
import Popup from "../Popup/Popup"
import eskimoLogo from '../../images/eskimo-logo.png'
export default function Menu(props){
    const { popup, onOpenPopup, onClosePopup, products, handleCreateProduct, handleUpdateProduct} = props
    const [productSearch, setProductSearch] = useState(products)
    const categories = products.map((product) => product.category);
    useEffect(() => {
        setProductSearch(products);
    }, [products]);
    const addProduct = {title: "Adicionar Produto", children: <AddProduct handleCreateProduct={handleCreateProduct} categories={categories} type='add' />}

    const handleEditProduct = (product) => {
        const editProduct = {title: "Editar Produto", children: <AddProduct handleCreateProduct={handleUpdateProduct} categories={categories} product={product} type='edit' />}
        onOpenPopup(editProduct)
    }

    const handleSearch = (productSearched) => {
        if(productSearch !== ''){
            setProductSearch(products.filter((product) => 
                product.name.toLowerCase().includes(productSearched.toLowerCase())
            ))
        }
        else{
            setProductSearch(products)
        }
        console.log(productSearch)
    }
    return (
        <>
            <div className="menu">
                <h2 className="title">Cardápio</h2>
                <div className="menu__counter-container">
                    <h3 className="menu__counter-title">Total de Produtos</h3>
                    <p className="menu__counter">{products.length}</p>
                </div>
                <div className="menu__container">
                    <div className="menu__container-intro">
                        <h3 className="menu__container-title">Produtos</h3>
                        <div>
                            <input type="text" className="menu__container-search" onChange={(e) => handleSearch(e.target.value)}></input>
                        </div>
                        <button className="menu__container-button" onClick={() => onOpenPopup(addProduct)}>Adicionar Produto</button>
                    </div>
                    <div className="menu__table-container">
                        <table className="menu__table">
                            <thead>
                                <tr className="menu__table-header">
                                    <th className="menu__table-category"></th>
                                    <th className="menu__table-category menu__table-category--image">Imagem</th>
                                    <th className="menu__table-category menu__table-category--name">Nome</th>
                                    <th className="menu__table-category menu__table-category--category">Categoria</th>
                                    <th className="menu__table-category menu__table-category--price">Preço</th>
                                    <th className="menu__table-category menu__table-category--edit">Editar</th>
                                    <th className="menu__table-category menu__table-category--remove">Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productSearch.map((product) => (
                                    <tr key={product._id} className="menu__table-product">
                                        <td className="menu__table-div"></td>
                                        <td className="menu__table-div menu__table-category--image">
                                            <div className="menu__table-image-container">
                                                <img src={product.image?.url || eskimoLogo } className="menu__table-image" alt={product.name}/>
                                            </div>
                                        </td>
                                        <td className="menu__table-div menu__table-div--name">{product.name}</td>
                                        <td className="menu__table-div menu__table-div--category">{product.category}</td>
                                        <td className="menu__table-div menu__table-div--price">{product.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                                        <td className="menu__table-div menu__table-div--edit"><button onClick={() => handleEditProduct(product)}>Editar</button></td>
                                        <td className="menu__table-div menu__table-div--remove"><button>Remover</button></td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                {popup && 
                    <Popup onClosePopup={onClosePopup} title={popup.title} children={popup.children} />
                }
            </div>
        </>
    )
}