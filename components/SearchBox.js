import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const SearchBox = (data) => {
  const dateToday = new Date().toISOString();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateTomorrow = new Date(tomorrow).toISOString();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState({
    checkIn: dateToday.slice(0, 10),
    checkOut: dateTomorrow.slice(0, 10),
    guests: 1,
    search: "",
    id: null,
  });

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

  const handleSearch = (e) => {
    setInputValue({
      ...inputValue,
      search: e.target.innerText,
      id: e.target.value,
    });
    setResults([]);
    setDisableSubmit(false);
  };

  const updateFutureDate = (date) => {
    if (date >= inputValue.checkOut) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      const nextDay = new Date(newDate).toISOString();
      setInputValue({
        ...inputValue,
        checkOut: nextDay.slice(0, 10),
        checkIn: date.slice(0, 10),
      });
    }
  };

  const updatePastDate = (date) => {
    if (date <= inputValue.checkIn) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      const pastDay = new Date(newDate).toISOString();
      setInputValue({
        ...inputValue,
        checkOut: date.slice(0, 10),
        checkIn: pastDay.slice(0, 10),
      });
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      // case "search":
      //   setInputValue({ ...inputValue, name: e.target.value });
      //   break;
      case "checkIn":
        if (e.target.value <= dateToday) {
          setInputValue({ ...inputValue, checkIn: dateToday.slice(0, 10) });
        } else {
          setInputValue({ ...inputValue, checkIn: e.target.value });
          updateFutureDate(e.target.value);
        }

        break;
      case "checkOut":
        if (e.target.value <= dateTomorrow) {
          setInputValue({
            ...inputValue,
            checkOut: dateTomorrow.slice(0, 10),
            checkIn: dateToday.slice(0, 10),
          });
        } else {
          setInputValue({ ...inputValue, checkOut: e.target.value });
          updatePastDate(e.target.value);
        }

        break;
      case "guests":
        setInputValue({ ...inputValue, guests: e.target.value });

        break;
      case "search":
        setInputValue({ ...inputValue, search: e.target.value });
        setDisableSubmit(true);
        search(e.target.value);
        break;
      default:
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    localStorage.setItem("booking-details", JSON.stringify(inputValue));
    router.push("/detail/" + inputValue.id);
  };
  return (
    <form className="searchbox__form" onSubmit={(e) => e.preventDefault()}>
      <fieldset className="searchbox__fieldset" disabled={submitting}>
        <div className="searchbox__wrapper">
          <div className="searchbox__group searchbox__group--search">
            <div>
              <input
                className="searchbox__search searchbox__input"
                type="search"
                name="search"
                autoComplete="off"
                value={inputValue.search}
                placeholder="Enter name of the hotel, B&amp;B or guesthouses"
                onChange={(e) => handleInputChange(e)}
              />
              <ul className="searchbox__results">
                {results.map((result) => {
                  return (
                    <li key={result.id} className="searchbox__search-result">
                      <button
                        className="searchbox__result-btn"
                        type="button"
                        value={result.id}
                        onClick={(e) => handleSearch(e)}
                      >
                        {result.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="searchbox__group searchbox__group--check-in">
            <span className="searchbox__group-type">Check In</span>
            <div>
              <img className="searchbox__img" src="/check-In.svg" alt="icon" />
              <input
                className="searchbox__check-in searchbox__input"
                type="date"
                name="checkIn"
                value={inputValue.checkIn}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className="searchbox__group searchbox__group--check-out">
            <span className="searchbox__group-type">Check Out</span>
            <div className="searchbox__input-wrapper">
              <img className="searchbox__img" src="/check-out.svg" alt="icon" />
              <input
                name="checkOut"
                className="searchbox__check-out searchbox__input"
                type="date"
                value={inputValue.checkOut}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className="searchbox__group searchbox__group--guests">
            <span className="searchbox__group-type">Guests</span>
            <div className="searchbox__input-wrapper">
              <img className="searchbox__img" src="/user.svg" alt="icon" />
              <input
                className="searchbox__input"
                type="number"
                name="guests"
                min="1"
                max="50"
                value={inputValue.guests}
                onChange={(e) => handleInputChange(e)}
                placeholder="1"
              />
            </div>
          </div>
          <div className="searchbox__group searchbox__group--btn">
            <div className="searchbox__btn-wrapper">
              <button
                disabled={disableSubmit}
                type="submit"
                className="searchbox__submit"
                onClick={handleSubmit}
                style={
                  disableSubmit
                    ? { opacity: "0.4", cursor: "not-allowed" }
                    : null
                }
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default SearchBox;
