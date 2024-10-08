import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import loadindd from '../loading/loadingg.gif';
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [qidiruv, setQidiruv] = useState("");
  const minRef = useRef();
  const maxRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try 
    { const res = await 
     axios.get("https://fn27.vimlc.uz/books");
      setBooks(res.data);
    }
     catch (err) {
      console.log(err);
    }
     finally {
      setLoading(false); 
    }
  };
  const fetchSearchBooks = async (query) => {
    if (query.trim()) 
     {
      setLoading(true);
      try {
        const res = await 
        axios.get(`https://fn27.vimlc.uz/books/search?query=${query}`);
        setBooks(res.data);
      } 
      catch (err) {
        console.log(err);
      } 
      finally {
        setLoading(false);
      }
    } 
    else {
      fetchBooks();
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value; 
    setQidiruv(value); 
    fetchSearchBooks(value); 
  };

  const filterbtn = () => {
    const min = minRef.current.value;
    const max = maxRef.current.value;

    setLoading(true);
    axios
      .get(`https://fn27.vimlc.uz/books/filter?minPages=${min}&maxPages=${max}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

function handleRedirect(id){
     navigate(`/books/${id}`)
     console.log("bosildi")
}

  return (
    <div className="flex flex-col gap-20 mt-10">
      <div className="text-bold text-black flex w-full items-center justify-between">
        <input
          value={qidiruv}
          onChange={handleSearchChange}
          className="px-3 py-1 rounded outline-none"
          type="text"
          placeholder="Qidiruv..."
        />
        <div className="w-1/4 flex justify-between items-center">
          <input
            ref={minRef}
            className="px-2 py-1 w-1/4 rounded outline-none"
            type="number"
            placeholder="min"
          />
          <input
            ref={maxRef}
            className="px-2 py-1 w-1/4 rounded outline-none"
            type="number"
            placeholder="max"
          />
          <button
            onClick={filterbtn} 
            className="hover:bg-blue-700 rounded bg-blue-600 text-white font-bold px-3 py-1"
          >
            Filter
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-5 justify-between">
        {loading ? (
          <img className="mx-auto w-1/4" src={loadindd} alt="Loading..." />
        ) : books.length > 0 ? (
          books.map((book) => 
          <Card onClick={(event) => {handleRedirect(book.id)}} book={book} key={book.id} />)
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
