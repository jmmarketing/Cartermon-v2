export function formatID(id) {
  let formattedID;

  if (id < 10) {
    formattedID = `00${id}`;
  } else if (id >= 10 && id <= 99) {
    formattedID = `0${id}`;
  } else {
    formattedID = id;
  }

  return formattedID;
}
