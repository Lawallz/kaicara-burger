import { MenuItem, Testimonial } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'o-caicara',
    name: 'O Caiçara',
    category: 'burgers',
    tagline: 'O lendário da casa com sabor do litoral',
    description: '2 Blends 100% Angus (160g cada) grelhados no fogo forte de lenha nobre, queijo prato curado da Serra do Mar derretendo em dobro, fatias generosas de bacon artesanal crocante, cebola caramelizada na cerveja escura e nossa Maionese Verde Secreta no pão brioche de fermentação natural.',
    price: 42.90,
    badge: 'Destaque do Mês',
    badgeColor: 'emerald',
    rating: 4.9,
    reviewsCount: 342,
    isBestSeller: true,
    image: 'o-caiçara.jpg',
    ingredients: [
      '2x Blends Angus 160g',
      'Pão Brioche Fermentação Natural',
      'Queijo Prato Curado da Serra',
      'Bacon Artesanal Defumado 8h',
      'Cebola na Cerveja Escura',
      'Maionese Verde Secreta'
    ],
    specs: {
      meatWeight: '320g Angus na Brasa',
      bunType: 'Brioche Levain',
      cheese: 'Queijo Prato Serra do Mar'
    }
  },
  {
    id: 'tabatinga-bacon',
    name: 'Tabatinga Triple Bacon',
    category: 'smash',
    tagline: 'Para os apaixonados por bacon em 3 texturas',
    description: '3 Smashes de 80g Angus, queijo gouda cremoso, bacon em fatias crocantes, bacon caramelizado no melaço de cana e maionese de bacon defumado.',
    price: 41.90,
    badge: 'Puro Bacon',
    badgeColor: 'orange',
    rating: 4.9,
    reviewsCount: 142,
    image: 'xbacon.jpg',
    ingredients: [
      '3x Smash Angus 80g',
      'Queijo Gouda Melt',
      'Bacon em Fatias',
      'Bacon Bits no Melaço',
      'Maionese de Bacon'
    ],
    specs: {
      meatWeight: '240g Smash Triplo',
      bunType: 'Brioche Artesanal',
      cheese: 'Queijo Gouda'
    }
  },
  
  {
    id: 'mussarela-da-orla',
    name: 'Mussarela da Orla',
    category: 'burgers',
    tagline: 'Mussarela derretida com sabor do litoral',
    description: 'Burger de 180g Angus coberto com generosa porção de mussarela derretida, requeijão de corte maçaricado no maçarico e crispy de couve fininha.',
    price: 46.90,
    badge: 'Edição Especial',
    badgeColor: 'amber',
    rating: 5.0,
    reviewsCount: 195,
    isBestSeller: true,
    image: 'xmussa.jpg',
    ingredients: [
      'Blend Angus 180g',
      'Costela Marinada 12h',
      'Requeijão de Corte Maçaricado',
      'Crispy de Couve Crocante',
      'Pão Brioche Selado',
      'Aioli de Alho Negro'
    ],
    specs: {
      meatWeight: '180g Angus + 100g Costela',
      bunType: 'Brioche de Manteiga',
      cheese: 'Requeijão de Corte'
    }
  },
  {
    id: 'combo-martim-de-sa',
    name: 'Combo Martim de Sá',
    category: 'burgers',
    tagline: 'Ultracrocante com crostinha dourada perfeita',
    description: '2 Ultra Smashes Angus (90g cada) prensados na chapa de ferro fundido com crosta caramelizada, american cheese artesanal derretendo em dobro, picles especial e molho Smash Secreto.',
    price: 34.90,
    badge: 'Smash Clássico',
    badgeColor: 'emerald',
    rating: 4.8,
    reviewsCount: 164,
    isBestSeller: true,
    image: 'combo.jpg',
    ingredients: [
      '2x Smash 90g Crosta Dourada',
      'Pão de Batata Artesanal',
      'Double American Cheese',
      'Picles de Pepino',
      'Molho Smash Especial'
    ],
    specs: {
      meatWeight: '180g Smash Duplo',
      bunType: 'Pão de Batata Fofo',
      cheese: 'American Cheese'
    }
  },
  {
    id: 'bruta-flor',
    name: 'Bruta Flor',
    category: 'burgers',
    tagline: 'Fumaça nobre, crocância e queijo cheddar inglês',
    description: 'Blend Angus 180g selado no calor máximo da brasa, crosta marcante de pimenta-do-reino moída na hora, queijo cheddar inglês derretido, picles crocante da horta, cebola roxa fresca e molho barbecue rústico de rapadura caiçara.',
    price: 39.90,
    badge: 'Fogo Forte',
    badgeColor: 'orange',
    rating: 4.8,
    reviewsCount: 228,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
    ingredients: [
      'Blend Angus 180g na Brasa',
      'Pão Australiano Artesanal',
      'Cheddar Inglês Melted',
      'Picles Artesanal Crocante',
      'Cebola Roxa Agridoce',
      'Barbecue de Rapadura'
    ],
    specs: {
      meatWeight: '180g Angus',
      bunType: 'Australiano com Mel',
      cheese: 'Cheddar Inglês'
    }
  },
  {
    id: 'fritas-caicara',
    name: 'Fritas Rústicas Kaiçara',
    category: 'sides',
    tagline: 'Crocância máxima com tempero da casa',
    description: 'Batatas rústicas com casca cortadas à mão e fritas em duas temperaturas. Acompanha alecrim fresco, sal marinho de Caraguá e nossa Maionese Verde Secreta.',
    price: 24.90,
    badge: 'Porção Generosa',
    badgeColor: 'emerald',
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Batata Asterix Fresca', 'Alecrim na Brasa', 'Sal Marinho', 'Maionese Verde Secreta'],
    specs: {
      meatWeight: '400g Servida na Tábua',
      bunType: 'Acompanhamento',
      cheese: 'Parmesão Opcional'
    }
  },
  {
    id: 'dadinhos-tapioca-queijo',
    name: 'Dadinhos de Tapioca & Queijo Coalho',
    category: 'sides',
    tagline: 'Essência brasileira com geleia de pimenta da orla',
    description: '12 unidades de dadinhos crocantes por fora e macios por dentro feitos com queijo coalho artesanal e tapioca granulada. Acompanha geleia de pimenta defumada com maracujá.',
    price: 28.90,
    badge: 'Favorito',
    badgeColor: 'amber',
    rating: 4.9,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Queijo Coalho', 'Tapioca Granulada', 'Geleia de Pimenta e Maracujá'],
    specs: {
      meatWeight: '12 unidades',
      bunType: 'Petisco',
      cheese: 'Coalho da Serra'
    }
  },
  {
    id: 'chopp-artesanal-litoral',
    name: 'Chopp IPA Caiçara 500ml',
    category: 'drinks',
    tagline: 'Cerveja viva e fresca produzida no Litoral Norte',
    description: 'Chopp artesanal estilo American IPA, aromático, com notas cítricas de maracujá e lúpulos frescos que harmonizam perfeitamente com a carne na brasa.',
    price: 18.00,
    badge: 'Local Brew',
    badgeColor: 'orange',
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Malte Nobre', 'Lúpulos Cítricos Selecionados', 'Água Pura da Serra'],
    specs: {
      meatWeight: '500ml Caneca Gelada',
      bunType: 'Teor 6.2%',
      cheese: 'IBU 48'
    }
  },
  {
    id: 'soda-maracuja-praia',
    name: 'Soda Italiana Maracujá & Hortelã',
    category: 'drinks',
    tagline: 'Refrescância pura pós-praia',
    description: 'Maracujá fresco batido com xarope artesanal, água com gás mineral da fonte, folhas de hortelã fresca e gelo cristalino.',
    price: 14.00,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Maracujá Fresco', 'Hortelã da Horta', 'Água com Gás Mineral', 'Xarope Natural'],
    specs: {
      meatWeight: '450ml',
      bunType: 'Sem Álcool',
      cheese: '100% Natural'
    }
  },
  {
    id: 'banoffee-caicara',
    name: 'Banoffee no Pote Caiçara',
    category: 'desserts',
    tagline: 'Banana caramelizada com doce de leite artesanal',
    description: 'Camadas de biscoito amanteigado crocante, doce de leite caseiro cozido em ponto de corte, bananas da terra grelhadas com canela e chantilly leve com raspas de cacau 70%.',
    price: 18.90,
    badge: 'Sobremesa Estrela',
    badgeColor: 'amber',
    rating: 5.0,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
    ingredients: ['Doce de Leite da Fazenda', 'Banana na Brasa', 'Biscoito Tostado', 'Chantilly Fresco'],
    specs: {
      meatWeight: '220g no pote de vidro',
      bunType: 'Sobremesa',
      cheese: 'Artesanal'
    }
  }
];

export const EXTRA_ADDONS = [
  { id: 'bacon', name: 'Bacon Artesanal Crocante Extra', price: 6.00 },
  { id: 'cheese', name: 'Queijo Prato Curado Extra', price: 5.00 },
  { id: 'mayo', name: 'Pote Extra Maionese Verde Secreta', price: 4.50 },
  { id: 'onion', name: 'Cebola Caramelizada na Cerveja Extra', price: 4.00 },
  { id: 'pickles', name: 'Picles Artesanal da Casa', price: 3.50 }
];
