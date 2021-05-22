export const checkMinAmenities = (amenities, submitting) => {
  if (amenities.length < 3 && submitting === true) {
    return (
      <p className="AddAmenities__error-message">
        <span className="AddAmenities__error-message--asterisks">{"* "}</span>
        You must at least have three amenities
      </p>
    );
  } else {
    return false;
  }
};

export const checkMaxAmenities = (amenities, submitting) => {
  if (amenities.length > 15 && submitting === true) {
    return (
      <p className="AddAmenities__error-message">
        <span className="AddAmenities__error-message--asterisks">{"* "}</span>
        15 is the maximum amount of amenities allowed
      </p>
    );
  } else {
    return false;
  }
};

export const checkMinFeatured = (amenities, submitting) => {
  const featured = amenities.filter((selected) => selected.selected === true);
  if (amenities.length >= 3 && submitting === true && featured.length < 3) {
    return (
      <p className="AddAmenities__error-message">
        <span className="AddAmenities__error-message--asterisks">{"* "}</span>
        You must select three main Amenities
      </p>
    );
  } else {
    return false;
  }
};

export const checkMaxFeatured = (amenities, submitting) => {
  const featured = amenities.filter((selected) => selected.selected === true);
  if (amenities.length >= 3 && submitting === true && featured.length > 3) {
    return (
      <p className="AddAmenities__error-message">
        <span className="AddAmenities__error-message--asterisks">{"* "}</span>
        You can only select three main amenities
      </p>
    );
  } else {
    return false;
  }
};
