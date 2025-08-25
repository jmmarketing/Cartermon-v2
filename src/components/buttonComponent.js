export const buttonComponent = (config = {}) => {
  let {
    type = "nav",
    path = null,
    color = "yellow",
    text = "⚠ No Text",
  } = config;

  if (type !== "game") {
    type = "nav";
    return `
 <a
    href="${path ?? "/signup"}"
    data-nav="${path ?? "/signup"}"
    class="btn btn-${type} btn-nav--${color}">
    ${text}
</a>
`;
  }
};
