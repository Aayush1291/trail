import {Text, View, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomTabBarButton = ({ iconName, onPress, isFocused }) => (
  <View
  style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5, // Move the container slightly down
  }}
>
  <TouchableOpacity
    style={{
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isFocused ? '#175CA4' : 'transparent',
      borderRadius: 8,
      borderWidth: 5,
      borderColor: 'transparent',
      elevation: isFocused ? 15 : 0,
      shadowColor: '#f83287',
      shadowOpacity: isFocused ? 1 : 0,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 1,
      marginTop: 5, // Move the button slightly down
    }}
    onPress={onPress}
  >
    <Icon name={iconName} size={25} color={isFocused ? 'white' : '#D3D3D3'} />
  </TouchableOpacity>
</View>


);

const Home = ({navigation}) => {

  const [userName, setUserName] = useState('');

    function monthIndexToMonth(date){
        console.log("HELPER CLALLED");
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

    let [username, setUsername] = useState('');
  
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
    var sec = new Date().getSeconds();
    async function fetchUsername() {
      uname = await AsyncStorage.getItem('loggedIn');
      setUsername(uname);
    }
  
    useEffect(() => {
      fetchUsername();
      retrieveUserName();
    }, []);
    async function Logout(){
      await AsyncStorage.clear()
      navigation.replace('Login')
    }

    const retrieveUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('UserName');
        console.log(storedUserName);
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Error retrieving userName from AsyncStorage:', error);
      }
    };

    return (
      <View>
        
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            Thursday {date}, {monthIndexToMonth(month)} 2022
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="bell-o"
              color={'black'}
              size={23}
              style={{marginRight: 20}}
            />
            <TouchableOpacity onPress={Logout}>
            <Icon name="user-o" color={'black'} size={23} />
            </TouchableOpacity>
          </View>
        </View>
  
       {/*} <View style={{margin: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
            Welcome Back,
          </Text>
          <Text style={{fontSize: 21, color: '#295C99', marginTop: 5}}>
            {username}
          </Text>
        </View>*/}
  
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 25,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: 85,
              width: 85,
              backgroundColor: 'white',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
              Upcoming
            </Text>
            <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
              03
            </Text>
          </View>
  
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'white',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
              Attended
            </Text>
            <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
              13
            </Text>
          </View>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'white',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
              Total
            </Text>
            <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
              16
            </Text>
          </View>
        </View>
  
        <View style={{margin: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
              Upcoming Appointments
            </Text>
            <TouchableOpacity>
              <Text style={{color: '#295C99', fontWeight: 'bold', fontSize: 15}}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>{userName}</Text>
      </View>
    );
  };
  export default Home;