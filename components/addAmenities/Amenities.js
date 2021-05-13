function Amenities({ item, removeItem }) {
  function handleRemoveClick() {
    removeItem(item.id);
  }
  return (
    <div>
      <li>{item.task}</li>
      <button onClick={handleRemoveClick}>X</button>
    </div>
  );
}

export default Amenities;
