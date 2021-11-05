import axios from "axios";

const listApi = axios.create({
  baseURL: `https://l81eyc3fja.execute-api.eu-west-2.amazonaws.com/beta`,
});

const getPlants = (plantCategory:string) => {
        return listApi
      .get(`/plants`, {
        params: {
          category: plantCategory
        }
      })
      .then(({ data }) => {
          //console.log(data)
        return data;
      });
  };

  export {getPlants}