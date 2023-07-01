"use client";
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { db } from './config/firebase';
// getDocs to get multiple docs together, doc to get 1(single) entry
import { addDoc, getDocs, collection } from "firebase/firestore";

export default function Home() {
    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, "products"); //the second parameter should match collection name in our db
    const getProducts = async () => {
        //READ THE  DATA
        //STORE IN PRODUCTS ARRAY
        try {
            const data = await getDocs(productsCollectionRef);
            const filteredData = data.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
                ))
            setProducts(filteredData);
            console.log(filteredData);
        } catch (err) {
            console.error(err);
        }
    }
    // const addProduct = async () => {
    //     try {
    //         const docRef = await addDoc(collection(db, "products"), {
    //             title: "Massage Gun with Heat",
    //             description:
    //                 "A massage gun with heat is a handheld device that uses percussion therapy and heat to massage muscles. It is a more powerful option than a foam roller, and it can be used to target specific areas of pain or soreness. Massage guns with heat are more expensive than foam rollers, but they can be a great investment for people who suffer from chronic pain or who need deep tissue massage.",
    //             category: "recovery",
    //             price: 6999,
    //             salePrice: 5999,
    //             imageUrls: [],
    //         });

    //         console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    useEffect(() => {
        getProducts();
    }, [])    
  return (
      <main>
          <section className={styles.banner}>
              <h3 className={styles.heading}>
                  The perfect blend of form and function.
              </h3>
              <p className={styles.description}>
                  For those who demand the best in both form and function
              </p>
              <button className={styles.shopNow}>Shop now</button>
          </section>
          <section className={styles.productShowcase}>
              <h3 className={styles.heading}>
                  Crafted with care. Built for results.
              </h3>
              <p className={styles.description}>
                  Equipment that's built to last, and designed to help you
                  reach your goals
              </p>
                {
                    products?.length > 0 ?
                    <section className={styles.products}>
                       { function renderEightProducts() {
                           let renderedProducts = [];
                           for(let i = 0; i<8; i++){
                               const product = products[i];
                               renderedProducts.push(
                                   <div
                                       className={`${styles.card} ${styles.product}`}
                                       key={product.id}
                                   >
                                       {product.imageUrls?.length > 0 ? (
                                           <img
                                               className={
                                                   styles.productPreviewImg
                                               }
                                               src={product.imageUrls[0]}
                                               alt="Product Preview Image"
                                           />
                                       ) : (
                                           <></>
                                       )}
                                       <h4 className={styles.productName}>
                                           {product.title}
                                       </h4>
                                       <div className={styles.pricing}>
                                           <p className={`${styles.price} ${styles.strikeThrough}`}>
                                               ₹ {product.price} INR
                                           </p>
                                           <p className={styles.salePrice}>
                                               ₹ {product.salePrice} INR
                                           </p>
                                       </div>
                                   </div>
                               );
                            }
                            return renderedProducts;
                        } ()
                        }
                    </section>
                    : <p>No products right now.</p>
                }
          </section>
      </main>
  );
}
