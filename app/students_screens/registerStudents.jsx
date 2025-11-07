import { Header } from "../../components/Header/index";
import { Button } from "../../components/Button/index";
import { PhotoInput } from "../../components/Inputs/PhotoInput";
import { HeaderBack } from "../../components/Header/HeaderBack";
import { SelectInput } from "../../components/Inputs/SelectInput";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RadioButton } from "../../components/Radio/Radio";
import { useStudents } from "../context/Context";
import * as ImagePicker from "expo-image-picker";

export default function RegisterStudents() {
  const router = useRouter();
  const { addStudent } = useStudents();

  const [name, setName] = useState("");
  const [gender, setGender] = useState(null);
  const [schoolYear, setSchoolYear] = useState("");
  const [photo, setPhoto] = useState("");
  const [classroom, setClassroom] = useState("");
  const [email, setEmail] = useState("");

  const genero = [
    { label: "Feminino", value: "Feminino" },
    { label: "Masculino", value: "Masculino" },
  ];

  const ano = [
    { label: "Primeiro Ano (Ensino Fundamental)", value: "1" },
    { label: "Segundo Ano (Ensino Fundamental)", value: "2" },
    { label: "Terceiro Ano (Ensino Fundamental)", value: "3" },
    { label: "Quarto Ano (Ensino Fundamental)", value: "4" },
    { label: "Quinto Ano (Ensino Fundamental)", value: "5" },
    { label: "Sexto Ano (Ensino Fundamental)", value: "6" },
    { label: "Sétimo Ano (Ensino Fundamental)", value: "7" },
    { label: "Oitavo Ano (Ensino Fundamental)", value: "8" },
    { label: "Nono Ano (Ensino Fundamental)", value: "9" },
    { label: "Primeiro Colegial (Ensino Médio)", value: "10" },
    { label: "Segundo Colegial (Ensino Médio)", value: "11" },
    { label: "Terceiro Colegial (Ensino Médio)", value: "12" },
  ];

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de permissão para acessar a câmera."
      );
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de permissão para acessar a galeria."
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePhotoOptions = () => {
    Alert.alert(
      "Escolha uma opção",
      "Como você deseja adicionar a foto?",
      [
        {
          text: "Tirar Foto",
          onPress: handleTakePhoto,
        },
        {
          text: "Escolher da Galeria",
          onPress: handlePickImage,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleSave = () => {
    if (!name || !gender || !schoolYear) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const newStudent = {
      id: Date.now().toString(),
      name,
      gender,
      schoolYear,
      image: photo
        ? { uri: photo }
        : require("../../assets/images/profile-circle.png"),
      classroom: classroom || "Não definida",
      email: email || "",
    };

    addStudent(newStudent);
    router.push("./registerStudentsSucesScreen");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <HeaderBack />
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Cadastrar Aluno</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Nome do aluno
                <Text style={styles.inputDetail}> (obrigatório)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome completo"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Gênero<Text style={styles.inputDetail}> (obrigatório)</Text>
              </Text>
              <RadioButton
                options={genero}
                selected={gender}
                onSelect={setGender}
              />
            </View>

            <View>
              <Text style={styles.inputLabel}>
                Ano escolar
                <Text style={styles.inputDetail}> (obrigatório)</Text>
              </Text>
              <SelectInput
                value={schoolYear}
                options={ano}
                onChange={setSchoolYear}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Foto <Text style={styles.inputDetail}>(opcional)</Text>
              </Text>
              <PhotoInput onPress={handlePhotoOptions} photoUri={photo} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Sala / Turno <Text style={styles.inputDetail}>(opcional)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={classroom}
                onChangeText={setClassroom}
                placeholder="Ex.: Sala B"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                E-mail do participante{" "}
                <Text style={styles.inputDetail}>(opcional)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
              />
            </View>

            <View style={styles.buttons}>
              <Button text={"Salvar"} onPress={handleSave} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfbff",
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 16,
    fontFamily: "SofiaSans_400Regular",
  },
  headerTitle: {
    fontSize: 32,
    color: "#515151",
    fontFamily: "SofiaSans_800ExtraBold",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputDetail: {
    color: "#cbcbcbff",
  },
  buttons: {
    gap: 10,
    marginBottom: 40,
  },
});
