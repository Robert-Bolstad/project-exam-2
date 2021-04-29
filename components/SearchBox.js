import Image from "next/image";

const SearchBox = () => {
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
            />
          </div>
          <div className="searchbox__group-wrapper">
            <div className="searchbox__group">
              <div className="searchbox__group-inner">
                <Image
                  className="searchbox__icon"
                  src="/check-inn.svg"
                  width="30"
                  height="30"
                  alt="logo"
                />
                <div className="searchbox__input-btn">
                  <div className="searchbox__input-btn-text--top">Monday</div>
                  <div className="searchbox__input-btn-text--bottom">
                    1 March
                  </div>
                </div>
              </div>
            </div>
            <div className="searchbox__group">
              <div className="searchbox__group-inner">
                <Image
                  className="searchbox__icon"
                  src="/check-out.svg"
                  width="30"
                  height="30"
                  alt="logo"
                />
                <div className="searchbox__input-btn">
                  <div className="searchbox__input-btn-text--top">Friday</div>
                  <div className="searchbox__input-btn-text--bottom">
                    7 March
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
