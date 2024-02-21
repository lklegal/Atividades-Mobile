import React from 'react';
import { Text, View } from 'react-native';
import { Button, ScrollView, TextInput } from 'react-native-web';
import axios from 'axios';

axios.defaults.baseURL = 'http://10.0.84.197:1337/api';

export default function App() {
  
  const [dados,setDados] = React.useState([]);
  const [usuario,setUsuario] = React.useState('');
  const [senha,setSenha] = React.useState('');
  const [jwt,setJwt] = React.useState('');
  return (
    <View>
      <TextInput placeholder="Nome de usuário" 
        onChangeText={setUsuario}
      />
      <TextInput placeholder="Senha" 
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <Button title="Entrar" onPress={async () => 
          {
              try {
                const response = await axios.post('/auth/local',{identifier:usuario,password:senha});
                setJwt(response.data.jwt);
              }
              catch (error) {
                console.log(error);
              }
              
          }
        }
      />

      <Text></Text>

      <Button title="Mostrar informes" onPress={async () => 
        {
            const {data} = await axios.get('/informes', {headers: {Authorization: `Bearer ${jwt}`}});
            setDados(data.data);
        }
      } 
      />

      <ScrollView>
        {dados.map((item) => (
          <Text key={item.id}>{item.attributes.autor}: {item.attributes.mensagem}, enviado {item.attributes.data}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
