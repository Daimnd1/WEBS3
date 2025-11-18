import { ArrowLeft, Heart, Share2, ShoppingCart, X, CreditCard, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface ProductPageProps {
    productId?: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_STORAGE_KEY = 'shopping_cart';

export default function CartVisualisationDemo({productId} : ProductPageProps) {
  const { auth } = usePage().props as any;
  
  // Load cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  
  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;
  
  function increaseQty(id: string) {
    setItems(items.map(item => 
      item.id === id ? {...item, quantity: item.quantity + 1 } : item));
  }

  function decreaseQty(id: string) {
    setItems(items.map(item => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1 } : item));
  }
  
  function removeItem(id: string) {
    setItems(items.filter(item => item.id !== id));
  }

  function clearCart() {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  function handleCheckoutClick() {
    if (!auth?.user) {
      window.location.href = '/login';
      return;
    }

    if (items.length === 0) {
      setCheckoutError('Your cart is empty');
      return;
    }

    setShowAddressModal(true);
  }

  async function handleSubmitOrder() {
    if (!shippingAddress.trim()) {
      setCheckoutError('Please enter a shipping address');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError('');
    setCheckoutSuccess(false);

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (!csrfToken) {
        throw new Error('CSRF token not found');
      }

      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          shipping_address: shippingAddress,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'Checkout failed');
      }

      setCheckoutSuccess(true);
      setShippingAddress('');
      setShowAddressModal(false);
      clearCart(); // Clear localStorage cart
      console.log('Order created:', data.order_id);
      setTimeout(() => {
        router.visit('/');
      }, 2000);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'An error occurred during checkout');
    } finally {
      setIsCheckingOut(false);
    }
  }

  async function handleCheckout() {
    if (!auth?.user) {
      window.location.href = '/login';
      return;
    }

    if (items.length === 0) {
      setCheckoutError('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError('');
    setCheckoutSuccess(false);

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (!csrfToken) {
        throw new Error('CSRF token not found');
      }

      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          shipping_address: null,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'Checkout failed');
      }

      setCheckoutSuccess(true);
      clearCart(); // Clear localStorage cart
      console.log('Order created:', data.order_id);
      setTimeout(() => {
        router.visit('/');
      }, 2000);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'An error occurred during checkout');
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <AppLayout>
      <main className="min-h-screen bg-white">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 px-3 sm:px-4 pt-20 sm:pt-32 md:pt-40 lg:pt-48 pb-6 sm:pb-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center text-white">
              <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Shopping Cart
              </h1>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg lg:text-xl text-blue-100">
                {itemCount} items are ready for checkout
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-10">
            <section aria-labelledby="cart-items-title" className="lg:col-span-2 space-y-4">
          <h2 id="cart-items-title" className="text-xl font-semibold text-blue-900">
            Cart Items
          </h2>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-white rounded-xl shadow-lg border-t-4 border-blue-500">
              <ShoppingCart size={48} className="mb-4 opacity-30" />
              <p className="text-xl font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add some products to get started</p>
            </div>
          ) : (
            items.map(item => (
              <article key={item.id} className="flex p-6 text-slate-900 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-4 w-full">
                  <figure className="w-20 h-20 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </figure>

                  <header className="flex flex-col gap-3">
                    <h3 className="text-2xl font-semibold leading-tight">{item.name}</h3>
                    <p className="text-sm text-slate-500">SKU: product-{item.id}</p>
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                        In Stock
                      </span>
                      <span className="text-sm text-slate-500">SHIPS WITHIN 24H</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 rounded-full px-4 py-2 w-max">
                      <ShoppingCart size={16} className="opacity-70" />
                      <span className="text-sm font-medium">${item.price.toFixed(2)} each</span>
                    </div>
                  </header>

                  <aside className="relative flex flex-col justify-between items-end ml-auto self-stretch">
                    <button
                      aria-label="Remove item"
                      onClick={() => removeItem(item.id)}
                      className="absolute top-0 right-0 text-slate-400 hover:text-slate-600 p-2"
                    >
                      <X size={18} />
                    </button>
                    <div className="flex items-center gap-6 mt-auto pt-6">
                      <div className="flex items-center rounded-xl border bg-white px-3 py-2 shadow-sm">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-slate-500 hover:text-slate-700 disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="px-4 text-slate-900 tabular-nums">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => increaseQty(item.id)}
                          className="px-2 py-1 text-slate-500 hover:text-slate-700"
                        >
                          ＋
                        </button>
                      </div>
                      <footer className="text-right">
                        <p className="text-2xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-slate-500 tracking-wide">ITEM TOTAL</p>
                      </footer>
                    </div>
                  </aside>
                </div>
              </article>
            ))
          )}
        </section>

       
        <aside aria-labelledby="order-summary-title" className="bg-white rounded-xl shadow-lg p-6 h-max sticky top-6 border-t-4 border-blue-600">
          <h2 id="order-summary-title" className="text-2xl font-semibold text-blue-900">
            Order Summary
          </h2>
          <p className="mt-2 text-slate-500">Review prices, shipping, and secure checkout options.</p>

          <dl className="mt-6 space-y-3 text-slate-700">
            <div className="flex items-center justify-between">
              <dt>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</dt>
              <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2">
                <span>Shipping</span>
                <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5">
                  Free
                </span>
              </dt>
              <dd className="tabular-nums">$0.00</dd>
            </div>
          </dl>

          <hr className="my-6 border-slate-200" />

          <div className="flex items-baseline justify-between">
            <span className="text-xl font-semibold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-slate-900 tabular-nums">${total.toFixed(2)}</span>
          </div>

          {checkoutError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {checkoutError}
            </div>
          )}

          {checkoutSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Order created successfully! Redirecting...
            </div>
          )}

          <button
            type="button"
            disabled={items.length === 0 || isCheckingOut}
            onClick={handleCheckoutClick}
            className="relative overflow-hidden isolate mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 ease-bouncy after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:origin-right after:scale-x-0 after:bg-gradient-to-r after:from-blue-700 after:to-purple-700 after:transition-transform after:duration-500 after:ease-in-out hover:after:origin-left hover:after:scale-x-100 active:scale-90 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Proceed to Checkout"
          >
            <CreditCard size={18} />
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Secure checkout with SSL encryption
          </p>
        </aside>
        </div>
      </div>

      {showAddressModal && (
        <>
            <div className="fixed inset-0 backdrop-blur-sm z-40" onClick={() => {
            setShowAddressModal(false);
            setCheckoutError('');
          }} />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 pointer-events-auto border-t-4 border-blue-600">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Shipping Address</h3>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                  Enter your shipping address
                </label>
                <textarea
                  id="address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your address here..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 resize-none"
                  rows={4}
                />
              </div>

              {checkoutError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {checkoutError}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddressModal(false);
                    setCheckoutError('');
                  }}
                  disabled={isCheckingOut}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isCheckingOut || !shippingAddress.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      </main>
    </AppLayout>
  );
}