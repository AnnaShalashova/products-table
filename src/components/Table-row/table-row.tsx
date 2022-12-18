import "./table-row.css";
import { IProduct } from "../../redux/ProductsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addOneSelected, delOneSelected } from "../../redux/ProductsSlice";

type  TableRowProps = {
    product: IProduct
}

const TableRow = ({ product }: TableRowProps) => {

    const [isChecked, setIsChecked] = useState(false);
    const {name, id, status, sum, qty, volume, delivery_date, currency, total} = product; 
    const dispatch = useAppDispatch();
    const selectedIds = useAppSelector((state) => state.products.selected);

    useEffect(() => {
        if (selectedIds?.includes(id)) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [selectedIds, id] )

    const handleOnChange = (e: React.FormEvent) => {
        if (!isChecked) {
            dispatch(addOneSelected((e.target as HTMLInputElement).id))
        } else {
            dispatch(delOneSelected((e.target as HTMLInputElement).id))
        }
      setIsChecked(!isChecked);
    };

    return (
        <tr className="table-row">
            <td>
                <div className="name-cell">
                    <input
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={handleOnChange}
                    />
                    <label htmlFor={id}>{name}</label>
                </div>
            </td>
            <td>{sum}</td>
            <td>{qty}</td>
            <td>{volume}</td>
            <td>{status}</td>
            <td>{delivery_date}</td>
            <td>{currency}</td>
            <td>{total} {currency}</td>
        </tr>
    )
}

export default TableRow;
