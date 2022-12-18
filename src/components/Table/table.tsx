import "./table.css";
import { useAppSelector } from "../../redux/hooks";
import TableRow from "../Table-row";
import { IProduct } from "../../redux/ProductsSlice";


const Table = () => {
    const defProducts = useAppSelector((state) => state.products.products);
    const products = defProducts?.map((p) => ({...p, total: p.sum * p.qty}));
    const searchText = useAppSelector((state) => state.search.searchText.toLowerCase());
    const searchColumns = useAppSelector((state) => state.search.searchColumns);
    const allSearchColumns = useAppSelector((state) => state.search.searchAllColumns);

    const columnFilter = (products: Array<IProduct>, searchColumns: Array<string>) => {
        
        const filteredProducts = products.filter((product: any) => {
            let productValues: Array<string> | string = [];
            for (let key in product) {
                if (searchColumns?.includes(key)) {
                    productValues.push(product[key])
                }
            } 
            productValues = productValues.toString().toLowerCase();
            return productValues.includes(searchText);
        })
        return filteredProducts;
    }

    if (products) {

        let sortedProducts: Array<IProduct> = products.sort((prod1, prod2) => {
            const data1 = prod1.delivery_date.split(".").reverse().join("-");
            const data2 = prod2.delivery_date.split(".").reverse().join("-");
            return Date.parse(data1) - Date.parse(data2);
        });

        if (searchText) {

            sortedProducts = !allSearchColumns ? columnFilter(products, searchColumns!) 
                : sortedProducts.filter((p) => {
                    const productValues = Object.values(p).toString().toLowerCase();
                    return productValues.includes(searchText);
                })
        }
        
        return (
            <table className="table">
                <thead className="table-header table-row">
                    <tr>
                        <th>Название</th>
                        <th>Стоимость</th>
                        <th>Количество</th>
                        <th>Объем</th>
                        <th>Статус</th>
                        <th>Срок доставки</th>
                        <th>Валюта</th>
                        <th>Всего</th>
                    </tr>
                </thead>
                <tbody>
                {sortedProducts.length ? sortedProducts.map((product: IProduct, idx) => <TableRow key={idx} product={product} />)
                    : <p className="not-product-message">Товары не найдены!</p>}
                </tbody>
            </table>
        )    
    } else {
        return <div>Loading...</div>;
    }
}

export default Table;
