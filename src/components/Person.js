const Person = ({ person, toggleDelete }) => {
  const label = "Delete";
  return (
    <li>
      {person.name} - {person.number}
      <button onClick={toggleDelete}>{label}</button>
    </li>
  );
};

export default Person;
