import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    isCartOpen,
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      ></div>

      {/* Cart Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-secondary text-white">
          <h2 className="font-heading text-xl font-bold">
            <i className="fas fa-shopping-cart mr-2"></i>
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <i className="fas fa-shopping-basket text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm">
                Add some delicious items from our menu!
              </p>
              <button
                onClick={closeCart}
                className="mt-4 px-6 py-2 bg-secondary text-white rounded-full font-medium hover:bg-accent transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-3 bg-primary rounded-xl border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <p className="text-accent font-bold text-sm">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-white hover:bg-accent transition-colors"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="self-start p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t bg-primary">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Total:</span>
              <span className="text-2xl font-bold text-accent">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:bg-accent transition-colors"
                onClick={() => {
                  alert("Checkout functionality coming soon!");
                }}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2 text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
              >
                <i className="fas fa-trash mr-1"></i>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
