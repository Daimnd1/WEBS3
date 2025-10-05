import React, { useEffect } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, X, CreditCard, Gift, ShieldCheck } from 'lucide-react';

export default function CartHeader({
  itemCount,
  onBack,
  onLike,
  onShare,
}: {
  itemCount: number;
  onBack: () => void;
  onLike: () => void;
  onShare: () => void;
}): React.ReactElement {
  useEffect(() => {
    document.body.style.backgroundColor = '#f1f5f9';
    document.documentElement.style.backgroundColor = '#f1f5f9';
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="flex items-center p-6 text-slate-900 bg-white rounded-2xl shadow-lg mx-4 mt-4 mb-10">
        <nav aria-label="Back" className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Go back"
            onClick={onBack}
            className="flex items-center gap-2 p-2 hover:text-slate-600 text-slate-400"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>
        </nav>

        <div className="ml-5">
          <h1 className="text-3xl font-medium">Shopping Cart</h1>
          <p className="text-sm text-slate-400">{itemCount} items are ready for checkout</p>
        </div>

        <nav className="flex items-center gap-2 ml-auto" aria-label="Cart actions">
          <button
            type="button"
            aria-label="Save for later"
            onClick={onLike}
            className="flex items-center gap-2 p-2 hover:text-slate-600 text-slate-400"
          >
            <Heart size={20} />
            <span>Save For Later</span>
          </button>
          <button
            type="button"
            aria-label="Share cart"
            onClick={onShare}
            className="flex items-center gap-2 p-2 hover:text-slate-600 text-slate-400"
          >
            <Share2 size={20} />
            <span>Share Cart</span>
          </button>
        </nav>
      </header>

      <div className="mx-4 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <section
          aria-labelledby="cart-items-title"
          className="lg:col-span-2 space-y-4"
        >
          <h2 id="cart-items-title" className="text-xl font-semibold text-slate-900">
            Cart Items
          </h2>

          <article className="flex p-6 text-slate-900 bg-white rounded-2xl shadow-lg">
            <div className="flex items-start gap-4 w-full">
              <figure className="w-20 h-20 rounded-md bg-indigo-600 text-white flex items-center justify-center overflow-hidden">
                <img
                  src="https://placehold.co/80x80/94A3B8/ffffff?text=KBD"
                  alt="Wireless Mechanical Keyboard"
                  className="w-full h-full object-cover"
                />
                <figcaption className="sr-only">Product image</figcaption>
              </figure>

              <header className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold leading-tight">Wireless Mechanical Keyboard</h3>
                <p className="text-sm text-slate-500">SKU: keyboard</p>
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    In Stock
                  </span>
                  <span className="text-sm text-slate-500">SHIPS WITHIN 24H</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 rounded-full px-4 py-2 w-max">
                  <ShoppingCart size={16} className="opacity-70" />
                  <span className="text-sm font-medium">$120.00 each</span>
                </div>
              </header>

              <aside
                aria-label="Item actions"
                className="relative flex flex-col justify-between items-end ml-auto self-stretch"
              >
                <button aria-label="Remove item" className="absolute top-0 right-0 text-slate-400 hover:text-slate-600 p-2">
                  <X size={18} />
                </button>
                <div className="flex items-center gap-6 mt-auto pt-6">
                  <div className="flex items-center rounded-xl border bg-white px-3 py-2 shadow-sm">
                    <button aria-label="Decrease quantity" className="px-2 py-1 text-slate-500 hover:text-slate-700">
                      −
                    </button>
                    <span className="px-4 text-slate-900">1</span>
                    <button aria-label="Increase quantity" className="px-2 py-1 text-slate-500 hover:text-slate-700">
                      ＋
                    </button>
                  </div>
                  <footer className="text-right">
                    <p className="text-2xl font-bold">$120.00</p>
                    <p className="text-xs text-slate-500 tracking-wide">ITEM TOTAL</p>
                  </footer>
                </div>
              </aside>
            </div>
          </article>

          <article className="flex p-6 text-slate-900 bg-white rounded-2xl shadow-lg">
            <div className="flex items-start gap-4 w-full">
              <figure className="w-20 h-20 rounded-md bg-indigo-600 text-white flex items-center justify-center overflow-hidden">
                <img
                  src="https://placehold.co/80x80/94A3B8/ffffff?text=KBD"
                  alt="Wireless Mechanical Keyboard"
                  className="w-full h-full object-cover"
                />
                <figcaption className="sr-only">Product image</figcaption>
              </figure>

              <header className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold leading-tight">Wireless Mechanical Keyboard</h3>
                <p className="text-sm text-slate-500">SKU: keyboard</p>
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    In Stock
                  </span>
                  <span className="text-sm text-slate-500">SHIPS WITHIN 24H</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 rounded-full px-4 py-2 w-max">
                  <ShoppingCart size={16} className="opacity-70" />
                  <span className="text-sm font-medium">$120.00 each</span>
                </div>
              </header>

              <aside
                aria-label="Item actions"
                className="relative flex flex-col justify-between items-end ml-auto self-stretch"
              >
                <button aria-label="Remove item" className="absolute top-0 right-0 text-slate-400 hover:text-slate-600 p-2">
                  <X size={18} />
                </button>
                <div className="flex items-center gap-6 mt-auto pt-6">
                  <div className="flex items-center rounded-xl border bg-white px-3 py-2 shadow-sm">
                    <button aria-label="Decrease quantity" className="px-2 py-1 text-slate-500 hover:text-slate-700">
                      −
                    </button>
                    <span className="px-4 text-slate-900">1</span>
                    <button aria-label="Increase quantity" className="px-2 py-1 text-slate-500 hover:text-slate-700">
                      ＋
                    </button>
                  </div>
                  <footer className="text-right">
                    <p className="text-2xl font-bold">$120.00</p>
                    <p className="text-xs text-slate-500 tracking-wide">ITEM TOTAL</p>
                  </footer>
                </div>
              </aside>
            </div>
          </article>
        </section>

        <aside
          aria-labelledby="order-summary-title"
          className="bg-white rounded-3xl shadow-lg p-6 h-max sticky top-6"
        >
          <h2 id="order-summary-title" className="text-2xl font-semibold text-slate-900">
            Order Summary
          </h2>
          <p className="mt-2 text-slate-500">Review prices, shipping, and secure checkout options.</p>

          <dl className="mt-6 space-y-3 text-slate-700">
            <div className="flex items-center justify-between">
              <dt>Subtotal (3 items)</dt>
              <dd className="tabular-nums">$846.00</dd>
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
            <span className="text-2xl font-bold text-slate-900 tabular-nums">$1,023.66</span>
          </div>

          <button
            type="button"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 font-medium text-white bg-slate-800 hover:bg-slate-600 transition-shadow shadow-md"
            aria-label="Proceed to Checkout"
          >
            <CreditCard size={18} />
            Proceed to Checkout
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Secure checkout with SSL encryption
          </p>
        </aside>
      </div>

      {/* (Optional) page footer */}
      <footer className="h-10" />
    </main>
  );
}
