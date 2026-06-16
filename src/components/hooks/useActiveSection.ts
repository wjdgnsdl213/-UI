import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], offset = 110) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? 'summary');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sectionIds.length === 0) return;

    let animationFrame = 0;

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const sections = sectionIds
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => Boolean(element));

        if (sections.length === 0) return;

        const current = sections.reduce((closest, section) => {
          const distance = Math.abs(section.getBoundingClientRect().top - offset);
          const closestDistance = Math.abs(closest.getBoundingClientRect().top - offset);
          return distance < closestDistance ? section : closest;
        }, sections[0]);

        setActiveId(current.id);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [offset, sectionIds]);

  return activeId;
}
