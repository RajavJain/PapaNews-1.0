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

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      

    constructor(props){
        super(props);
            this.state={
                articles : [],
                loading: false,
                page: 1
            }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} || ${"PapaNews"} - Stay Informed with PapaNews`;
    }

    async componentDidMount(){
        this.updateNews();
    }

    async updateNews(){
    try{    
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2d29a19fe274adeab2fec399b24b241&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
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
    await this.setState({ page: this.state.page-1});
    await this.updateNews()
}

 handleNextClick= async ()=>{
   await this.setState({ page: this.state.page+1});
   await this.updateNews()
}

  render() {
    return (
      <div className='container my-3'>
          <h1 className='text-center' style={{marginTop:"70px",marginBottom:"20px"}}>Top Headlines from `{this.capitalizeFirstLetter(this.props.category)}`</h1>
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
