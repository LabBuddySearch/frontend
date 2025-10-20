import React from 'react';
import Card from './Card';
import CardMini from './CardMini';

function CardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFF5' }}>
        <Card />
        <CardMini />
    </div>
  );
}

export default CardPage;