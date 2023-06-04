export const findById = (resources, id) => {
  if (!resources) return null;

  return resources.find((item) => item.id === id);
}

export const upsert = (resources, resource) => {
  const index = resources.findIndex((item) => item.id === resource.id);

  if (index === -1) {
    resources.push(resource);
  } else {
    resources[index] = resource;
  }
}
