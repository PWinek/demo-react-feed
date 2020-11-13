import React, { Component } from 'react';
import './App.scss';

class Feed extends Component {
  render() {
    return (
      <div className="container">
          <div className='col-md-12 mt-5 mb-5'>
            <div className='card'>

              <div className='card lg-3 justify-content-center align-items-center'> 
                <a href={this.props.post.url}>
                <img src={this.props.post.thumb} alt="image"></img>
                </a>
              </div>

              <div className='card-body position-absolute'>
                <h5 className='card-title'>
                  <a href={this.props.post.url}>{this.props.post.title}</a>
                </h5>
                <p>
                  <a href={this.props.post.url}>{this.props.post.excerpt}</a>
                </p>
                <p>
                  <a href={this.props.post.url}>{this.props.post.date}</a>
                </p>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        posts: [],
        page: 1
      }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchData(this.state.page);
  }

  infiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop
       === document.documentElement.offsetHeight){
      let newPage = this.state.page;
      newPage++;
      this.setState({page: newPage});
      this.fetchData(newPage);
    }
  }

  fetchData = (pageNum) => {
    let feedUrl = 'http://localhost:3001/posts?_page='+pageNum;
    fetch(feedUrl)
      .then(res=>res.json())
      .then(data => {
        this.setState({
          posts: [...this.state.posts,...data]
        })
      })
  }
    
  render() {
    return (
      <div>
      {this.state.posts.map((feedData, index) => (<Feed key={index} post={feedData} />))}
      </div>
    );
  }
}

export default App;