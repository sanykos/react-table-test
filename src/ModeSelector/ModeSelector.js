import React from 'react'

const ModeSelector = ({onSelect}) => {

    const smallUrl = 'https://filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    
    const bigUrl = 'https://filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

    return (
        <div style={{display:'flex', justifyContent:'center', padding: '50px 0'}}>
            <button onClick={() => onSelect(smallUrl)} className="btn btn-primary">32 элемента</button>
            <button onClick={() => onSelect(bigUrl)} className="btn btn-secondary">1000 элементов</button>
        </div>
    )
}

export default ModeSelector;