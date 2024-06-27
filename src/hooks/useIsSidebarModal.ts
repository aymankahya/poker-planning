import { useEffect, useState } from 'react';

export default function useIsSidebarModal(sizeModalTrigger: number) {
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    const handleModalTrigger = () => {
      if (window.innerWidth < sizeModalTrigger) {
        setIsModal(true);
      } else {
        setIsModal(false);
      }
    };

    window.addEventListener('resize', handleModalTrigger);

    return () => window.removeEventListener('resize', handleModalTrigger);
  }, []);

  return { isModal };
}
