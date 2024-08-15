import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// {
//   image: turf1,
//   name: 'Venkateswara Turf',
//   address: 'Venkateswara Turf, Venkateswara Colony, Peelamedu, Coimbatore, Tamil Nadu 641004',
//   rating: 4.6,
//   ratingCount: 67,
//   tags: ['Football Coaching Classes', 'Cricket Turf Grounds'],
//   whatsapp: '1234567890',
//   phone: '0987654321'
// },
// {
//   image: turf2,
//   name: 'Green Field Turf',
//   address: 'Green Field Turf, 36, Kuppuswamy Street, R.S. Puram, Coimbatore, Tamil Nadu 641002',
//   rating: 4.8,
//   ratingCount: 45,
//   tags: ['Certified trainers', 'Yoga Classes'],
//   whatsapp: '2345678901',
//   phone: '1987654320'
// },
// {
//   image: turf1,
//   name: 'Sports Arena',
//   address: 'Sports Arena, 61, Dr. Nanjappa Road, Coimbatore, Tamil Nadu 641018',
//   rating: 4.7,
//   ratingCount: 50,
//   tags: ['Multi-sport Facilities', 'Gym Facilities'],
//   whatsapp: '3456789012',
//   phone: '2987654321'
// },
// {
//   image: turf2,
//   name: 'Royal Turf',
//   address: 'Royal Turf, 10, Nanjappa Road, Coimbatore, Tamil Nadu 641018',
//   rating: 4.5,
//   ratingCount: 40,
//   tags: ['Football Grounds', 'Cricket Grounds'],
//   whatsapp: '4567890123',
//   phone: '3987654321'
// },
// {
//   image: turf1,
//   name: 'Champion Turf',
//   address: 'Champion Turf, 10/5, Bharathi Park, Coimbatore, Tamil Nadu 641011',
//   rating: 4.6,
//   ratingCount: 60,
//   tags: ['Football Coaching', 'Training Grounds'],
//   whatsapp: '5678901234',
//   phone: '4987654321'
// },
// {
//   image: turf2,
//   name: 'Turf Legends',
//   address: 'Turf Legends, 19, Avinashi Road, Coimbatore, Tamil Nadu 641018',
//   rating: 4.8,
//   ratingCount: 55,
//   tags: ['Certified Trainers', 'Specialty Grounds'],
//   whatsapp: '6789012345',
//   phone: '5987654321'
// },
// {
//   image: turf1,
//   name: 'Prime Turf',
//   address: 'Prime Turf, 49, K.K. Pudur, Coimbatore, Tamil Nadu 641038',
//   rating: 4.7,
//   ratingCount: 58,
//   tags: ['Football Coaching', 'Fitness Training'],
//   whatsapp: '7890123456',
//   phone: '6987654321'
// },
// {
//   image: turf2,
//   name: 'Green Haven Turf',
//   address: 'Green Haven Turf, 52, Pappanaicken Palayam, Coimbatore, Tamil Nadu 641037',
//   rating: 4.5,
//   ratingCount: 42,
//   tags: ['Football Grounds', 'Yoga Classes'],
//   whatsapp: '8901234567',
//   phone: '7987654321'
// },
// {
//   image: turf1,
//   name: 'Victory Turf',
//   address: 'Victory Turf, 12, Kovaipudur, Coimbatore, Tamil Nadu 641042',
//   rating: 4.6,
//   ratingCount: 65,
//   tags: ['Cricket Grounds', 'Football Coaching'],
//   whatsapp: '9012345678',
//   phone: '8987654321'
// },
// {
//   image: turf2,
//   name: 'Eagle Turf',
//   address: 'Eagle Turf, 25, Saravanampatti, Coimbatore, Tamil Nadu 641035',
//   rating: 4.7,
//   ratingCount: 52,
//   tags: ['Multi-sport Grounds', 'Training Facilities'],
//   whatsapp: '0123456789',
//   phone: '9987654321'
// }