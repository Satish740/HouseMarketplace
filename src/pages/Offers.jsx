import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { collection,query,where,orderBy,limit,startAfter, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItems from "../components/ListingItems"

function Offers() {
  const [listings,setListings]=useState(null)
  const [loading,setLoading]=useState(true)
  const params=useParams()

  useEffect(()=>{
    const fetchListings=async()=>{
        try{

            const listingsCollection=collection(db,'listings')  
            const listingsQuery=query(listingsCollection,where('offer','==',true),orderBy('timestamp','desc'),limit(10))
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
},[])
    return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                Offers
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
         There are no current Offers
        </p>
       
    }
    </div>
  )
}

export default Offers

