import { useCallback } from "react";

interface ScrollOptions {
  behavior?: ScrollBehavior;
  top?: number;
  left?: number;
  offset?: number; // Add offset option
}

export const useScrollToTop = () => {
  const scrollToTop = useCallback((options: ScrollOptions = {}) => {
    const { behavior = "smooth", top = 0, left = 0 } = options;

    window.scrollTo({
      top,
      left,
      behavior,
    });
  }, []);

  const scrollToElement = useCallback(
    (elementId: string, options: ScrollOptions = {}) => {
      const element = document.getElementById(elementId);
      if (element) {
        const { behavior = "smooth", offset = 80 } = options; // Default offset of 80px for header

        // Get element's position relative to the document
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;

        // Calculate scroll position with offset
        const scrollPosition = elementPosition - offset;

        window.scrollTo({
          top: scrollPosition,
          behavior,
        });
      }
    },
    []
  );

  return {
    scrollToTop,
    scrollToElement,
  };
};
