import { createContext, useState, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Total cart items count
  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Total cart price
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [cart]);

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Add to cart
  const addToCart = (product) => {
    const alreadyInCart = cart.find((item) => item._id === product._id);
    if (!alreadyInCart) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const incrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity >= 1)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

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
