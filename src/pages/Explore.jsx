import { Link } from "react-router-dom"
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
function Explore() {
  return (
    <div>
  <header>
    <p className="pageHeader">Explore</p>
  </header>
<main>
    <p className="exploreCategoryHeading">Categories</p>
    <div className="exploreCategories">
        <Link to='/category/rent'>
            <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />
            <p className='explorecategoryName'>Places for Rent</p>
        </Link>
        <Link to='/category/sale'>
            <img src={sellCategoryImage} alt="rent" className="exploreCategoryImg" />
            <p className='explorecategoryName'>Places for Sale</p>
        </Link>
    </div>
</main>
    </div>
  )
}

export default Explore
