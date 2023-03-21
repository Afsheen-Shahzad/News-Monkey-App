import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      totalResults: 0,
      articles: [],
      loading: false,
      page: 1, //by default the no. of news per page is 20. if more than 20 news we have to use pagination to display news on different pages
      check: false
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} News - News Monkey`
  }


  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      check: true
    })
    console.log("CDM PageNo is " + this.state.page);
    this.props.setProgress(100);

  }

  async componentDidMount() {
    
    //{this.state.check?'':this.updateNews();}
    if(this.state.check)
    {
      
    }
    else{
      this.updateNews();
    }

  }

  handlePrevClick = async () => {
    /* giving await before setState basically waits for it to finish updating the page value 
    before moving to the next line of code, which it was not doing earlier and the 
    updateNews() was being called before the page increased or decreased in value. */

    await this.setState({ page: this.state.page - 1 });
    this.updateNews();

    /*  Can also used as a call back function 
     this.setState({ page: this.state.page + 1 }, () => this.updateNews()); */
  }
  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    await this.setState({page : this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })
    console.log("Articles length so far" + this.state.articles.length);
    console.log("total results " + parsedData.totalResults) ; 
  };

  render() {
    return (
      <>
        <h1 className='text-center my-5'>NewsMonkeys - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {/*   { !this.state.loading && this.state.articles.map((element)=>{ */}
              {this.state.articles.map((element,index) => {
                return <div className="col-md-4" key={index}>
                  <NewsItem title={element ? element.title.slice(0, 45) : ''} description={element.description ? element.description.slice(0, 80) : 'No description to display'} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  {/*<NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} /> */}                    
                  {console.log(index)}
                  </div>
              })}
              
              {/* Read the articles array and display via loop */}
            </div>
          </div>
          </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>&rarr; Next</button>
        </div> */}

      </>
    )
  }
}

export default News