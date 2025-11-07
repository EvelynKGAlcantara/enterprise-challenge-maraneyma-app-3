import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderBack } from "../components/Header/HeaderBack";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push("homeScreen");
  };

  const handleGoogleLogin = () => {
    // Implementar login com Google
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HeaderBack onPress={() => router.push("/signupScreen")} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Acessar (login)</Text>
        </View>

        <Pressable style={styles.googleButton} onPress={handleGoogleLogin}>
          <View style={styles.googleIcon}>
            <Image
              source={require("../assets/images/logo-google.png")}
              style={styles.googleIconImage}
            />
          </View>
          <Text style={styles.googleButtonText}>Continue com o Google</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.form}>
          <Text style={styles.headerSubtitle}>
            Insira seu usuário e senha pra acessar
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Senha de acesso</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Senha"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <AntDesign
                  name={showPassword ? "eye" : "eye-invisible"}
                  size={20}
                  color="#00000045"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Pressable>
            <Text style={styles.textPassword}>Esqueceu sua senha?</Text>
          </Pressable>
        </View>

        <View style={styles.buttons}>
          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryText}>Logar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfbff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 10,
  },
  header: {
    marginBottom: 32,
    fontFamily: "SofiaSans_400Regular",
  },

  headerTitle: {
    marginTop: 16,
    fontSize: 32,
    color: "#515151",
    marginBottom: 4,
    fontFamily: "SofiaSans_800ExtraBold",
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#7B7B7B",
    lineHeight: 22,
    marginBottom: 24,
    marginTop: 16,
    fontFamily: "SofiaSans_400Regular",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  googleButtonText: {
    fontSize: 17,
    color: "#1890FF",
    fontWeight: "700",
    marginLeft: 20,
  },
  googleIconImage: {
    marginLeft: 18,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  form: {
    marginBottom: 40,
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

  inputHelper: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },

  buttons: {
    gap: 10,
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
  textPassword: {
    color: "#EB2F96",
    fontSize: 18,
    textDecorationLine: "underline",
    fontFamily: "SofiaSans_800ExtraBold",
  },

  wrapper: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 2,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
});
