export default function Menu(){
    return (
        <>
            <div className="menu">
                <h2 className="title">Cardápio</h2>
                <div className="menu__counter-container">
                    <h3 className="menu__counter-title">Total de Produtos</h3>
                    <p className="menu__counter">0</p>
                </div>
                <div className="menu__container">
                    <div className="menu__container-intro">
                        <h3 className="menu__container-title">Produtos</h3>
                        <button className="menu__container-button">Adicionar Produto</button>
                    </div>
                    <table className="menu__table">
                        <tr className="menu__table-header">
                            <th className="menu__table-category menu__table-category--image">Imagem</th>
                            <th className="menu__table-category menu__table-category--name">Nome</th>
                            <th className="menu__table-category menu__table-category--price">Preço</th>
                            <th className="menu__table-category menu__table-category--edit">Editar</th>
                            <th className="menu__table-category menu__table-category--remove">Remover</th>
                        </tr>
                        
                    </table>
                </div>
                
            </div>
        </>
    )
}