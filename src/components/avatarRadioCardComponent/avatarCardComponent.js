export const avatarCardComponent = (data) => {
  const [id, value] = data;
  return `<div class="avatar-card">
        <input
            type="radio"
            id="${id}"
            value="${id}"
            name="Avatar Selection"
         />
        <label for="${id}">
            <img
              class="avatar-card__img"
              src="${value}"
              alt="Avatar ${id}"
            />
        </label>
    </div>`;
};
