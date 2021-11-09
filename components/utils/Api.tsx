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
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSinglePlant = (plantCommonName:string) => {
    
    return listApi
  .get(`/plants/${plantCommonName}`)
  .then(({ data }) => {
    return data;
  })
  .catch((err) => {
    console.log(err);
  });
};

const getUserFromDatabase = (username:string) => {
  return listApi
  .get(`/users/${username}`)
  .then(({data}) => {
    return data
  })
  .catch((err) => {
    console.log(err);
  });
}

const getUserPlantsFromDatabase = (username:string) => {
  return listApi
  .get(`/users/${username}/plants`)
  .then(({data}) => {
    return data
  })
  .catch((err) => {
    console.log(err);
  });
}

const postUserPlantToDatabase = (username:string, plantToPost:object) => {
  return listApi
  .post(`/users/${username}/plants`, plantToPost)
  .then(({data}) => {
    return data
  })
  .catch((err) => {
    console.log(err);
  });
}

const getSingleUserPlantFromDatabase = (username: string, plant_id: string) => {
  return listApi
  .get(`/users/${username}/plants/${plant_id}`)
  .then(({data}) => {
    return data[0]
  })
  .catch((err) => {
    console.log(err);
  });
}

const deleteSinglePlantFromDatabase = (username: string, plant_id: string) => {
  return listApi
  .delete(`/users/${username}/plants/${plant_id}`)
  .then(({data}) => {
    return data
  })
  .catch((err) => {
    console.log(err);
  });
}

const patchUserPlant = (username: string, plant_id: string, newPlantData: object) => {
  return listApi
  .patch(`/users/${username}/plants/${plant_id}`, newPlantData)
  .then(({data}) => {
    return data
  })
  .catch((err) => {
    console.log(err);
  });
}

const patchUserPlantWatering = (username: string, plant_id: string, databasePlant: object) => {
  return listApi
  .patch(`/users/${username}/plants/${plant_id}/watering`, databasePlant)
  .then(({data}) => {
    console.log(data, '<-----in patchuserplantapi')
    return data
  })
  .catch((err) => {
    console.log(err, "ERR HERE <-----------");
  });
}

  export {getPlants, getSinglePlant, getUserFromDatabase, getUserPlantsFromDatabase, postUserPlantToDatabase, getSingleUserPlantFromDatabase, deleteSinglePlantFromDatabase, patchUserPlant, patchUserPlantWatering}