import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { deactivate } from "../../redux/PopupSlice";
import { delProducts, delAllSelected } from "../../redux/ProductsSlice";
import "./popup.css";

const Popup = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(({products}) => products.products);
  const selectedIdx = useAppSelector(({products}) => products.selected);
  const selectedProducts = products?.filter((p) => selectedIdx?.includes(p.id));
  const selectedNames = selectedProducts?.map((p) => p.name);
  const stringSelectedNames = selectedNames?.map((n, idx) => idx === 0 ? n : `, ${n}`)
  const isActive = useAppSelector(({popup}) => popup.active);

  const close = () => {
    dispatch(deactivate());
  }

  const canselPost = async () => {
    close();
    
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(selectedNames)
    })
      .then((response) => response.json())
      .then(() => {
        //для наглядности 
        dispatch(delProducts(selectedNames));   
        dispatch(delAllSelected()); 
        console.log("Товары аннулированы", selectedNames);
      })
  }
 
  if (selectedIdx?.length) {
  
    return (
      <div className={isActive ? "modal active" : "modal"}>
        <div className="modal-content">
          <p className="popup-question">Вы уверены, что хотите аннулировать товар(ы):</p>
          <p className="selected-name">
            {stringSelectedNames}
          </p>
          <div className="btn-container">
            <button className="btn btn-popap btn-cancel" onClick={close} type="button">Отклонить</button>
            <button className="btn btn-popap" onClick={canselPost} type="button">Применить</button>
          </div>
        </div>
      </div>
    )
  } else {

    return (
      <div className={isActive ? "modal active" : "modal"}>
        <div className="modal-content">
          <p className="popup-text">Товар(ы) не выбраны!</p>
          <div className="btn-container">
            <button className="btn btn-popap" onClick={close} type="button">Вернуться</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;

