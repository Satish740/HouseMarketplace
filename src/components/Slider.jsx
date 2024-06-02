import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from './Spinner';


function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      const listings = [];
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === listings.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? listings.length - 1 : prev - 1));
  };

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return null;
  }

  return (

    listings&&( 
        <>
        <p className='exploreHeading'>Recommended</p>
        <div className="slider">
      <button className="slider-button left" onClick={prevSlide}>
        &#10094;
      </button>
      <div
        className="slider-image"
        style={{
          backgroundImage: `url(${listings[currentSlide].data.imageUrls[0]})`,
        }}
        onClick={() => navigate(`/category/${listings[currentSlide].data.type}/${listings[currentSlide].id}`)}
      >
        <p className="swiperSlideText">{listings[currentSlide].data.name}</p>
        <p className="swiperSlidePrice">
          ${listings[currentSlide].data.discountedPrice ?? listings[currentSlide].data.regularPrice}{' '}
          {listings[currentSlide].data.type === 'rent' && '/ month'}
        </p>
     
      </div>
      <button className="slider-button right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
        
        
        </>
    )
 
  );
}

export default Slider;
