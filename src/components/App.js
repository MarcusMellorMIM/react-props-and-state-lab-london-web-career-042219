import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState( {filters:{ type:event.target.value }})
  }

  onFindPetsClick = () => {
    // Fetch the pets into state.pets

    let url = this.state.filters.type==='all' ? '/api/pets' : '/api/pets?type=' + this.state.filters.type

   fetch(url)
    .then( data => data.json())
    .then( data => this.setState({pets:data}) )

  }

  adoptPet = (event,id) => {
    let petIndex = this.state.pets.findIndex(pet => pet.id===id)
    let petArray = [...this.state.pets];
    petArray[petIndex].isAdopted=true;
    this.setState( { pets:petArray });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
