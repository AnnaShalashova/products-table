import "./Header.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addAllSelected, delAllSelected } from "../../redux/ProductsSlice";
import SearchPanel from "../Search-panel";


const Header = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const selectedAll = useAppSelector((state) => state.products.selectedAll);
    const allId = products?.map((product) => product.id);
    
    const handleOnChange = () => {
        if (!selectedAll) {
            dispatch(addAllSelected(allId!))
        } else {
            dispatch(delAllSelected())
        }
    };
    
    return (
        <div className="header">
           <SearchPanel />
           <div className="choose-all">
            <label htmlFor="checkAll">Выбрать все</label>
            <input id ="checkAll" checked={selectedAll}
                onChange={handleOnChange}
                type="checkbox"></input>
           </div>
        </div>
    )
}

export { Header };