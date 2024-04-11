import PropTypes from "prop-types";
import React from "react";

export default function Button({ variant, size, label, classNames, imgLeft }) {
  const btnVariant =
    variant === "rounded"
      ? "v-btn--rounded"
      : variant === "primary"
      ? "v-btn--primary"
      : "v-btn--secondary";
  const btnSize =
    size === "sm" ? "v-btn--sm" : size === "lg" ? "v-btn--lg" : "v-btn--md";

  return (
    <button className={`v-btn ${btnVariant} ${btnSize} ${classNames}`.trim()}>
      {variant === "rounded" && { imgLeft }}
      {variant !== "rounded" && <span className="btn__label">{label}</span>}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classNames: PropTypes.string,
  imgLeft: PropTypes.node,
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
  classNames: "",
  imgLeft: null,
};
