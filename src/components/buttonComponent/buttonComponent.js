export const buttonComponent = (config = {}) => {
  let {
    use = "nav",
    path = "",
    color = "yellow",
    text = "⚠ No Text",
    type = "",
  } = config;

  // if (use !== "game" || type !== "submit") {
  //   type = "nav";
  // }

  //Re: nullish below. Not sure I absolutely need to use it when compiling a button.

  if (!path) {
    return `
 <a
    type="${type}"
    class="btn btn-${use} btn-nav--${color}">
    ${text}
</a>
`;
  } else {
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
