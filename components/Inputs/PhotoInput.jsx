import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export const PhotoInput = ({ onPress, textButton, photoUri }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image 
          source={
            photoUri 
              ? { uri: photoUri } 
              : require("../../assets/images/profile-circle.png")
          } 
          style={styles.avatarImage}
        />
      </View>

      <Pressable onPress={onPress} style={styles.button}>
        {textButton ? (
          <Text style={styles.buttonText}>{textButton}</Text>
        ) : (
          <Text style={styles.buttonText}> Tirar foto </Text>
        )}
      </Pressable>

      <Text style={styles.optional}>(opcional)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  button: {
    borderWidth: 1,
    borderColor: "#EB2F96",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: "#EB2F96",
    fontWeight: "400",
  },
  optional: {
    marginLeft: 8,
    fontSize: 14,
    color: "#9e9e9e",
    fontFamily: "SofiaSans_400Regular",
  },
});
