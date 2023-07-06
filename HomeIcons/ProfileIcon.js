// import React, { useEffect, useState } from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { db } from '../user';

// const ProfileIcon = ({ navigation }) => {
//     const [profileInitial, setProfileInitial] = useState(''); // Empty initial

//     useEffect(() => {
//         fetchProfileInitial(); // Fetch the profile initial when the component mounts
//     }, []);

//     const fetchProfileInitial = () => {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 'SELECT displayName FROM Users LIMIT 1',
//                 [],
//                 (_, { rows }) => {
//                     console.log(rows.item(0)); // Check the retrieved row object
//                     console.log('got wife');
//                     if (rows.length > 0) {
//                         const displayName = rows.item(0).displayName;
//                         const initial = getProfileInitial(displayName);
//                         setProfileInitial(initial);
//                     }
//                 },
//                 (_, error) => {
//                     console.log('Error fetching profile initial:', error);
//                 }
//             );
//         });
//     };


//     const getProfileInitial = (displayName) => {
//         return displayName.charAt(0).toUpperCase(); // Get the first letter of the display name and capitalize it
//     };

//     const handlePress = () => {
//         navigation.navigate('ProfileScreen');
//     };

//     return (
//         <TouchableOpacity style={styles.container} onPress={handlePress}>
//             <Text style={styles.profileInitial}>{profileInitial}</Text>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginRight: 10,
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         backgroundColor: '#ff3366',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     profileInitial: {
//         fontSize: 12,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
// });

// export default ProfileIcon;
