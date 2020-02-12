import React from "react";
import { connect } from "react-redux";
import { setFavorite, deleteFavorite } from "../actions";
import PropTypes from "prop-types";
import "../assets/styles/components/CarouselItem.scss";
import playIcon from "../assets/static/play-icon.png";
import plusIcon from "../assets/static/plus-icon.png";
import removeIcon from "../assets/static/remove-icon.png";

const CarouselItem = props => {
  const {
    id,
    cover,
    title,
    year,
    contentRating,
    duration,
    myList,
    isList
  } = props;
  const handleSetFavorite = () => {
    const exist = myList.find(item => item.id == id);
    if (exist) {
      alert("Este video ya esta agregado a tus favoritos");
    } else
      props.setFavorite({
        id,
        cover,
        title,
        year,
        contentRating,
        duration
      });
  };

  const handleDeleteFavorite = itemId => {
    props.deleteFavorite(itemId);
  };

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <img
            className="carousel-item__details--img"
            src={playIcon}
            alt="Play Icon"
          />
          {isList ? (
            <img
              className="carousel-item__details--img"
              src={plusIcon}
              alt="Plus Icon"
              onClick={handleSetFavorite}
            />
          ) : (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Remove Icon"
              onClick={() => handleDeleteFavorite(id)}
            />
          )}
        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">
          {`${year} ${contentRating} ${duration} min`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number
};

const mapStateToProps = state => {
  return {
    myList: state.myList
  };
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
