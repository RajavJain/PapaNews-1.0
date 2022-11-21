import React, {useEffect, useState} from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News =(props)=> {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    
    
    const capitalizeFirstLetter=(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `${capitalizeFirstLetter(props.category)} || ${"PapaNews"} - Stay Informed with PapaNews`;

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])
    
    const updateNews= async () =>{
        try {
            props.setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            setLoading(true);
            props.setProgress(50);
            let res = await fetch(url);
            let data = await res.json();
            props.setProgress(70);

            setArticles(data.articles)
            setTotalResults(data.totalResults)
            setLoading(false);

            props.setProgress(100);
        }
        catch (e) {
            console.log("something is not working");
        }
    }

    // handlePrevClick = async () => {
    //     await this.setState({ page: this.state.page - 1 });
    //     await this.updateNews()
    // }

    // handleNextClick = async () => {
    //     await this.setState({ page: this.state.page + 1 });
    //     await this.updateNews()
    // }


    const fetchMoreData = async () => {
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
            setPage(page+1) 
        // this.setState({ loading: true });
        let res = await fetch(url);
        let data = await res.json();
        setArticles(articles.concat( data.articles));
        setTotalResults(data.totalResults);
        
        }
        catch (e) {
            console.log("something is not working");
        }
      };

        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ marginTop: "70px", marginBottom: "20px" }}>Top Headlines from `{capitalizeFirstLetter(props.category)}`</h1>
                {loading===true && <Spinner/>}
                
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length!==totalResults}
                        loader={<Spinner/>}
                        >
                        <div className='row'>
                    {articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                    </div>
                    </InfiniteScroll>

                {/* <div className="container my-5 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className=" btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>

                </div> */}

            </div>
        )
    }

News.defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general"
} 

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News