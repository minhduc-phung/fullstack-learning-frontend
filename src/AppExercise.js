import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import Person from "./components/Person";
import AddForm from "./components/AddForm";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const AppExercise = () => {
  const [persons, setPersons] = useState([]);
  const [searchedPhrase, setSearchedPhrase] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);

  const toggleDeleteOf = (id) => {
    const person = persons.find((p) => p.id === id);
    const result = window.confirm(`Delete ${person.name} from the phonebook?`);
    if (result) {
      phonebookService.del(id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchedPhrase(event.target.value);
  };
  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchedPhrase)
  );
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    let exist = false;
    persons.every((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        exist = true;
        return false;
      }
      return true;
    });
    if (!exist) {
      phonebookService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotifMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotifMessage(null);
        }, 3000);
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <SearchInput value={searchedPhrase} onChange={handleSearchChange} />
      <h3>Add a new person</h3>
      <AddForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person
            key={person.id}
            person={person}
            toggleDelete={() => toggleDeleteOf(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default AppExercise;
