import { useCallback, useEffect, useState } from 'react';

export default function useScroll(targetScroll: number) {
  const [isScrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const maxScrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentScrollPercentage = (document.documentElement.scrollTop / maxScrollTop) * 100;
    if (currentScrollPercentage >= targetScroll) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [targetScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isScrolled };
}
