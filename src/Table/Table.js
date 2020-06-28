import React from 'react'


export default props => {
    return (<table className="table">
         <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>id
                {props.sortField === 'id' ? <sup>{props.sort}</sup>: null}
                </th>
                <th onClick={props.onSort.bind(null, 'firstName')}>firstName
                {props.sortField === 'firstName' ? <sup>{props.sort}</sup>: null}
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>lastName 
                {props.sortField === 'lastName' ? <sup>{props.sort}</sup>: null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>email
                {props.sortField === 'email' ? <sup>{props.sort}</sup>: null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>phone
                {props.sortField === 'phone' ? <sup>{props.sort}</sup>: null}
                </th>
            </tr>
        </thead>
        <tbody>
            {
                props.data.map(item => (
                    <tr key={item.id+item.phone}>
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