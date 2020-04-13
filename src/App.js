import React, {useEffect, useState} from "react";
import api from './services/api';
import {
  SafeAreaView, View, FlatList, Text, StatusBar, TouchableOpacity
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[]);
  
  async function handleLikeRepository(id) {
   const response = await api.post(`repositories/${id}/like`);

   const likeRepository = response.data;

   const repositoryUpdate = repositories.map(repository => {
     if(repository.id ===id){
      return likeRepository;
     }else{
       return repository;
     }
   });

   setRepositories(repositoryUpdate);

  }

  return (
    <>
      <StatusBar/>
      <SafeAreaView >
      <FlatList data={repositories}
                keyExtractor={repository => repository.id}
                renderItem={({item: repository}) => (
          <View>
            <Text>{repository.title}</Text>

            <View >
              {repository.techs.map(tech => (
                <Text key={tech}> {tech} </Text>
              ))}
            </View>

          <View>
            <Text
              testID={`repository-likes-${repository.id}`} >
              {repository.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}>
            <Text>Curtir</Text>
          </TouchableOpacity>
        </View>
        )}
        /> 
      </SafeAreaView>
    </>
  );
}