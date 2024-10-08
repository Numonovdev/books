import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Prodac(){
     const params = useParams();
     const [produc, setProduc]= useState({})
  useEffect(()=>{
     axios.get(`https://fn27.vimlc.uz/books/${params.id}`)
     .then(res=>{
          setProduc(res.data)
     })
     .catch(err=>{
          console.log(err)
     })
        
  },[])

     return(
          <div className="flex justify-between mt-10 backdrop-sepia-0 bg-black/30  rounded-lg">
               <div className="w-1/2 flex justify-center items-center ">thumbnailUrl</div>
               <div className="flex flex-col w-1/2 gap-1 text-white px-5 rounded-lg py-5 backdrop-sepia-0 bg-black/40 ">
                    <h1>title</h1>
                    <h2>isbn</h2>
                    <h2>pageCount</h2>
                    <h3>publishedDate</h3>
                    <p>publishedDate</p>
                    <p>longDescription</p>
                    <h4>status</h4>
                    <h1>authors</h1>
                    <h1>categories</h1>
               </div>

          </div>
     )
}

export default Prodac;