import { Quote, Star } from "lucide-react";

interface TestimonialProps {
  item: {
    id: number;
    name: string;
    image: string;
    review: string;
    rating: number;
  };
}

const TestimonialCard = ({ item }: TestimonialProps) => {
  return (
    <div className="bg-white  rounded-2xl p-6 shadow-sm">

      <Quote
        size={30}
        className="text-orange-500 fill-orange-500"
      />

      <p className="text-gray-700 text-sm leading-7 mt-4">
        &quot;{item.review}&quot;
      </p>

      <hr className="my-5" />

      <div className="flex items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-black">{item.name}</h3>

          <div className="flex mt-1">
            {Array.from({ length: item.rating }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className="fill-yellow-400  text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TestimonialCard;
