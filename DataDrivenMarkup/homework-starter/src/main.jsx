import ReactDOM from 'react-dom/client';
import { products } from './products';
import { ProductList } from './ProductList';
import './main.css';

const reactRoot = ReactDOM.createRoot(document.getElementById('root'));
reactRoot.render(<ProductList products={products} />);