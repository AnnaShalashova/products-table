import "./Search-panel.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearchText, setSearchColumn, delSearchColumn, setAllSearchColumn, delAllSearchColumn } from "../../redux/SearchSlice";
import filterIcon from "../../img/Filter.png";
import { useState } from "react";

const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const searchText = useAppSelector(({search}) => search.searchText);
    const searchColumns = useAppSelector(({search}) => search.searchColumns);
    const searchAllColumns = useAppSelector(({search}) => search.searchAllColumns);
    const [isActive, setIsActive] = useState("inactive");

    const changeSearchSettings = (e: React.MouseEvent<HTMLUListElement>) => {
        if ((e.target as HTMLLIElement).tagName !== "LI" ) return;
        const id = (e.target as HTMLElement).id;

        if (id === "all") {
            searchAllColumns ? dispatch(delAllSearchColumn()) : dispatch(setAllSearchColumn());
            
        } else {
             searchAllColumns ?? dispatch(delAllSearchColumn());

            if (!searchColumns?.includes(id)) {
                dispatch(delAllSearchColumn())
                dispatch(setSearchColumn(id));
            } else {
                dispatch(delSearchColumn(id));
            }
        }     
    }

    const closeSearchPopupEvent: { (e: MouseEvent): void } = (e: MouseEvent) => {
        e.stopPropagation();
        const target = e.target as HTMLElement; 
        if (target.closest('.search-popup') === null 
            && target.closest('.search-panel') === null
            && target.closest('.set-btn') === null) {
          setIsActive("inactive");
          document.removeEventListener("mousedown", closeSearchPopupEvent)
        }
    }

    const changeStatus = () => {
        if (isActive === "inactive") {
            setIsActive("active");
            document.addEventListener("mousedown", closeSearchPopupEvent)
        } else {
            setIsActive("inactive");
        }      
    }

    const changeSearchText = (e: React.FormEvent) => {
        dispatch(setSearchText((e.target as HTMLInputElement).value))
    }

    return (
        <div className="search-container">
            <div className="search-panel-container">
                <input className="search-panel" type="text" 
                    value={searchText} placeholder="Поиск товара" 
                    onInput={changeSearchText}>
                </input>
                <button className="set-btn" type="button" onClick={changeStatus}>
                    <img className="filter-icon" src={filterIcon} alt="search-icon" width="19px"/>      
                </button>
            </div>

            <ul className={searchAllColumns ? `search-popup chanched ${isActive}` : `search-popup ${isActive}`} onClick={changeSearchSettings}>
                <li id="all" key="all">Все столбцы</li>
                <li className={searchColumns?.includes("name") ? "chanched" : ''} id="name" key="name">Название</li>
                <li className={searchColumns?.includes("sum") ? "chanched" : ''} id="sum" key="sum">Стоимость</li>
                <li className={searchColumns?.includes("qty") ? "chanched" : ''} id="qty" key="qty">Количество</li>
                <li className={searchColumns?.includes("valuem") ? "chanched" : ''} id="valuem" key="valuem">Объем</li>
                <li className={searchColumns?.includes("status") ? "chanched" : ''} id="status" key="status">Статус</li>
                <li className={searchColumns?.includes("delivary_date") ? "chanched" : ''} id="delivary_date" key="delivary_date">Срок доставки</li>
                <li className={searchColumns?.includes("currency") ? "chanched" : ''} id="currency" key="currency">Валюта</li>
                <li className={searchColumns?.includes("total") ? "chanched" : ''} id="total" key="total">Всего</li>
            </ul>        
        </div>
    )
}

export { SearchPanel };