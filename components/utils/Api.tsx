import axios from "axios";

const listApi = axios.create({
  baseURL: `https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta`,
});

const getPlants = (plantCategory:string | null, searchQuery:string) => {
    if (plantCategory === '') plantCategory = null
        return listApi
      .get(`/plants`, {
        params: {
          category: plantCategory,
          search: searchQuery
        }
      })
      .then(({ data }) => {
          //console.log(data)
        return data;
      });
  };

  const getSinglePlant = (plantCommonName:string) => {
    console.log(plantCommonName)
    return listApi
  .get(`/plants/${plantCommonName}`, )
  .then(({ data }) => {
      //console.log(data)
    return data;
  });
};

  export {getPlants, getSinglePlant}