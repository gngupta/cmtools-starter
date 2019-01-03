export default {
  setCategories: ({
    commit
  }, categories) => {
    const dataBySlug = obtainDataBySlug(categories);
    commit('SET_DATA_BY_SLUG', dataBySlug);
  }
}

//Method to save the category data with the slug as the key in the vuex store
function obtainDataBySlug(categories) {
  const dataBySlug = {};
  if (Array.isArray(categories)) {
    categories.forEach(({
      id,
      slug,
      children,
    }) => {
      dataBySlug[slug] = ({
        id
      });
      Object.assign(dataBySlug, obtainDataBySlug(children));
    });
  }
  return dataBySlug;
}