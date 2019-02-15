import React, {Component} from 'react';

class Character extends Component {
  openModal() {
    this.setState({
        visible : true
    });
}

  render() {
    const {
      character,
      showDetails,
    } = this.props;

    return (
      <li key={character.id} onClick={event => showDetails(character.id)}>
        <img src={character.image} alt={character.name}/>
        <p>{character.name}</p>
      </li>
    )
  }
}

export default Character;
