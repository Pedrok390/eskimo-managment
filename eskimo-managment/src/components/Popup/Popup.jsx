export default function Popup(props){
    const { title, children, onClosePopup } = props
    return (
        <>
            <div className="popup">
                <div className="popup__container">
                    <button className="popup__close" onClick={onClosePopup}>X</button>
                    {title && <h2 className="popup__title">{title}</h2>}
                    {children}
                </div>
            </div>
        </>
    )
}