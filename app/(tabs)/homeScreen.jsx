import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Header } from "../../components/Header/index";
import { SportCardHome } from "../../components/Cards/ActivityCardHome";
import { StatusChampionshipCardHome } from "../../components/Cards/StatusChampionshipCardHome";
import { useRouter } from "expo-router";
import { TertiaryButton } from "../../components/Button/TertiaryButton";
import { DeleteModal } from "../../components/Modals/DeleteModal";
import { useState, useEffect } from "react";
import { useStudents } from "../context/Context";

const sports = [
  {
    title: "Futebol",
    description:
      "Um esporte coletivo jogado com uma bola, onde o objetivo é marcar gols chutando a bola para dentro da meta adversária.",
    shortly: false,
    route: "../tutorials/sports/futebol",
  },
  {
    title: "Handball",
    description:
      "Um esporte de equipe onde os jogadores lançam uma bola com as mãos para marcar gols em uma meta.",
    shortly: false,
    route: "../tutorials/sports/handball",
  },
  {
    title: "Peteca",
    description:
      "Um esporte de raquete onde os jogadores utilizam raquetes para golpear uma peteca sobre uma rede.",
    shortly: false,
    route: "../tutorials/sports/peteca",
  },
  {
    title: "Cabo de guerra",
    description:
      "Um esporte de força onde duas equipes puxam uma corda em direções opostas, com o objetivo de puxar a equipe adversária para o seu lado.",
    shortly: false,
    route: "../tutorials/sports/caboDeGuerra",
  },

  
];

const mockChampionships = [
  {
    id: 1,
    status: "waiting",
    category: "Vôlei / Misto",
    title: "Campeonato Interclasses",
    schoolYear: "Terceiro Colegial (Ensino Médio)",
    participatingTeams: "10",
    totalGames: 0,
    finishedGames: 0,
  },
  {
    id: 2,
    status: "inProgress",
    category: "Basquete / Masculino",
    title: "Torneio do Primeiro Ano",
    schoolYear: "Primeiro Colegial (Ensino Médio)",
    participatingTeams: "8",
    totalGames: 15,
    finishedGames: 5,
  },
  {
    id: 3,
    status: "waiting",
    category: "Vôlei / Misto",
    title: "Campeonato Interclasses",
    schoolYear: "Terceiro Colegial (Ensino Médio)",
    participatingTeams: "10",
    totalGames: 0,
    finishedGames: 0,
  },
  {
    id: 4,
    status: "finished",
    category: "Futebol / Masculino",
    title: "Copa do Ensino Médio",
    schoolYear: "Segundo Colegial (Ensino Médio)",
    participatingTeams: "12",
    totalGames: 12,
    finishedGames: 12,
  },
  {
    id: 5,
    status: "inProgress",
    category: "Handebol / Feminino",
    title: "Desafio Interclasse",
    schoolYear: "Primeiro Colegial (Ensino Médio)",
    participatingTeams: "6",
    totalGames: 15,
    finishedGames: 5,
  },
  {
    id: 6,
    status: "waiting",
    category: "Basquete / Feminino",
    title: "Campeonato de Primavera",
    schoolYear: "Terceiro Colegial (Ensino Médio)",
    participatingTeams: "4",
    totalGames: 0,
    finishedGames: 0,
  },
];

export default function Home() {
  const router = useRouter();
  const { championships } = useStudents();
  const [sinc, setSinc] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEditProfile = () => {
    router.push("../profile/myProfile");
  };
  const handleOut = () => {
    router.push("../loginScreen");
  };
  const handleSinc = () => {
    setSinc(false);
    setModalVisible(false);
  };

  const handleDetailChampionship = () => {
    router.push(
      "../championship/detailsChampionship/notInitiated/championshipDetails"
    );
  };

  const handleCreateChampionship = () => {
    router.push("../championship/createChampionship/championshipTypeScreen");
  };
  const handleCreateStudents = () => {
    router.push("../students_screens/registerStudents");
  };
  const handleTutorials = () => {
    router.push("../(tabs)/tutorials");
  };

  const handleChampionship = () => {
    router.push("../(tabs)/championship");
  };

  useEffect(() => {
    if (sinc === true) {
      const timer = setTimeout(() => {
        setModalVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [sinc]);

  return (
    <View style={styles.safeArea}>
      <Header imageSource={require("../../assets/images/logo-home.png")} />

      {sinc ? (
        <View style={styles.statusBar}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={styles.statusText}>
            <Text style={styles.statusDot}> ● </Text>
            Aguardando ficar conectado para sincronizar
          </Text>
        </View>
      ) : (
        <View style={styles.statusBarSinc}>
          <Text style={styles.statusLabelSinc}>Status:</Text>
          <Text style={styles.statusTextSinc}>
            <Text style={styles.statusDotSinc}> ● </Text>
            100% Sincronizado
          </Text>
        </View>
      )}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileHello}>Olá Carl Sagan</Text>
            <Text style={styles.profileRole}>Professor</Text>
          </View>
          <View style={styles.buttonsData}>
            <Pressable onPress={handleEditProfile} style={styles.button}>
              <Text style={styles.buttonText}>Meus Dados</Text>
            </Pressable>
            <Pressable onPress={handleOut} style={styles.button}>
              <Text style={styles.buttonText}>Sair</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tutoriais</Text>
          <Pressable onPress={handleTutorials}>
            <Text style={styles.sectionAction}>Ver todos os tutoriais</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tutorialList}
        >
          {sports.map((sport, index) => (
            <View key={index} style={styles.cardWrapper}>
              <SportCardHome
                key={index}
                title={sport.title}
                description={sport.description}
                onPress={() => router.push(sport.route)}
                shortly={sport.shortly}
              />
            </View>
          ))}
        </ScrollView>

        {championships?.length === 0 ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Campeonatos</Text>
            </View>

            <View style={styles.championshipContainer}>
              <Image
                source={require("../../assets/images/trophy.png")}
                style={styles.trophyImage}
              />
              <Text style={styles.noChampionshipText}>
                Nenhum campeonato ativo
              </Text>

              <TertiaryButton
                text={"Criar Campeonato"}
                onPress={handleCreateChampionship}
              />
              <TertiaryButton
                text={"Cadastrar Alunos"}
                onPress={handleCreateStudents}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Campeonatos Ativos</Text>
              <Pressable>
                <Text style={styles.sectionAction} onPress={handleChampionship}>
                  Ver todos
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tutorialList}
            >
              {championships?.map((championship) => (
                <View key={championship.id} style={styles.cardWrapperChamp}>
                  <StatusChampionshipCardHome
                    key={championship.id}
                    status={championship.status}
                    category={championship.championshipType}
                    gender={championship.gender}
                    title={championship.championshipName}
                    schoolYear={championship.schoolYear}
                    participatingTeams={championship.participatingTeams}
                    totalGames={championship.totalGames}
                    finishedGames={championship.finishedGames}
                    onPress={handleDetailChampionship}
                  />
                </View>
              ))}
            </ScrollView>

            <View style={styles.championshipContainer}>
              <TertiaryButton
                text={"Criar Campeonato"}
                onPress={handleCreateChampionship}
              />
              <TertiaryButton
                text={"Cadastrar Alunos"}
                onPress={handleCreateStudents}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <DeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleSinc}
        title={"Sincronização"}
        description={
          "Toda vez que você se conectar a internet pela rede Wi-Fi, o aplicativo irá sincronizar sozinho."
        }
        textButton={"Entendi"}
        textSecondatyButton={"Sincronizar usando plano de dados"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 20,
    marginBottom: 90,
  },

  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EB2F9616",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statusLabel: {
    fontFamily: "SofiaSans_800ExtraBold",
    fontSize: 13,
    color: "#000",
  },
  statusText: {
    fontFamily: "SofiaSans_400Regular",
    fontSize: 13,
    color: "#333",
    marginLeft: 6,
  },
  statusDot: {
    color: "#EB2F96",
    fontSize: 8,
  },
  statusBarSinc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F520",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statusLabelSinc: {
    fontFamily: "SofiaSans_800ExtraBold",
    fontSize: 13,
    color: "#000",
  },
  statusTextSinc: {
    fontFamily: "SofiaSans_400Regular",
    fontSize: 13,
    color: "#333",
    marginLeft: 6,
  },
  statusDotSinc: {
    color: "#52C41A",
    fontSize: 8,
  },

  button: {
    borderWidth: 1,
    borderColor: "#EB2F96",
    backgroundColor: "#ffffff",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#EB2F96",
    fontWeight: "400",
  },
  buttonsData: {
    flexDirection: "row",
    gap: 2,
  },
  profileCard: {
    backgroundColor: "#EB2F96",
    marginVertical: 20,
    width: "100%",
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileInfo: {
    flexDirection: "column",
  },
  profileHello: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "SofiaSans_800ExtraBold",
  },
  profileRole: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "SofiaSans_400Regular",
  },
  profileButton: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  profileButtonText: {
    color: "#EB2F96",
    fontSize: 13,
    fontFamily: "SofiaSans_600SemiBold",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "SofiaSans_800ExtraBold",
    color: "#515151",
  },
  sectionAction: {
    borderWidth: 1,
    borderColor: "#EB2F96",
    color: "#EB2F96",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },

  tutorialList: {
    paddingLeft: 4,
    paddingRight: 16,
  },
  cardWrapper: {
    marginRight: 12,
    width: 260,
  },
  cardWrapperChamp: {
    marginRight: 12,
    width: 290,
  },

  championshipContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  trophyImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 200,
  },
  noChampionshipText: {
    fontSize: 14,
    color: "#BFBFBF",
    marginTop: 10,
    fontFamily: "SofiaSans_400Regular",
  },
});
