export type CategoryId = 'all' | 'burgers' | 'smash' | 'sides' | 'drinks' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  price: number;
  badge?: string;
  badgeColor?: 'emerald' | 'orange' | 'amber';
  rating: number;
  reviewsCount: number;
  image: string;
  spicyLevel?: number; // 0-3
  isBestSeller?: boolean;
  ingredients: string[];
  specs: {
    meatWeight: string;
    bunType: string;
    cheese: string;
  };
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  meatDoneness?: 'Ao ponto da casa (suculento)' | 'Bem passado' | 'Ao ponto para mal';
  extraAddons: {
    name: string;
    price: number;
  }[];
  notes?: string;
  itemTotalPrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteBurger: string;
  date: string;
}
