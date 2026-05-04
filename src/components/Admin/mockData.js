export const mockUsers = [
  { id: 1, profile: 'https://i.pravatar.cc/150?u=1', name: 'John Doe', email: 'john@example.com', gender: 'Male', phone: '+1234567890', blocked: false },
  { id: 2, profile: 'https://i.pravatar.cc/150?u=2', name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', phone: '+0987654321', blocked: false },
  { id: 3, profile: 'https://i.pravatar.cc/150?u=3', name: 'Bob Johnson', email: 'bob@example.com', gender: 'Male', phone: '+1122334455', blocked: true }
];

export const mockCategories = [
  { id: 1, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=100&h=100', name: 'Concert' },
  { id: 2, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=100&h=100', name: 'Conference' }
];

export const mockEvents = [
  { id: 1, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=300&h=200', title: 'Summer Music Fest', startDate: '2026-06-15', endDate: '2026-06-17', startTime: '18:00', endTime: '23:00', price: '150', category: 'Concert', location: 'Central Park', description: 'A massive summer music festival.' }
];

export const mockGallery = [
  { id: 1, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&h=300', name: 'Crowd Cheering' },
  { id: 2, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=300&h=300', name: 'Main Stage Setup' }
];

export const mockContacts = [
  { id: 1, name: 'Alice Walker', email: 'alice@example.com', phone: '+15550001234', message: 'I need help booking a ticket for the conference.' },
  { id: 2, name: 'David Lee', email: 'david@example.com', phone: '+15559876543', message: 'Do you offer vendor booths at the Summer Music Fest?' }
];

export const mockAdminProfile = {
  name: 'Admin User',
  email: 'admin@eventpulse.com',
  avatar: 'https://i.pravatar.cc/150?u=admin'
};
