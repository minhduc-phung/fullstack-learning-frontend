const AddForm = (props) => {
  const {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    addPerson,
  } = props;
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddForm;
