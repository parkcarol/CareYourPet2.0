import React from 'react';

const Card = (props) => {
    return (
       <div className="card">
        <div>
           <h1>{props.service}</h1>
           <p>Serviços</p>
           <p>Horário de Funcionamento</p>

        </div>
       </div>
    )
}

export default Card;
