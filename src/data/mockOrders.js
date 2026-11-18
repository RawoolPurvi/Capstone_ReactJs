export const INITIAL_ORDERS = [
  {
    id: 'ORD-8921-BW',
    placedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago (cancellable)
    status: 'Confirmed',
    deliveryDate: 'Delivery by Mon, 21 Jul',
    items: [
      {
        id: 'joy-of-minimalism',
        title: 'Joy of Minimalism',
        author: 'Daniel Reed',
        price: 149,
        quantity: 1,
        format: 'Paperback'
      },
      {
        id: 'the-path-to-success',
        title: 'The Path to Success',
        author: 'James Wright',
        price: 359,
        quantity: 1,
        format: 'Paperback'
      }
    ],
    address: {
      name: 'Purvi Rawool',
      street: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560103',
      country: 'India',
      phone: '+91 9876543210'
    },
    paymentMethod: 'Credit Card (ending in 4242)',
    subtotal: 508,
    tax: 62,
    discount: 100,
    total: 470
  },
  {
    id: 'ORD-5439-BW',
    placedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago (past 48 hrs)
    status: 'Delivered',
    deliveryDate: 'Delivered on 14 Jul',
    items: [
      {
        id: 'the-art-of-focus',
        title: 'The Art of Focus',
        author: 'Arjun Patel',
        price: 399,
        quantity: 1,
        format: 'Paperback'
      }
    ],
    address: {
      name: 'Purvi Rawool',
      street: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560103',
      country: 'India',
      phone: '+91 9876543210'
    },
    paymentMethod: 'UPI (aditi@okaxis)',
    subtotal: 399,
    tax: 48,
    discount: 50,
    total: 397
  }
];
