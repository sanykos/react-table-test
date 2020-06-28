import React from 'react'

export default ({person}) => (
    <div>
        <p> Выбран пользователь <strong>{person.firstName + ' ' + person.lastName}</strong></p>   
       <p>
       Описание: <br/>
        <textarea defaultValue={person.description}/>
       </p>
<p>Адрес проживания: <strong>{person.address.city}</strong></p>
       <p>Город: <strong>{person.address.state}</strong></p>
       <p>Провинция/штат: <strong>{person.address.streetAddress}</strong></p>
       <p>Индекс: <strong>{person.address.zip}</strong></p>
    </div>
)