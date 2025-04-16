import React, { useState } from "react";                                                                                                                       
import "./App.css";                                                                                                                                            
                                                                                                                                                               
                                                                                                                                                               
                                                                                                                                                               
const products = [                                                                                                                                             
    { id: 1, name: "Ipad", category: "Electronics", description: "High-performance Ipad", price: 1200, image: "./electronic1.jpg" },                           
    { id: 2, name: "Iphone", category: "Electronics", description: "Latest model smartphone", price: 800, image: "./electronics2.jpg" },                       
    { id: 3, name: "Iwatch", category: "Electronics", description: "Noise-cancelling headphones", price: 150, image: "./electronics3.jpg" },                   
    { id: 4, name: "Blender", category: "Kitchen", description: "Powerful kitchen blender", price: 100, image: "./kitchen1.jpg" },                             
    { id: 5, name: "Microwave", category: "Kitchen", description: "High-efficiency microwave", price: 250, image: "./kitchen2.jpg" },                          
    { id: 6, name: "Toaster", category: "Kitchen", description: "2-slice toaster", price: 50, image: "./kitchen3.jpg" },                                       
    { id: 7, name: "Sofa", category: "Furniture", description: "Comfortable living room sofa", price: 500, image: "./images/chair.jpeg" },                        
    { id: 8, name: "Dining Table", category: "Furniture", description: "Wooden dining table", price: 700, image: "./images/furniture2.jpg" },                         
    { id: 9, name: "Bed", category: "Furniture", description: "King size bed", price: 1000, image: "./furniture3.jpg" }                                        
];                                                                                                                                                             
                                                                                                                                                               
export default function EcommerceApp() {                                                                                                                       
    const [cart, setCart] = useState([]);                                                                                                                      
    const [selectedCategory, setSelectedCategory] = useState("All");                                                                                           
                                                                                                                                                               
    const addToCart = (product) => {                                                                                                                           
        setCart([...cart, product]);                                                                                                                           
    };                                                                                                                                                         
                                                                                                                                                               
    const removeFromCart = (index) => {                                                                                                                        
        setCart(cart.filter((_, i) => i !== index));                                                                                                           
    };                                                                                                                                                         
                                                                                                                                                               
    const resetCart = () => {                                                                                                                                  
        setCart([]);                                                                                                                                           
    };                                                                                                                                                         
                                                                                                                                                               
    const buyNow = () => {                                                                                                                                     
        alert("Purchase successful! Thank you for shopping.");                                                                                                 
        setCart([]);                                                                                                                                           
    };                                                                                                                                                         
                                                                                                                                                               
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);                                                                                       
                                                                                                                                                               
    const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);                        
                                                                                                                                                               
    return (                                                                                                                                                   
        <div className="p-6">                                                                                                                                  
            <h1 className="text-2xl font-bold text-center mb-4">E-Commerce Store</h1>                                                                          


            <div className="mb-4 text-center">                                                                                                                 
                <label className="mr-2">Filter by Category:</label>                                                                                            
                <select onChange={(e) => setSelectedCategory(e.target.value)} className="border p-2">                                                          
                    <option value="All">All</option>                                                                                                           
                    <option value="Electronics">Electronics</option>                                                                                           
                    <option value="Kitchen">Kitchen</option>                                                                                                   
                    <option value="Furniture">Furniture</option>                                                                                               
                </select>                                                                                                                                      
            </div>                                                                                                                                             


            <div className="grid grid-cols-3 gap-4">                                                                                                           
                {filteredProducts.map(product => (                                                                                                             
                    <div key={product.id} className="border p-4 rounded-lg shadow-md text-center">                                                             
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />                                               
                        <h2 className="text-lg font-semibold">{product.name}</h2>                                                                              
                        <p className="text-sm text-gray-600">{product.description}</p>                                                                         
                        <p className="text-md font-bold">₹{product.price}</p>                                                                                  
                        <button onClick={() => addToCart(product)} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Add to Cart</button>             
                    </div>                                                                                                                                     
                ))}                                                                                                                                            
            </div>                                                                                                                                             


            <div className="mt-6 border-t pt-4">                                                                                                               
                <h2 className="text-xl font-bold">Shopping Cart</h2>                                                                                           
                {cart.length === 0 ? <p>Cart is empty</p> : (                                                                                                  
                    <>                                                                                                                                         
                        <ul>                                                                                                                                   
                            {cart.map((item, index) => (                                                                                                       
                                <li key={index} className="flex justify-between items-center border-b py-2">                                                   
                                    <img src={item.image} alt={item.name} className="h-12 w-12 object-cover" />                                                
                                    {item.name} - ₹{item.price}                                                                                                
                                    <button className="text-red-500" onClick={() => removeFromCart(index)}>Remove</button>                                     
                                </li>                                                                                                                          
                            ))}                                                                                                                                
                        </ul>                                                                                                                                  
                        <h3 className="text-lg font-bold mt-2">Total: ₹{totalAmount}</h3>                                                                      
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={buyNow}>Buy Now</button>                                    
                        <button className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2" onClick={resetCart}>Reset Cart</button>                         
                    </>                                                                                                                                        
                )}                                                                                                                                             
            </div>                                                                                                                                             
        </div>                                                                                                                                                 
    );                                                                                                                                                         
}                                                                                                                                                              