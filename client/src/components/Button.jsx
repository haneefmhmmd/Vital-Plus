import PropTypes from "prop-types";
import React from "react";

export default function Button({
  variant,
  size,
  label,
  classNames,
  imgLeft,
  elementType,
  href,
  onClick,
}) {
  const btnVariant =
    variant === "rounded"
      ? "v-btn--rounded"
      : variant === "primary"
      ? "v-btn--primary"
      : "v-btn--secondary";
  const btnSize =
    size === "sm" ? "v-btn--sm" : size === "lg" ? "v-btn--lg" : "v-btn--md";

  const Element = elementType || "button";

  return (
    <Element
      href={elementType === "a" ? href : null}
      className={`v-btn ${btnVariant} ${btnSize} ${classNames}`.trim()}
      onClick={onClick}
    >
      {variant === "rounded" && { imgLeft }}
      {variant !== "rounded" && <span className="btn__label">{label}</span>}
    </Element>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classNames: PropTypes.string,
  imgLeft: PropTypes.node,
  elementType: PropTypes.oneOf(["button", "a"]),
  href: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
  classNames: "",
  imgLeft: null,
  elementType: "button",
  href: "",
};
