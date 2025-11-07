import React, { createContext, useContext, useState } from "react";

const StudentsContext = createContext();

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [idStudents, setIdStudents] = useState();
  const [championships, setChampionships] = useState([]);
  const [championshipType, setChampioshipType] = useState();
  const [championshipStatus, setChampioshipStatus] = useState();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState();
  const [selectChampionship, setSelectChampionship] = useState();
  const [selectedMatch, setSelectedMatch] = useState();

  const mockChampionships = [
    {
      id: 2,
      status: "waiting",
      championshipType: "Futebol",
      championshipName: "Campeonato de Futebol do 1º Ano",
      schoolYear: "1º Ano do Ensino Médio",
      participatingTeams: 4,
      totalGames: 6,
      gender: "Masculino",
    },
    {
      id: 3,
      status: "inProgress",
      championshipType: "Handball",
      championshipName: "Torneio Interclasse de Handball",
      schoolYear: "2º Ano do Ensino Médio",
      participatingTeams: 6,
      totalGames: 9,
      gender: "Feminino",
    },
    {
      id: 4,
      status: "finished",
      championshipType: "Corrida de Saco",
      championshipName: "Corrida de Saco da Semana Cultural",
      schoolYear: "5º Ano do Ensino Fundamental",
      participatingTeams: 8,
      totalGames: 12,
      gender: "Misto",
    },
    {
      id: 5,
      status: "waiting",
      championshipType: "Amarelinha",
      championshipName: "Campeonato de Amarelinha",
      schoolYear: "3º Ano do Ensino Fundamental",
      participatingTeams: 5,
      totalGames: 10,
      gender: "Feminino",
    },
    {
      id: 6,
      status: "inProgress",
      championshipType: "Corrida",
      championshipName: "Maratona Escolar 2025",
      schoolYear: "9º Ano do Ensino Fundamental",
      participatingTeams: 10,
      totalGames: 15,
      gender: "Misto",
    },
  ];

  const [matches, setMatches] = useState({
    faseA: [
      {
        id: 1,
        team1: "Equipe 1",
        team2: "Equipe 2",
        score1: 2,
        score2: 5,
        status: "finished",
        date: "02/10/2025",
        hour: "15:00",
        winner: "Equipe 2",
      },
      {
        id: 2,
        team1: "Equipe 1",
        team2: "Equipe 2",
        score1: 3,
        score2: 4,
        status: "finished",
        date: "02/10/2025",
        hour: "15:00",
        winner: "Equipe 2",
      },
    ],
    faseB: [
      {
        id: 3,
        team1: "Equipe 1",
        team2: "Equipe 2",
        score1: 4,
        score2: 3,
        status: "finished",
        date: "02/10/2025",
        hour: "15:00",
        winner: "Equipe 1",
      },
      {
        id: 4,
        team1: "Equipe 1",
        team2: "Equipe 2",
        score1: 2,
        score2: 5,
        status: "finished",
        date: "02/10/2025",
        hour: "15:00",
        winner: "Equipe 2",
      },
    ],
    final: [
      {
        id: 5,
        team1: "Equipe 1",
        team2: "Equipe 2",
        score1: 2,
        score2: 5,
        status: "finished",
        date: "02/10/2025",
        hour: "15:00",
        winner: "Equipe 2",
      },
      {
        id: 6,
        team1: "Equipe 1",
        team2: "Equipe 2",
        score1: 0,
        score2: 0,
        status: "waiting",
      },
    ],
  });

  const updateMatchStatus = (
    id,
    newStatus,
    score1,
    score2,
    date,
    hour,
    winner
  ) => {
    setMatches((prevMatches) => {
      // percorre as fases (faseA, faseB, final)
      const updated = Object.keys(prevMatches).reduce((acc, fase) => {
        acc[fase] = prevMatches[fase].map((match) =>
          match.id === id
            ? {
                ...match,
                status: newStatus,
                score1,
                score2,
                date,
                hour,
                winner,
              }
            : match
        );
        return acc;
      }, {});
      return updated;
    });
  };

  const studentsMock = [
    {
      id: "44",
      name: "Lucas Henrique Costa",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala A",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "54",
      name: "Gabriela Rocha",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala B",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "64",
      name: "Mateus Almeida",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala C",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "74",
      name: "Larissa Carvalho",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala A",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "84",
      name: "Pedro Lucas Ferreira",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala B",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "94",
      name: "Isabela Martins",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala C",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "140",
      name: "Rafael Lima",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala A",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "141",
      name: "Vitória Mendes",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala B",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "124",
      name: "Caio Ribeiro",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala C",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "134",
      name: "Fernanda Souza",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala A",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "144",
      name: "Gustavo Pires",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala B",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "154",
      name: "Juliana Nogueira",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala C",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "164",
      name: "André Silva",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala A",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "174",
      name: "Camila Dias",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala B",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "184",
      name: "Eduardo Rocha",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala C",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "194",
      name: "Beatriz Freitas",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala A",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "204",
      name: "Felipe Santos",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala B",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "214",
      name: "Luana Ribeiro",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala C",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "224",
      name: "Thiago Fernandes",
      gender: "Masculino",
      schoolYear: "5",
      classroom: "Sala A",
      image: require("../../assets/images/profile-circle.png"),
    },
    {
      id: "234",
      name: "Patrícia Moreira",
      gender: "Feminino",
      schoolYear: "5",
      classroom: "Sala B",
      image: require("../../assets/images/profile-circle.png"),
    },
  ];

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student, ...studentsMock]);
  };

  const addTeams = (team) => {
    setTeams((prev) => [...prev, { id: prev?.lenght + 1, ...team }]);
  };
  const removeTeams = (id) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStudent = (index, updatedStudent) => {
    setStudents((prev) => {
      const newStudents = [...prev];
      newStudents[index] = { ...newStudents[index], ...updatedStudent };
      return newStudents;
    });
  };

  const addChampionship = (data) => {
    setChampionships((prev) => [
      ...prev,
      { id: prev?.length + 1, status: "waiting", ...data },
      ...mockChampionships,
    ]);
  };

  const startSelectedChampionship = () => {
    if (!selectChampionship) return;
    setChampionships((prev) =>
      prev.map((c) =>
        c.id === selectChampionship && c.status === "waiting"
          ? { ...c, status: "inProgress" }
          : c
      )
    );
  };

  const finishedSelectedChampionship = () => {
    if (!selectChampionship) return;
    setChampionships((prev) =>
      prev.map((c) =>
        c.id === selectChampionship && c.status === "inProgress"
          ? { ...c, status: "finished" }
          : c
      )
    );
  };

  const clearStudents = () => setStudents([]);

  return (
    <StudentsContext.Provider
      value={{
        championshipType,
        students,
        addStudent,
        removeStudent,
        updateStudent,
        clearStudents,
        addChampionship,
        championships,
        startSelectedChampionship,
        finishedSelectedChampionship,
        addTeams,
        setTeamName,
        removeTeams,
        teamName,
        teams,
        setChampionships,
        selectChampionship,
        setSelectChampionship,
        selectedMatch,
        setSelectedMatch,
        matches,
        setMatches,
        updateMatchStatus,
        idStudents,
        setIdStudents,
        championshipStatus,
        setChampioshipStatus,
        handlers: {
          setChampioshipType,
        },
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents deve ser usado dentro de um StudentsProvider");
  }
  return context;
}
