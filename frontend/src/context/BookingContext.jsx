import { createContext, useContext, useState } from 'react';
import BookingModal from '../components/ui/BookingModal';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBookingModal = (serviceName = '') => {
    setSelectedService(serviceName);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
    setSelectedService('');
  };

  return (
    <BookingContext.Provider value={{ isOpen, selectedService, openBookingModal, closeBookingModal }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBookingModal} initialService={selectedService} />
    </BookingContext.Provider>
  );
};

export const useBookingModal = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookingModal must be used within BookingProvider');
  return ctx;
};
