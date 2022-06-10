import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps ={
        country : "us",
        pageSize: 6,
        category: "general"
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category :PropTypes.string

    }


    constructor(){
        super();
        // console.log("I am Constructor");
        this.state={
            articles : [],
            loading: false,
            page: 1
        }
    }
    // async componentDidMount(){
    //     let url="https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}}business&apiKey=d5629a5c70794d2d9c5781d5c7832a66";
    //     let data= await fetch(url);
    //     let parsedData=await data.json;
    //     console.log(parsedData);
    //     this.setState({articles: parsedData.articles});
    // }


    async componentDidMount(){
    try{    
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5629a5c70794d2d9c5781d5c7832a66&page=1&pageSize=${this.props.pageSize}`; 
        this.setState({loading: false});    
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults
        });
    }
    catch(e) {
        console.log("something is not working");
    }
}

    async updateNews(){
    try{    
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5629a5c70794d2d9c5781d5c7832a66&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
        this.setState({loading: true});    
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            loading :false,
            articles: data.articles,
            totalResults: data.totalResults
        });
    }
    catch(e) {
        console.log("something is not working");
    }
 }

 handlePrevClick= async ()=>{
    // console.log("Previous");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5629a5c70794d2d9c5781d5c7832a66&page=${this.state.page-1}&pageSize=${this.props.pageSize}`; 
    // this.setState({loading: true});    
    // let res = await fetch(url);
    // let data = await res.json();
    // this.setState({
    //     loading :false,
    //     page: this.state.page-1,
    //     articles: data.articles
    // })

    await this.setState({ page: this.state.page-1});
    await this.updateNews()

}

 handleNextClick= async ()=>{
    //  if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     // console.log("Next");
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5629a5c70794d2d9c5781d5c7832a66&page=${this.state.page+1}&pageSize=${this.props.pageSize}`; 
    //     this.setState({loading: true});  
    //     let res = await fetch(url);
    //     let data = await res.json();
    //     this.setState({
    //         page: this.state.page+1,
    //         articles: data.articles,
    //         loading :false
    //     })
    //  }
   await this.setState({ page: this.state.page+1});
   await this.updateNews()
    
}



  render() {
    return (
      <div className='container my-3' >
          <h1 className='text-center' style={{marginTop:"70px"}}>PapaNews - Top Headlines</h1>
          {this.state.loading===true && <Spinner/>}
          <div className='row'>
          {!this.state.loading && this.state.articles.map((element)=>{
              return <div className='col-md-4' key={element.url}>
              <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
          })}
              
          </div>

          <div className="container my-5 d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className=" btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.state.page)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>

          </div>

      </div>
    )
  }
}
