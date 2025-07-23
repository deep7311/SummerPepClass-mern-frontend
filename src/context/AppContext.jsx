import { createContext, useState, useMemo } from 'react';

// Creating context for global state sharing
export const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  // Cart items ka state
  const [cart, setCart] = useState([]);

  // Logged-in user ka state
  const [user, setUser] = useState(null);

  // Total cart items count
  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Cart ka total price calculate karna
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [cart]);

  // Cart clear karne ke liye
  const clearCart = () => {
    setCart([]);
  };

  // Product cart me add karne ke liye
  const addToCart = (product) => {
    const alreadyInCart = cart.find((item) => item._id === product._id);
    // Agar pehle se product nahi hai to add karna
    if (!alreadyInCart) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Product quantity +1 karne ke liye
  const incrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Product quantity -1 karne ke liye
  const decrementQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) => {
          // Agar quantity 1 hai aur aur bhi kam hui to null return karo
          if (item._id === productId) {
            if (item.quantity === 1) return null; // 1 se kam hua to remove ho jaye
            return { ...item, quantity: item.quantity - 1 }; // warna -1
          }
          return item;
        })
        // null (matlab 0 quantity) ko filter out karo
        .filter((item) => item !== null)
    );
  };

  // Cart se product completely hataane ke liye
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  // Yeh sab values AppContext ke through sab components ko milengi
  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        user,
        setUser,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
