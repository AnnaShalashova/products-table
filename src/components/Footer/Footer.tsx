import "./Footer.css";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Popup from "../Popup"
import { activate } from "../../redux/PopupSlice";

const Footer = () => {
    const products = useAppSelector(({products}) => products.products);   
    const dispatch = useAppDispatch();

    const activatePopup = () => {
        dispatch(activate())
    }
   
    const totalVolume = products?.reduce((total, product) => total + product.volume, 0);
    const totalSum = products?.reduce((total, product) => total + product.sum, 0);

    return (
        <div className="footer">
            <p>Общий объем: {totalVolume}</p>
            <p>Общее количество:  {totalSum}</p>
            <button className="btn delete-button" type="button" onClick={activatePopup}>Аннулировать</button>
            <Popup />
        </div>
    )
    
}

export { Footer };