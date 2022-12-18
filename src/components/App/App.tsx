import './App.css';
import Header from '../Header';
import Table from '../Table';
import Footer from '../Footer';
import { documents1, documents2 } from "../data";
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { IProduct } from "../../redux/ProductsSlice";
import { addProducts } from "../../redux/ProductsSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const products:Array<IProduct> = [];

    // для внешних данных
    // const res1 = await fetch("/documents1");
    // const data1 = await res1.json();
    // const res2 = await fetch("/documents2");
    // const data2 = await res2.json();
    // data1.forEach((product: IProduct) => products.push(product));
    // data2.forEach((product: IProduct) => products.push(product));

    documents1.forEach((product) => products.push(product));
    documents2.forEach((product) => products.push(product));
    dispatch(addProducts(products));
  }

  return (
    <div className="App">
      <Header />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
