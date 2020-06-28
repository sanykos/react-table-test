import React, {Component} from 'react';
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader'
import Table from './Table/Table'
import DetailRowView from './DetailRowView/DetailRowView'
import ModeSelector from './ModeSelector/ModeSelector'
import TableSearch from './TableSearch/TableSearch'
import './App.css';


class App extends Component {

  state = {
    isModeSelected: false,
    isLoading: false,
    search: '',
    data: [],
    sort: 'asc',
    sortField: 'id',
    row: null,
    currentPage: 0
  }

// Ждем когда сформируется дом дерево
  async fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
   // console.log(data)
   this.setState({
     isLoading: false,
     data: _.orderBy(data, this.state.sortField, this.state.sort)
   })
  }

  onSort  = sortField =>  {
    const clonedData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'

    const data = _.orderBy(clonedData, sortField, sort)
    this.setState({
      data: data,
      sort: sort,
      sortField: sortField
    })
    //console.log(field)
  }

  modeSelectHandler = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    })

    this.fetchData(url)
  }

  onRowSelect = row => {
    this.setState({row})
  }

  pageChangeHandler = ({selected}) => {
    this.setState({currentPage: selected})
  }

  searchHandler = search => {
    this.setState({search, currentPage:0})
  }

  getFilteredData() {
    const  {data, search} = this.state

    if(!search) {
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
    })

  }

  render() {

    const pageSize = 50

    if(!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }
     
    //debugger

    const filteredData = this.getFilteredData()
    const pageCount = Math.ceil(filteredData.length / pageSize)

    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]

    return(
      <div className="container">
        {
          this.state.isLoading 
          ? <Loader />
          : <React.Fragment>
              <TableSearch onSearch={this.searchHandler}/>
              <Table data={displayData} 
                    onSort={this.onSort}
                    sort={this.state.sort}
                    sortField={this.state.sortField}
                    onRowSelect={this.onRowSelect}/>
            </React.Fragment>
        }

        {
          this.state.data.length > pageSize
          ?
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              nextClassName={'next-item'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              forcePage	={this.state.currentPage}
            />
          : null
        }

        {
          this.state.row 
          ? <DetailRowView person={this.state.row} />
          : null
        }
      </div>
    )
  }
}

export default App;
