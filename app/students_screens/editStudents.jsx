import { Button } from "../../components/Button/index";
import { SecondaryButton } from "../../components/Button/SecondaryButton";
import { PhotoInput } from "../../components/Inputs/PhotoInput";
import { SelectInput } from "../../components/Inputs/SelectInput";
import { HeaderBack } from "../../components/Header/HeaderBack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { RadioButton } from "../../components/Radio/Radio";
import { useStudents } from "../../app/context/Context";
import * as ImagePicker from "expo-image-picker";

import { DeleteModal } from "../../components/Modals/DeleteModal";

export default function EditStudents() {
  const router = useRouter();
  const { students, idStudents, removeStudent, updateStudent } = useStudents();

  const handleSucess = () => {
    if (!name || !gender || !schoolYear) {
      Alert.alert("Atenção", "Por favor, preencha os campos obrigatórios.");
      return;
    }

    const updatedStudent = {
      id,
      name,
      gender,
      schoolYear,
      image: photo
        ? { uri: photo }
        : require("../../assets/images/profile-circle.png"),
      classroom: classroom || "Não definida",
      email: email || "",
    };

    updateStudent(idStudents, updatedStudent);
    router.push("./editStudentsSucesScreen");
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = (id) => {
    removeStudent(id);
    router.push("./deletStudentSucesScreen");
  };

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
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [classroom, setClassroom] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (students && students.length > 0) {
      const aluno = students[idStudents];
      setId(aluno.id);
      setName(aluno.name);
      setGender(aluno.gender);
      setEmail(aluno.email);
      setSchoolYear(aluno.schoolYear);
      setClassroom(aluno.classroom);
      
      // Carregar a foto existente
      if (aluno.image && typeof aluno.image === 'object' && aluno.image.uri) {
        setPhoto(aluno.image.uri);
      } else if (aluno.photoUri) {
        setPhoto(aluno.photoUri);
      }
    }
  }, [students]);

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
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Editar Aluno</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Nome do aluno{" "}
                <Text style={styles.inputDetail}>(obrigatório)</Text>
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
                Ano Escolar
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
              <SecondaryButton text={"Excluir aluno"} onPress={handleDelete} />
              <Button text={"Salvar"} onPress={handleSucess} />
            </View>
          </View>
          <DeleteModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={() => confirmDelete(id)}
            description={"Tem certeza que deseja excluir o aluno?"}
            textSecondatyButton={"Sim, excluir"}
            textButton={"Não, desistir"}
            title={"Excluir"}
          />
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
  headerSubtitle: {
    fontSize: 18,
    color: "#7B7B7B",
    lineHeight: 22,
    fontFamily: "SofiaSans_400Regular",
  },

  form: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 20,
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
  inputYear: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 150,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputHelper: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  createButton: {
    backgroundColor: "#EB2F96",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#EB2F96",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    textAlign: "center",
    fontSize: 14,
    color: "#666666",
    textDecorationLine: "underline",
  },
  backButton: {
    width: "100%",
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fbfbfb",
  },

  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkContainer: {
    marginBottom: 32,
  },
  checkmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#52C41A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#52C41A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkmarkText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  advanceButton: {
    backgroundColor: "#EB2F96",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  advanceButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttons: {
    gap: 10,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#EB2F96",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",

    fontSize: 16,
  },
});
