import { useEffect,useState } from "react"

import { collection,query,where,orderBy,limit,startAfter, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItems from "../components/ListingItems"

function Offers() {
  const [listings,setListings]=useState(null)
  const [loading,setLoading]=useState(true)
  const [lastFetchedListing,setLastFetchedListing]=useState(null)

  useEffect(()=>{
    const fetchListings=async()=>{
        try{

            const listingsCollection=collection(db,'listings')  
            const listingsQuery=query(listingsCollection,where('offer','==',true),orderBy('timestamp','desc'),limit(10))
            //Excecuting the query
            const listingsSnapshot=await getDocs(listingsQuery)

            const lastVisible = listingsSnapshot.docs[listingsSnapshot.docs.length-1];
            setLastFetchedListing(lastVisible)

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


const fetchMoreListings=async()=>  {
    try{

    const listingsCollection=collection(db,'listings')  
    const listingsQuery=query(listingsCollection,where('offer','==',true),startAfter(lastFetchedListing),orderBy('timestamp','desc'),limit(5))
    //Excecuting the query
    const listingsSnapshot=await getDocs(listingsQuery)

    const lastVisible = listingsSnapshot.docs[listingsSnapshot.docs.length-1];
    setLastFetchedListing(lastVisible)

    const listings=[]
    listingsSnapshot.forEach((doc)=>{
        listings.push({id:doc.id,data:doc.data()})
    })
    setListings((prevState)=>[...prevState,...listings])
    setLoading(false)
}
catch(err){
    toast.error('Could not fetch the listings!')
}
}
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
       <br />
       <br />

            {lastFetchedListing && <p className="loadMore" onClick={fetchMoreListings}>Load More</p>}

       </>:
        <p>
         There are no current Offers
        </p>
       
    }
    </div>
  )
}

export default Offers

