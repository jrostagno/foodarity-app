// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import styles from './Home.module.css';
// import ProfileCard from '../ProfileCard/ProfileCard';
import ProductCard from '../ProductCard/ProductCard';
import Navbar from '../Navbar/Navbar';
// import ShopCard from '../ShopCard/ShopCard';
// import productos from '../Cards/product.json';
import Pagination from '../Pagination/BasicPagination';
// import SearchBar from '../Searchbar/Searchbar';

export default function Home() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const allProducts = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    console.log('HOLAAAAAA');
    dispatch(getProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  // PAGINADO LOGICA
  // eslint-disable-next-line no-unused-vars
  const productPerPage = 5;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // console.log(product);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.home}>
          <Pagination
            paginado={paginado}
            products={allProducts.length}
            productsPerPage={productPerPage}
          />
        <div className={styles.homecont}>
          {/* <div className={styles.contweb}>
            <ProfileCard />
          </div> */}
          <div className={styles.home}>
            <div className={styles.homecont}>
              {/* <div className={styles.contweb}>
                <ProfileCard />
                <div className={styles.ShopCardsContainer}>
                  <h3 className={styles.title}>Mi carrito de compras</h3>
                  <ShopCard />
                </div>
              </div> */}

              <div className={styles.contmobile}>
                {/* <SearchBar /> */}

                <div className={styles.ProductCardDiv}>
                  {/* <ProductCard/> */}
                </div>
                {currentProduct.map((product, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}