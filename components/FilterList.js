import { useState, useEffect } from "react";

const FilterList = ({ filterResults }) => {
  const [filterData, setFilterData] = useState();
  const [inputValue, setInputValue] = useState({
    price: "",
    accommodations: "all",
  });

  useEffect(() => {
    const storageData = JSON.parse(
      localStorage.getItem("filter-accommodations")
    );
    if (storageData) {
      setFilterData({ ...filterData, price: 0, accommodations: storageData });
      setInputValue({ ...inputValue, accommodations: storageData });
    }
  }, []);

  useEffect(() => {
    if (filterData) {
      filterResults(filterData);
      localStorage.removeItem("filter-accommodations");
      setFilterData(null);
    }
  }, [filterData]);

  function handleInputChange(e) {
    switch (e.target.name) {
      case "price":
        setInputValue({ ...inputValue, price: e.target.value });
        break;
      case "category":
        setInputValue({ ...inputValue, accommodations: e.target.value });
        break;
      default:
    }
  }

  return (
    <form className="filter-list">
      <div className="filter-list__group-wrapper">
        <div className="filter-list__group">
          <label className="filter-list__label" htmlFor="">
            Max Price
          </label>
          <input
            name="price"
            min="0"
            className="filter-list__input"
            type="number"
            placeholder="0"
            value={inputValue.price}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="filter-list__group-wrapper">
        <div className="filter-list__group">
          <label className="filter-list__label" htmlFor="filter-list__type">
            Accommodation
          </label>
          <select
            className="filter-list__type"
            name="category"
            type="text"
            value={inputValue.accommodations}
            onChange={handleInputChange}
          >
            <option className="filter-list__option" value="all">
              All
            </option>
            <option className="filter-list__option" value="hotel">
              Hotels
            </option>
            <option className="filter-list__option" value="bed_and_breakfast">
              B&#38;Bs
            </option>
            <option className="filter-list__option" value="guesthouse">
              Guesthouses
            </option>
          </select>
        </div>
      </div>

      <div className="filter-list__group-wrapper">
        <button
          type="button"
          className="filter-list__search"
          onClick={() => filterResults(inputValue)}
        >
          <img src="/search.svg" width="33" height="33" alt="hotel icon" />
          Search
        </button>
      </div>
    </form>
  );
};

export default FilterList;
