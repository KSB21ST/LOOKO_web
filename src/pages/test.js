import React, { Component } from 'react';

class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>test</li>
            <li>WhatsApp test</li>
            <li>this is a test</li>
          </ul>
        </div>
      );
    }
  }

  export default ShoppingList;