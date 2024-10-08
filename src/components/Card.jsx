

function Card(props){

  const{title, authors, categories, isbn, pageCount,thumbnailUrl}=props.book;

     return(
     <div className="flex items-center backdrop-sepia-0 bg-white/30 p-5 rounded-xl cursor-pointer flex-col gap-5 w-[30%]">
       <img className="w-2/3"  src={thumbnailUrl} alt="" />
       <div className="w-full flex flex-col gap-2 text-white hover:text-gray-300 text-lg font-bold">
          <h1>{title}</h1>
          <h1>{authors}</h1>
          <h1>{categories}</h1>
          <div className="flex justify-between ">
            <p>{isbn}</p>
            <p>{pageCount}</p>
          </div>
       </div>
     </div>
     )
}
export default Card;