import { useEffect, useRef, useState } from 'react';

/**
 * useInView — triggers when an element enters the viewport.
 * @param {Object} options  IntersectionObserver options
 * @param {boolean} once    Only fire once (default true)
 */
function useInView(options = {}, once = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { threshold: 0.15, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return [ref, inView];
}

/**
 * Animation variants — map a name to Tailwind transition classes.
 * The element starts "hidden" and transitions to "visible" when in view.
 */
const VARIANTS = {
  'fade-up':    { hidden: 'opacity-0 translate-y-10',  visible: 'opacity-100 translate-y-0' },
  'fade-down':  { hidden: 'opacity-0 -translate-y-10', visible: 'opacity-100 translate-y-0' },
  'fade-left':  { hidden: 'opacity-0 -translate-x-12', visible: 'opacity-100 translate-x-0' },
  'fade-right': { hidden: 'opacity-0 translate-x-12',  visible: 'opacity-100 translate-x-0' },
  'fade-in':    { hidden: 'opacity-0',                 visible: 'opacity-100' },
  'zoom-in':    { hidden: 'opacity-0 scale-90',        visible: 'opacity-100 scale-100' },
  'zoom-up':    { hidden: 'opacity-0 scale-95 translate-y-6', visible: 'opacity-100 scale-100 translate-y-0' },
};

/**
 * Animate — wraps any element and animates it in when it scrolls into view.
 *
 * @param {string}  variant   Animation style (default 'fade-up')
 * @param {number}  delay     Delay in ms (default 0) — use for stagger effects
 * @param {number}  duration  Duration in ms (default 600)
 * @param {string}  className Extra Tailwind classes
 * @param {string}  as        HTML tag (default 'div')
 */
export default function Animate({
  children,
  variant = 'fade-up',
  delay = 150,
  duration = 750,
  className = '',
  as: Tag = 'div',
  threshold = 0.15,
  once = true,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold }, once);
  const v = VARIANTS[variant] ?? VARIANTS['fade-up'];

  return (
    <Tag
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: inView ? `${delay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform, opacity',
      }}
      className={`transition-all ${inView ? v.visible : v.hidden} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
