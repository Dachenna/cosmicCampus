import { useEffect, useRef } from 'react';
import { Button } from '../ui/button'
import Logo from "../../assets/cosmic.png";
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Entrance animation for headline and buttons
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(root.querySelectorAll('.hero-line'), {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
    })
      .from(
        root.querySelectorAll('.hero-copy'),
        { y: 20, opacity: 0, duration: 0.6 },
        '-=0.3'
      )
      .from(
        root.querySelectorAll('.hero-ctas > *'),
        { y: 12, opacity: 0, stagger: 0.08, duration: 0.5 },
        '-=0.4'
      );

    // Scroll-triggered pin/animation for decorative image (optional)
    const img = root.querySelector('.hero-aside');
    if (img) {
      gsap.fromTo(
        img,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: root,
            start: 'top top+=50',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <section  id="hero" className="w-full py-20">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-8 items-center">
        <div className="hero-left max-w-2xl">
          <h1 className="text-5xl lg:text-6xl font-light leading-tight text-gray-900">
            <span className="block hero-line">Welcome to</span>
            <span className="block hero-line">Cosmic</span>
            <span className="block hero-line">Campus:</span>
            <span className="block hero-line">Where</span>
            <span className="block hero-line">Learning</span>
            <span className="block hero-line">Thrives</span>
          </h1>

          <p className="mt-6 text-gray-600 hero-copy">
            At Cosmic Campus, we are dedicated to fostering academic excellence while
            nurturing the whole child. Our vibrant community encourages exploration in both
            academics and extracurricular activities, ensuring a well-rounded education.
          </p>

          <div className="mt-6 hero-ctas flex gap-4">
            <Link to="/about">
              <Button variant="default">Learn More</Button>
            </Link>
            <Link to="/signup">
              <Button variant="ghost">Sign Up</Button>
            </Link>
          </div>
        </div>

        <aside className="hero-aside flex justify-end">
          <img src={Logo} alt="Cosmic" className="w-64 h-64 object-contain rounded-md shadow-lg" />
        </aside>
      </div>
    </section>
  );
};

export default Hero;

