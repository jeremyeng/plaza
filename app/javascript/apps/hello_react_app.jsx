import React from "react";
import PropTypes from "prop-types";

export const HelloApp = (props) => (
  <div className="font-sans bg-white h-screen flex flex-col w-full">
    <div className="h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="px-4 py-48">
        <div className="relative w-full text-center">
          <h1 className="pulsing-text">
            Hello {props.name}, Your TailwindCSS setup is working if this pulses...
          </h1>
        </div>
      </div>
    </div>
  </div>
);

HelloApp.defaultProps = {
  name: "Jeremy",
};

HelloApp.propTypes = {
  name: PropTypes.string,
};
