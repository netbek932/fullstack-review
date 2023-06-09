import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      // success: function(data) {
      //   console.log('Successful GET request!')
      //   var fetchedData = JSON.parse(data);
      //   console.log(fetchedData)
      //   this.setState({repos: fetchedData})
      // }
    })
    .then((data) => {
      var fetchedData = JSON.parse(data);
        this.setState({repos: fetchedData})
        console.log(this.state.repos);
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: {
        user: term
      }
    })
    .then((data) => {
      this.fetchData();
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));