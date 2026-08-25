import React, { useState, useEffect } from 'react';
import { WaveIntro } from './components/WaveIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoryVibe } from './components/StoryVibe';
import { MenuSection } from './components/MenuSection';
import { CraftDifferentials } from './components/CraftDifferentials';
import { LoyaltySection } from './components/LoyaltySection';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { BurgerModal } from './components/BurgerModal';
import { CartDrawer } from './components/CartDrawer';
import { TrackOrderModal } from './components/TrackOrderModal';
import { MenuItem, CartItem } from './types';
import { MENU_ITEMS } from './data/menu';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [selectedBurger, setSelectedBurger] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState<boolean>(false);

  // High contrast accessibility state
  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kaicara_high_contrast') === 'true';
    } catch {
      return false;
    }
  });

  const toggleHighContrast = () => {
    setIsHighContrast((prev: boolean) => {
      const next = !prev;
      try {
        localStorage.setItem('kaicara_high_contrast', String(next));
      } catch {}
      return next;
    });
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kaicara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kaicara_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev: CartItem[]) => {
      const existingIdx = prev.findIndex(
        (it: CartItem) =>
          it.menuItem.id === newItem.menuItem.id &&
          it.meatDoneness === newItem.meatDoneness &&
          it.notes === newItem.notes &&
          JSON.stringify(it.extraAddons) === JSON.stringify(newItem.extraAddons)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const exist = updated[existingIdx];
        const newQty = exist.quantity + newItem.quantity;
        const unitPrice = exist.itemTotalPrice / exist.quantity;
        updated[existingIdx] = {
          ...exist,
          quantity: newQty,
          itemTotalPrice: unitPrice * newQty
        };
        return updated;
      }

      return [...prev, newItem];
    });
  };

  const handleQuickAddToCart = (item: MenuItem) => {
    const defaultCartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
      meatDoneness: (item.category === 'burgers' || item.category === 'smash') ? 'Ao ponto da casa (suculento)' : undefined,
      extraAddons: [],
      itemTotalPrice: item.price
    };
    handleAddToCart(defaultCartItem);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev: CartItem[]) => {
      return prev
        .map((item: CartItem) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = item.itemTotalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotalPrice: unitPrice * newQty
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredBurger = MENU_ITEMS[0]; // O Caiçara

  return (
    <div className={`min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-orange-500/30 selection:text-orange-200 relative overflow-x-hidden flex flex-col font-sans ${
      isHighContrast ? 'high-contrast' : ''
    }`}>
      
      {/* 1. Cinematic Ocean Wave Intro Screen */}
      {showIntro && (
        <WaveIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. Top Floating Glass Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackOrderOpen(true)}
      />

      {/* 3. Main Landing Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onSelectBurger={(burger: MenuItem) => setSelectedBurger(burger)}
          featuredBurger={featuredBurger}
        />

        {/* Story & Coastal Vibe */}
        <StoryVibe />

        {/* The Best Sellers & Full Menu */}
        <MenuSection
          onSelectBurger={(burger: MenuItem) => setSelectedBurger(burger)}
          onQuickAddToCart={handleQuickAddToCart}
        />

        {/* Craft Differentials */}
        <CraftDifferentials />

        {/* 4. Gamified Fidelidade Kaiçara Section */}
        <LoyaltySection onExploreMenu={scrollToMenu} />

        {/* Location & Hours */}
        <LocationHours />
      </main>

      {/* 5. Footer with Quick Track Order Banner and Accessibility Toggle */}
      <Footer 
        onOpenTracker={() => setIsTrackOrderOpen(true)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={toggleHighContrast}
      />

      {/* 6. Modals & Slide-out Drawers */}
      {selectedBurger && (
        <BurgerModal
          item={selectedBurger}
          onClose={() => setSelectedBurger(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExploreMenu={scrollToMenu}
        onOpenTracker={() => setIsTrackOrderOpen(true)}
      />

      {/* 7. Live Track Order & History Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />
    </div>
  );
}