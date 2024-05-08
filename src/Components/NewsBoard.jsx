import { useEffect } from "react";
import { useState } from "react";
import NewsItem from "./NewsItem";


const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=cd1b7a3477744998b52e138c13a4c1fc`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
          setError(null);
        } else {
          throw new Error("Invalid data structure received");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <>
      <h2 className="text-center py-4">Latest <span className="badge bg-danger">News</span> </h2>
    <div className=" container">
      <div className="row g-5 pb-5">
        {articles?.map((news,index)=>{
        return( <>
        <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} author={news.author} publishedAt={news.publishedAt}/></> 
      )})}
      </div>
    </div>
    </>
  )
}

export default NewsBoard
