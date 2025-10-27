import React from "react";

// --- Image imports (use your own) ---
import review1 from "../Images/r1.png";
import review2 from "../Images/r2.png";
import review3 from "../Images/r3.png";
import review4 from "../Images/r4.png";
import review5 from "../Images/r5.png";
import review6 from "../Images/r6.png";
import review7 from "../Images/r7.png";
import review8 from "../Images/r8.png";
import review9 from "../Images/r9.png";

const StudentReviews = () => {
  const reviews = [
    { id: 1, img: review1 },
    { id: 2, img: review2 },
    { id: 3, img: review3 },
    { id: 4, img: review4 },
    { id: 5, img: review5 },
    { id: 6, img: review6 },
    { id: 7, img: review7 },
    { id: 8, img: review8 },
    { id: 9, img: review9 },
  ];

  return (
    <section className="bg-[#0B0713] py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-5xl font-extrabold text-[#F5B400] mb-12">
          Our Client’s Reviews
        </h2>

        {/* Grid Layout: 3 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-[#F5B400] shadow-[0_0_25px_rgba(245,180,0,0.4)] overflow-hidden w-full max-w-[450px] transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(245,180,0,0.6)]"
            >
              <img
                src={review.img}
                alt={`Student Review ${review.id}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentReviews;
