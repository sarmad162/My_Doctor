import React, {useState, useEffect} from 'react';
import {Text, View, Alert} from 'react-native';
import {PROFILE_URL} from '../config/urls';
import axios from '../config/axios';
import Loader from '../components/Loader';
import Button from '../components/Button';
import styles from './styles/profileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transformName } from '../config/helpers';

function ProfileScreen(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() =>{
    _getProfile();
  }, []);
  
  const _getProfile = () =>{
    (async() =>{
      setLoading(true);

      try{

        const token = await AsyncStorage.getItem('accessToken');
        axios.defaults.headers.common.Authorization = `JWT ${token}`;
        const response = await axios.get(PROFILE_URL);
        setUser(response.data);
        setLoading(false);

      }catch(e){
        setLoading(false);
      }
    })();
  };

  signOut = () =>{
    Alert.alert(
      '',
      'هل انت متأكد انك تريد تسجيل الخروج ؟',
      [
        {
          text:'اغلاق',
          style:'cancel',
        },
        {
          text:'موافق',
          onPress:async() =>{
            await AsyncStorage.clear();
            props.navigation.navigate('Home');
          },
        },
      ],
      {cancelable: false}
    );
  }
  return(
    <View style={styles.container}>
      <Loader title="احضار بيانات الملف الشخصي" loading={isLoading} />
      {user &&
        <View>
          <View style={styles.userMetaContainer}>
            <View style={styles.userAvtar}>
              <Text style={styles.userAvtarText}>{transformName(user.name)}</Text>
            </View>
            <View style={styles.userMeta}>
              <Text>{user.name}</Text>
              <Text>{user.email}</Text>
            </View>
          </View>
           {user.profile && 
           <View>
              <View style={styles.doctorInfo}>
                <View style={styles.infoCell}>
                  <Text style={styles.infoTitle}>الاختصاص</Text>
                  <Text style={styles.infoText}>{user.profile.specialization}</Text>
                </View>
                <View style={styles.infoCell}>
                  <Text style={styles.infoTitle}>العنوان</Text>
                  <Text style={styles.infoText}>{user.profile.address}</Text>
                </View>
                <View style={styles.infoCell}>
                  <Text style={styles.infoTitle}>ساعات العمل</Text>
                  <Text style={styles.infoText}>{user.profile.workingHours}</Text>
                </View>
                <View style={styles.lastCell}>
                  <Text style={styles.infoTitle}>رقم الهاتف</Text>
                  <Text style={styles.infoText}>{user.profile.phone}</Text>
                </View>
              </View>
           </View> 
           }
           <Button 
              buttonStyles={styles.logoutButton}
              textStyles = {styles.buttonText}
              text="تسجيل الخروج"
              onPress={signOut}
           />
        </View>
      }

    </View>
  )
}

export default ProfileScreen;