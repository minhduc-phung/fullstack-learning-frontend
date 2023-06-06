const SeachInput = ({ value, onChange }) => {
  return (
    <div>
      <h3>Search</h3>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default SeachInput;
