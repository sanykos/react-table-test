import React from 'react'


export default ({onSort, data, sort, sortField, onRowSelect }) => {
    return (<table className="table">
         <thead>
            <tr>
                <th onClick={onSort.bind(null, 'id')}>id
                {sortField === 'id' ? <sup>{sort}</sup>: null}
                </th>
                <th onClick={onSort.bind(null, 'firstName')}>firstName
                {sortField === 'firstName' ? <sup>{sort}</sup>: null}
                </th>
                <th onClick={onSort.bind(null, 'lastName')}>lastName 
                {sortField === 'lastName' ? <sup>{sort}</sup>: null}
                </th>
                <th onClick={onSort.bind(null, 'email')}>email
                {sortField === 'email' ? <sup>{sort}</sup>: null}
                </th>
                <th onClick={onSort.bind(null, 'phone')}>phone
                {sortField === 'phone' ? <sup>{sort}</sup>: null}
                </th>
            </tr>
        </thead>
        <tbody>
            {
                data?.map(item => (
                    <tr key={item.id+item.phone} onClick={onRowSelect.bind(null, item)}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    )
}