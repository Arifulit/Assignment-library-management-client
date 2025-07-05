import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image:
      "https://follettsoftware.com/wp-content/uploads/2024/08/Schoolboy-selecting-a-book-from-bookcase-in-library.jpeg",
    title: "Explore Knowledge Without Boundaries",
    description:
      "Find your next favorite book and manage your reading journey with ease and elegance.",
  },
  {
    id: 2,
    image:
      "https://www.ala.org/sites/default/files/styles/tab_group_main_image_lg/public/2024-03/Become%20a%20Librarian%20header.jpg.webp?itok=gsjaG8Nx",
    title: "Organized Library System",
    description:
      "Keep track of borrowed books, availability, and details — all in one responsive dashboard.",
  },
  {
    id: 3,
    image:
      "https://www.euroschoolindia.com/blogs/wp-content/uploads/2024/05/mumbai-libraries.webp",
    title: "Future-Ready Library",
    description:
      "Modern features and clean UI to support learning and digital book management.",
  },
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-b-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-md sm:text-lg md:text-xl max-w-2xl mb-6">
              {slide.description}
            </p>

            {/* Browse Books Button */}
            <Link
              to="/books"
              className="text-white bg-indigo-700 px-6 py-3 rounded-md font-semibold shadow hover:bg-blue-800 transition"
            >
              Browse Books
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
