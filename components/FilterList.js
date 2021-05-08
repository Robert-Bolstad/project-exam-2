import Image from "next/image";
const FilterList = () => {
  return (
    <form className="filter-list">
      <div className="filter-list__group-wrapper">
        <div className="filter-list__group">
          <label className="filter-list__label" htmlFor="">
            Max Price
          </label>
          <input
            className="filter-list__input"
            placeholder="0$"
            type="number"
          />
        </div>
      </div>

      <div className="filter-list__group-wrapper">
        <div className="filter-list__group">
          <label className="filter-list__label" htmlFor="filter-list__type">
            Accommodation
          </label>
          <select className="filter-list__type" name="type" type="text">
            <option className="filter-list__option" value="all">
              All
            </option>
            <option className="filter-list__option" value="hotel">
              Hotels
            </option>
            <option className="filter-list__option" value="bb">
              B&#38;Bs
            </option>
            <option className="filter-list__option" value="guesthouse">
              Guesthouses
            </option>
          </select>
        </div>
      </div>

      <div className="filter-list__group-wrapper">
        <button className="filter-list__search">
          <Image src="/search.svg" width="33" height="33" alt="hotel icon" />
          Search
        </button>
      </div>
    </form>
  );
};

export default FilterList;
