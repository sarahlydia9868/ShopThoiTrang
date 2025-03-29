import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
export default function RatingStars({ rating }) {
    const stars: any = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-orange-500" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-orange-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  }