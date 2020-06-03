import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [{
      id: 1,
      name: 'Carley',
      age: 29
    }, {
      id: 2,
      name: 'Matt',
      age: 28
    }, {
      id: 3,
      name: 'Susie',
      age: 58
    }],
    otherState: 'some other value',
    showPersons: false
  };

  namedChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  };

  deletePersonHandler = index => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);

    this.setState({ persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render () {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          { 
            this.state.persons.map((person, index) => {
              return <Person
                key = { person.id }
                click = { () => this.deletePersonHandler(index) }
                name = { person.name }
                age = { person.age }
                changed = { event => this.namedChangedHandler(event, person.id) } />
            })
          }
        </div>
      );
    };

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="app">
        <h1>Hi, I am a React App</h1>
        <p className = { classes.join(' ') }>This is really working!</p>
        <button className = 'button' onClick = { this.togglePersonsHandler }> 
          Toggle Names 
        </button>
        { persons }
      </div>
    );
  }
}

export default App;
