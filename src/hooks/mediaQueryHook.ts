import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): any => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: any): any => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return (): any => mediaMatch.removeListener(handler);
  });

  return matches;
};
