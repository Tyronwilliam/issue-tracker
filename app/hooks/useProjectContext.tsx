// useProjectContext.tsx
"use client";
import React, { createContext, useContext, ReactNode } from "react";

// Définissez le type pour les données de contexte
type ProjectContextData = {
  projectId: number | null; // Remplacez `number` par le type approprié
  setProjectId: (projectId: number | null) => void;
};

// Créez le context
const ProjectContext = createContext<ProjectContextData | undefined>(undefined);

// Créez un fournisseur de contexte
export function ProjectContextProvider({ children }: { children: ReactNode }) {
  const [projectId, setProjectId] = React.useState<number | null>(null);

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
}

// Créez un hook personnalisé pour utiliser le contexte
export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "useProjectContext must be used within a ProjectContextProvider"
    );
  }
  return context;
}
