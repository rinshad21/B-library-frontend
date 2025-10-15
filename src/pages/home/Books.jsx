import { useEffect, useState } from "react"
import BookCard from "../Books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/bookApi";

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];


const Books = () => {
//fetching book data from backend
const { data } = useFetchAllBooksQuery();
const books = data?.Book || [];


    
    //saving catgory state
const [selectedCategory, setSelectedCategory] = useState("Trending")
    
         
//filter books based on category
const filteredBooks = selectedCategory === "Trending"
    ? books.filter(book => book.trending)
    : selectedCategory === "Choose a genre"
        ? books
        : books.filter(book => book.category === selectedCategory.toLowerCase());



  
    
  return (
      <div className="py-10">
          <h2 className="text-2xl font-semibold mb-6">Trending collection</h2>
          {/* catergory filtering */}
          <div className="mb-8 flex items-center ">
              <select onChange={(e)=>setSelectedCategory(e.target.value)} name="category" id="category "
              className="border bg-[#c9c5e6] border-gray-300 rounded-md focus:outline-none px-4 py-2 " 
              >
                  {
                      categories.map((category, index) => {
                          return(
                          <option  key={index} value={category}>{ category}</option>
                        )  })
                  }
              </select>
          </div>
          {
              filteredBooks.map((book, index) => (
                  <BookCard key={index } book={book} />
              ))
          }
    </div>
  )
}

export default Books