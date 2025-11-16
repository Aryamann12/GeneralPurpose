'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import CategoryFilter from '@/components/category-filter';
import ProblemGrid from '@/components/problem-grid';
import ProblemFormModal from '@/components/problem-form-modal';
import ProblemDetailModal from '@/components/problem-detail-modal';
import { Problem, CATEGORIES } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function Home() {
  const [problems, setProblems] = useLocalStorage<Problem[]>('coding-problems', []);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddProblem = (newProblem: Omit<Problem, 'id'>) => {
    const problem: Problem = {
      ...newProblem,
      id: Date.now().toString(),
    };
    setProblems([...problems, problem]);
    setIsFormOpen(false);
  };

  const handleEditProblem = (updatedProblem: Problem) => {
    setProblems(problems.map(p => (p.id === updatedProblem.id ? updatedProblem : p)));
    setEditingProblem(null);
    setIsFormOpen(false);
  };

  const handleDeleteProblem = (id: string) => {
    setProblems(problems.filter(p => p.id !== id));
    setSelectedProblem(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 via-slate-900 to-blue-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Header onAddClick={() => {
          setEditingProblem(null);
          setIsFormOpen(true);
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <ProblemGrid
            problems={filteredProblems}
            onProblemClick={setSelectedProblem}
          />
        </div>

        {isFormOpen && (
          <ProblemFormModal
            problem={editingProblem || undefined}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProblem(null);
            }}
            onSubmit={editingProblem ? handleEditProblem : handleAddProblem}
          />
        )}

        {selectedProblem && (
          <ProblemDetailModal
            problem={selectedProblem}
            onClose={() => setSelectedProblem(null)}
            onEdit={() => {
              setEditingProblem(selectedProblem);
              setSelectedProblem(null);
              setIsFormOpen(true);
            }}
            onDelete={() => {
              handleDeleteProblem(selectedProblem.id);
            }}
          />
        )}
      </div>
    </main>
  );
}
