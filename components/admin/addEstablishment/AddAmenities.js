import AmenitiesList from "../addAmenities/AmenitiesList";
import AmenitiesForm from "../addAmenities/AmenitiesForm";
import { useState, useEffect } from "react";
import {
  checkMinFeatured,
  checkMaxFeatured,
  checkMinAmenities,
  checkMaxAmenities,
} from "../../../utils/validators/amenitiesValidator";

const AddAmenities = ({ editData, getAmenities }) => {
  const [mainAmenities, setMainAmenities] = useState([]);
  const [familyAmenities, setFamilyAmenities] = useState([]);
  const [areaAmenities, setAreaAmenities] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(true);
  const [page, setPage] = useState(true);

  useEffect(() => {
    if (error === false) {
      getAmenities([mainAmenities, familyAmenities, areaAmenities]);
    }
  }, [error]);

  useEffect(() => {
    if (submitting) {
      const error = [
        checkMinAmenities(mainAmenities, submitting),
        checkMaxAmenities(mainAmenities, submitting),
        checkMinFeatured(mainAmenities, submitting),
        checkMaxFeatured(mainAmenities, submitting),
        checkMinAmenities(familyAmenities, submitting),
        checkMaxAmenities(familyAmenities, submitting),
        checkMinAmenities(areaAmenities, submitting),
        checkMaxAmenities(areaAmenities, submitting),
      ];
      if (
        error[0] === false &&
        error[1] === false &&
        error[2] === false &&
        error[3] === false &&
        error[4] === false &&
        error[5] === false &&
        error[6] === false &&
        error[7] === false
      ) {
        setError(false);
      }
    }
  }, [page]);

  function addMainAmenities(amenities) {
    setMainAmenities([amenities, ...mainAmenities]);
  }
  function addFamilyAmenities(amenities) {
    setFamilyAmenities([amenities, ...familyAmenities]);
  }
  function addAreaAmenities(amenities) {
    setAreaAmenities([amenities, ...areaAmenities]);
  }

  function removeMainAmenities(id) {
    setMainAmenities(mainAmenities.filter((item) => item.id !== id));
  }

  function removeFamilyAmenities(id) {
    setFamilyAmenities(familyAmenities.filter((item) => item.id !== id));
  }

  function removeAreaAmenities(id) {
    setAreaAmenities(areaAmenities.filter((item) => item.id !== id));
  }

  const handleSubmit = () => {
    setSubmitting(true);
    setPage(Math.random());
  };

  const toggleFeatured = (id) => {
    setMainAmenities(
      mainAmenities.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (editData) {
      let main = [];
      let families = [];
      let area = [];
      editData.amenities.main.forEach((item) => {
        main.push({ amenitie: item, id: Math.random() });
      });
      editData.amenities.families.forEach((item) => {
        families.push({ amenitie: item, id: Math.random() });
      });
      editData.amenities.main.forEach((item) => {
        area.push({ amenitie: item, id: Math.random() });
      });
      setMainAmenities(main);
      setFamilyAmenities(families);
      setAreaAmenities(area);
    }
  }, []);

  return (
    <div className="AddAmenities">
      <form className="AddAmenities__form">
        <fieldset className="AddAmenities__fieldset">
          <h2 className="AddAmenities__heading">Add Amenities</h2>
          <p className="AddAmenities__description">
            Add at least 3 amenities of each category you would want to display
            on your establishment page. Remember to select three of your main
            amenities you would want to highlight
          </p>
          <div className="AddAmenities__wrapper-amenities">
            <div className="AddAmenities__group">
              <h3 className="AddAmenities__subheading">Main Amenities</h3>
              <AmenitiesForm
                addItem={addMainAmenities}
                placeholderText="Free Wifi, Parking Included, Breakfast included."
              />
              <AmenitiesList
                amenities={mainAmenities}
                removeItem={removeMainAmenities}
                toggleFeatured={toggleFeatured}
              />
              {checkMinAmenities(mainAmenities, submitting)}
              {checkMaxAmenities(mainAmenities, submitting)}
              {checkMinFeatured(mainAmenities, submitting)}
              {checkMaxFeatured(mainAmenities, submitting)}
            </div>
            <div className="AddAmenities__group">
              <h3 className="AddAmenities__subheading">For Families</h3>
              <AmenitiesForm
                addItem={addFamilyAmenities}
                placeholderText="Television, Daily housekeeping, Laundry facilities etc."
              />
              <AmenitiesList
                amenities={familyAmenities}
                removeItem={removeFamilyAmenities}
              />
              {checkMinAmenities(familyAmenities, submitting)}
              {checkMaxAmenities(familyAmenities, submitting)}
            </div>
            <div className="AddAmenities__group">
              <h3 className="AddAmenities__subheading">
                Amenities in the area
              </h3>
              <AmenitiesForm
                addItem={addAreaAmenities}
                placeholderText="Parks, Shops, Malls, Hiking area etc."
              />
              <AmenitiesList
                amenities={areaAmenities}
                removeItem={removeAreaAmenities}
              />
              {checkMinAmenities(areaAmenities, submitting)}
              {checkMaxAmenities(areaAmenities, submitting)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="AddAmenities__submit"
          ></button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddAmenities;
