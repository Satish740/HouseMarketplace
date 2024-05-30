import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { collection,query,where,orderBy,limit,startAfter, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItems from "../components/ListingItems"

function Category() {
  const [listings,setListings]=useState(null)
  const [loading,setLoading]=useState(true)
  const params=useParams()

  useEffect(()=>{
    const fetchListings=async()=>{
        try{

            const listingsCollection=collection(db,'listings')  
            const listingsQuery=query(listingsCollection,where('type','==',params.categoryName),orderBy('timestamp','desc'),limit(10))
            //Excecuting the query
            const listingsSnapshot=await getDocs(listingsQuery)

            const listings=[]
            listingsSnapshot.forEach((doc)=>{
                listings.push({id:doc.id,data:doc.data()})
            })
            setListings(listings)
            setLoading(false)
        }
        catch(err){
            toast.error('Could not fetch the listings!')
        }
    }
    fetchListings()
},[params.categoryName])
    return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                {params.categoryName==='rent'?'Places for rent':'Places for sale'}
            </p>
        </header>
        {loading?<Spinner/>: listings && listings.length>0?
       <>
       <main>
        <ul className="categoryListings">
            {
                listings.map((listing)=>(
                    <ListingItems listing={listing.data} 
                    id={listing.id}
                    key={listing.id} />
                ))
            }
        </ul>
       </main>
       
       </>:
        <p>
            No listings for {params.categoryName}
        </p>
       
    }
    </div>
  )
}

export default Category

