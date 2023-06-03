export const findById = (resources, id) => {
  return resources.find((item) => item.id === id);
}
