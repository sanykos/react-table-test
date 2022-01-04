import React, {useState} from 'react';
import {orderBy, chunk} from 'lodash'
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader'
import Table from './Table/Table'
import DetailRowView from './DetailRowView/DetailRowView'
import ModeSelector from './ModeSelector/ModeSelector'
import TableSearch from './TableSearch/TableSearch'
import './App.css';




const App = () => {
  const [isModeSelected, setIsModeSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('asc');
  const [sortField, setSortField] = useState('id');
  const [row, setRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  

// Ждем когда сформируется дом дерево
  const fetchData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    const orderData = orderBy(data, sortField, sort);
    setIsLoading(false);
    setData(orderData);
  }

  const onSort  = sortField =>  {
    const clonedData = data.concat()
    const sortType = sort === 'asc' ? 'desc' : 'asc'

    const dataOrder = orderBy(clonedData, sortField, sortType);
    setSort(sort);
    setData(dataOrder);
    setSortField(sortField);
  }

  const modeSelectHandler = (url) => {
    setIsLoading(true);
    setIsModeSelected(true);
    fetchData(url)
  }

  const onRowSelect = row => {
    setRow(row)
  }


  const pageChangeHandler = ({selected}) => {
    setCurrentPage(selected)
  }

  const searchHandler = search => {
    setSearch(search)
    setCurrentPage(0);
  }

  const getFilteredData = () => {
    if(!search) {
      return data
    }

    return data.filter(item => item['firstName'].toLowerCase().includes(search.toLowerCase()))
  }

  const pageSize = 50;

  const filteredData = getFilteredData()
  const pageCount = Math.ceil(filteredData.length / pageSize)

  const displayData = chunk(filteredData, pageSize)[currentPage];


  return (
    <>
        {!isModeSelected && (<div className="container">
          <ModeSelector onSelect={modeSelectHandler}/>
        </div>)}
        <div className="container">
          {isLoading 
          ? <Loader /> 
          : <> 
            <TableSearch onSearch={searchHandler}/>
            <Table data={displayData} 
                  onSort={onSort}
                  sort={sort}
                  sortField={sortField}
                  onRowSelect={onRowSelect}/>
            </>}
            {data.length > pageSize 
              && <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pageChangeHandler}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              nextClassName={'next-item'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              forcePage	={currentPage}
            />
          }
          {
          row && <DetailRowView person={row} />
        }
        </div>
    </>
  )
}

export default App;
