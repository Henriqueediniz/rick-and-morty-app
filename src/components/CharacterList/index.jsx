import React, {Component} from 'react';
import axios from 'axios';
import './character-list.css';
import '../Character'
import Character from '../Character';
import CharacterInfo from '../CharacterInfo';
import Modal from 'react-awesome-modal';

const API_URL = 'https://rickandmortyapi.com/api';

class CharacterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectCharacter: false,
      characters: [],
      selectedCharacter: {},
      visible: false,
    }

    this.showDetails = this.showDetails.bind(this);
  }

  openModal() {
    this.setState({
        visible : true
    });
}

  closeModal() {
    this.setState({
        visible : false
    });
}

  async componentDidMount() {
    try {
      this.setState({
        loading: true,
      });

      const page = Math.floor(Math.random() * 20) + 1;

      const response = await axios.get(`${API_URL}/character/?page=${page}`);
      const { results } = response.data;

      this.setState({
        loading: false,
        characters: results
      });
    } catch (err) {
      console.log(err);
    }
  }

  async showDetails(id) {
    const response = await axios.get(`${API_URL}/character/${id}`);
    const selectedCharacter = response.data;

    this.setState({
      selectedCharacter,
    });

    
  }

  renderCharacters() {
    const { characters } = this.state;

    
    return characters.map(character => (
      <Character
        key={character.id}
        character={character}
        showDetails={this.showDetails}
      />
    )
    );

  }

  renderSelectedCharacter() {
  
    const { selectedCharacter } = this.state;

    if (!selectedCharacter.id) {
      return <div />;
    }
    
    return (
      
      <section >
    
      <Modal visible={this.state.visible} 
             effect="fadeInUp" 
             onClickAway={() => this.closeModal()}
             >
          <div>
              <CharacterInfo character={selectedCharacter}/>
              <input type="button" value="Close" onClick={() => this.closeModal()}/>
          </div>
      </Modal>
      </section>
    
    );
  }
  
  render() {
    return (
      <section >
      <div className="character-list">
        <ul>
          {this.renderCharacters()}    
        </ul>
      </div>
    
      </section>


    )
  }
}

export default CharacterList;
