import React, {Component} from 'react';
import Loader from './Loader/Loader'
import Table from './Table/Table'
import './App.css';


class App extends Component {

  state = {
    isLoading: true,
    data: []
  }

// Ждем когда сформируется дом дерево
  async componentDidMount() {
    const response = await fetch(`http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`)
    const data = await response.json()
   // console.log(data)
   this.setState({
     isLoading: false,
     data: data
   })
  }

  render() {
    return(
      <div className="container">
        <h1>Start</h1>
        {
          this.state.isLoading 
          ? <Loader />
          : <Table data={this.state.data}/>
        }
      </div>
    )
  }
}

export default App;
