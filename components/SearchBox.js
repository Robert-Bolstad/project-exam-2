import Image from "next/image";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";

const SearchBox = (data) => {
  const [searchValue, setSearchValue] = useState();
  const [searcSelected, setSearchSelected] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [results, setResults] = useState([]);
  const [searchData, setSearchData] = useState(null);

  const router = useRouter();

  const LOCAL_STORAGE_KEY = "booking-data";

  useEffect(() => {
    if (hotelId) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(searchData));
      router.push(`/detail/${hotelId}`);
    }
  }, [searchData]);

  useEffect(() => {
    if (searcSelected === true) {
      const list = document.querySelector(".searchbox__search-list");
      list.style.display = "none";
    } else {
      const list = document.querySelector(".searchbox__search-list");
      list.style.display = "block";
    }
  }, [searcSelected]);

  const handleSelectedValue = (e, target) => {
    e.preventDefault();
    const key = target.value;
    setSearchValue(target.innerText);
    setSearchSelected(true);
    setHotelId(key);
  };

  const handleGuests = (value) => {
    switch (value) {
      case 0:
        setGuests(1);
        break;
      case "":
        setGuests(1);
        break;
      default:
        setGuests(value);
    }
    if (value > 50) {
      setGuests(50);
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchData({
      checkIn: startDate,
      checkOut: endDate,
      guests: guests,
    });
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
              value={searchValue}
              placeholder="Enter name of hotel, B&amp;B or guesthouses"
              onChange={(e) => search(e.target.value)}
            />
            <ul className="searchbox__search-list">
              {results.map((result) => {
                return (
                  <li key={result.id} className="searchbox__search-result">
                    <button
                      value={result.id}
                      onClick={(e) => handleSelectedValue(e, e.target)}
                    >
                      {result.name}
                    </button>
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
                <Image src="/check-inn.svg" width="30" height="30" alt="logo" />
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
                  <input
                    className="searchbox__input-number"
                    type="number"
                    name="guests"
                    min="1"
                    max="50"
                    value={guests}
                    onChange={(e) => handleGuests(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="searchbox__submit"
            >
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
