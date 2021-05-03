import Image from "next/image";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const SearchBox = (data) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [results, setResults] = useState([]);

  const search = (value) => {
    const filteredResults = data.data.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
    if (value.length < 1) {
      setResults([]);
    } else {
      setResults(filteredResults);
    }
  };

  return (
    <section className="searchbox">
      <div className="searchbox__wrapper">
        <div className="searchbox__intro">
          <h1 className="searchbox__heading">Accommodations in Bergen</h1>
          <p className="searchbox__subline">
            Find hotels, B&amp;Bs and guesthouses in bergen
          </p>
        </div>
        <form className="searchbox__form">
          <div className="searchbox__input-wrapper">
            <i className="searchbox__icon--house">
              <Image src="/house.svg" width="28" height="28" alt="logo" />
            </i>
            <input
              type="text"
              className="searchbox__input"
              placeholder="Enter name of hotel, B&amp;B or guesthouses"
              onChange={(e) => search(e.target.value)}
            />
            <ul className="searchbox__search-list">
              {results.map((result) => {
                return (
                  <li key={result.id} className="searchbox__search-result">
                    {result.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="searchbox__group-wrapper">
            <div className="searchbox__group">
              <div className="searchbox__group-inner searchbox__checkin">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <Image
                  className="searchbox__icon"
                  src="/check-inn.svg"
                  width="30"
                  height="30"
                  alt="logo"
                />
                <div className="searchbox__input-btn">
                  <div className="searchbox__input-btn-text--top">
                    {startDate.toDateString().slice(0, 3)}
                  </div>
                  <div className="searchbox__input-btn-text--bottom">
                    {startDate.toDateString().slice(4, 10)}
                  </div>
                </div>
              </div>
            </div>
            <div className="searchbox__group">
              <div className="searchbox__group-inner searchbox__checkout">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
                <Image
                  className="searchbox__icon"
                  src="/check-out.svg"
                  width="30"
                  height="30"
                  alt="logo"
                />
                <div className="searchbox__input-btn">
                  <div className="searchbox__input-btn-text--top">
                    {endDate.toDateString().slice(0, 3)}
                  </div>
                  <div className="searchbox__input-btn-text--bottom">
                    {endDate.toDateString().slice(4, 10)}
                  </div>
                </div>
              </div>
            </div>
            <div className="searchbox__group">
              <div className="searchbox__group-inner">
                <Image
                  className="searchbox__icon"
                  src="/user.svg"
                  width="30"
                  height="30"
                  alt="logo"
                />
                <div className="searchbox__input-btn">
                  <div className="searchbox__input-btn-text--top">Guests</div>
                  <div className="searchbox__input-btn-text--bottom">1</div>
                </div>
              </div>
            </div>
            <button className="searchbox__submit">
              <Image
                className="searchbox__icon"
                src="/search.svg"
                width="26"
                height="26"
                alt="logo"
              />
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBox;
