import React from 'react'

export default props => {
    return (<table className="table">
         <thead>
            <tr>
                <th>id</th>
                <th>firstName</th>
                <th>lastName </th>
                <th>email</th>
                <th>phone</th>
            </tr>
        </thead>
        <tbody>
            {
                props.data.map(item => (
                    <tr key={item.id}>
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