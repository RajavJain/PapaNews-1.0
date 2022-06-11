
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {

  state={
    progress:0
  }

  pageSize=7;
  apiKey=process.env.REACT_APP_NEWS_API

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
      <Router>
          <Navbar/>
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
            />
            <Routes>
            <Route exact path="/business" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>}/> 
            <Route exact path="/entertainment" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}/> 
            <Route exact path="/" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="/" pageSize={this.pageSize} country="in" category="general"/>} />
            <Route exact path="/health" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/> } />
            <Route exact path="/science" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/> } />
            <Route exact path="/sports" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/> } />
            <Route exact path="/technology" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
            <Route exact path="/general" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize = {this.pageSize} country = "in" category = "general"/>}/>

          </Routes>

      </Router>
      </div>
    )
  }
}
