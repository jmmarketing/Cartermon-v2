export const buttonComponent = (config = {}) => {
  let {
    use = "nav",
    path = null,
    color = "yellow",
    text = "⚠ No Text",
    type = "",
  } = config;

  if (type !== "game") {
    type = "nav";
    return `
 <a
    href="${path ?? "/signup"}"
    type="${type}"
    data-nav="${path ?? "/signup"}"
    class="btn btn-${use} btn-nav--${color}">
    ${text}
</a>
`;
  }
};
