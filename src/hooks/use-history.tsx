'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AnalysisResult } from '@/lib/types';
import { useAuth } from './use-auth';

interface HistoryContextType {
  history: AnalysisResult[];
  addMeetingToHistory: (meeting: AnalysisResult) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const { user } = useAuth(); // Auth context provides the user

  useEffect(() => {
    // Load history from session storage when component mounts
    if (user) {
      try {
        const storedHistory = sessionStorage.getItem('meetingHistory');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (e) {
        console.error('Could not parse history from session storage', e);
        sessionStorage.removeItem('meetingHistory');
      }
    } else {
      // Clear history if there is no user
      setHistory([]);
      sessionStorage.removeItem('meetingHistory');
    }
  }, [user]);

  const addMeetingToHistory = (meeting: AnalysisResult) => {
    if (user) {
      const newHistory = [meeting, ...history];
      setHistory(newHistory);
      sessionStorage.setItem('meetingHistory', JSON.stringify(newHistory));
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addMeetingToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
