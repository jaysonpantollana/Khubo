export interface Tenant {
  name: string;
  image: string;
}

export interface Reservation {
  id: string;
  title: string;
  location: string;
  image: string;
  gallery: string[];
  price: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  available: string;
  tenants: Tenant[];
}

export const reservations: Reservation[] = [
  {
    id: 'res-1',
    title: "Layla's Residences & Dorminitory",
    location: 'Iligan City, Lanao del norte 9200',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    ],
    price: 6000,
    rating: 5.0,
    reviewCount: 35,
    amenities: ['Free Wifi', 'Water'],
    available: '6 available',
    tenants: [
      { name: 'Alice', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=b6e3f4' },
      { name: 'Bob', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob&backgroundColor=b6e3f4' },
      { name: 'Charlie', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie&backgroundColor=b6e3f4' },
    ],
  },
  {
    id: 'res-2',
    title: 'Sunset Boarding House',
    location: 'Pala-o, Iligan City 9200',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    ],
    price: 3500,
    rating: 4.75,
    reviewCount: 22,
    amenities: ['Wifi', 'Water'],
    available: '3 available',
    tenants: [
      { name: 'Diana', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana&backgroundColor=b6e3f4' },
      { name: 'Eve', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve&backgroundColor=b6e3f4' },
    ],
  },
  {
    id: 'res-3',
    title: 'Greenview Apartments',
    location: 'Santiago, Iligan City 9200',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
    ],
    price: 4500,
    rating: 4.8,
    reviewCount: 18,
    amenities: ['AC', 'Free Wifi'],
    available: '2 available',
    tenants: [
      { name: 'Frank', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank&backgroundColor=b6e3f4' },
    ],
  },
];
