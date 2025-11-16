import React, { useState, useEffect, useMemo, FormEvent, ChangeEvent } from 'react';
import { Plus, Pencil, Code, BookOpen, X, Trash2, UploadCloud, CheckCircle, Circle, ChevronsUpDown } from 'lucide-react';

// --- TYPES ---
type Category = "Binary Search" | "Dynamic Programming" | "Graphs" | "Arrays" | "Strings" | "Other";
type Difficulty = "Easy" | "Medium" | "Hard";

interface Problem {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  notes: string;
  code: string;
  imageUrl?: string; // Stored as a data URL string
  isSolved: boolean; // New field
}

type ProblemFormData = Omit<Problem, 'id'>;

// --- CONSTANTS & INITIAL DATA ---

const CATEGORIES: Category[] = [
  "Binary Search",
  "Dynamic Programming",
  "Graphs",
  "Arrays",
  "Strings",
  "Other",
];

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

const initialData: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    category: "Arrays",
    difficulty: "Easy",
    notes: "Classic hash map problem. Store complements and their indices.",
    code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}`,
    imageUrl: undefined,
    isSolved: true,
  },
  {
    id: "2",
    title: "Find Minimum in Rotated Sorted Array",
    category: "Binary Search",
    difficulty: "Medium",
    notes: "The key is to compare mid with the right pointer to decide which half is sorted.",
    code: `function findMin(nums) {\n  let left = 0;\n  let right = nums.length - 1;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] > nums[right]) {\n      left = mid + 1;\n    } else {\n      right = mid;\n    }\n  }\n  return nums[left];\n}`,
    imageUrl: "https://placehold.co/600x300/1e293b/94a3b8?text=Binary+Search+Concept",
    isSolved: false,
  },
  {
    id: "3",
    title: "Number of Islands",
    category: "Graphs",
    difficulty: "Medium",
    notes: "Use Depth First Search (DFS) or Breadth First Search (BFS) to traverse the grid. When you find a '1', start a traversal and mark all connected '1's as visited (e.g., by changing them to '0' or using a visited set). Increment the island count for each new traversal started.",
    code: `function numIslands(grid) {\n  let count = 0;\n  function dfs(i, j) {\n    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {\n      return;\n    }\n    grid[i][j] = '0'; // Mark as visited\n    dfs(i + 1, j);\n    dfs(i - 1, j);\n    dfs(i, j + 1);\n    dfs(i, j - 1);\n  }\n\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === '1') {\n        count++;\n        dfs(i, j);\n      }\n    }\n  }\n  return count;\n}`,
    imageUrl: "https://placehold.co/600x300/1e293b/94a3b8?text=Grid+Traversal",
    isSolved: false,
  },
    {
    id: "4",
    title: "Container With Most Water",
    category: "Arrays",
    difficulty: "Medium",
    notes: "Use the two-pointer technique. Start with pointers at both ends. Calculate the area. Move the pointer with the shorter height inward, as moving the taller pointer inward will never result in a larger area.",
    code: `function maxArea(height) {\n  let max = 0;\n  let left = 0;\n  let right = height.length - 1;\n  while (left < right) {\n    const h = Math.min(height[left], height[right]);\n    const w = right - left;\n    const area = h * w;\n    max = Math.max(max, area);\n    if (height[left] < height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n  return max;\n}`,
    imageUrl: "https://placehold.co/600x300/1e293b/94a3b8?text=Two+Pointers",
    isSolved: false,
  },
];

// --- HELPER FUNCTIONS ---

/**
 * Custom hook to manage state in localStorage.
 */
function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

/**
 * Converts a File object to a base64 data URL.
 */
const convertFileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// --- STYLES ---
/**
 * Global styles to apply the cyberpunk theme.
 * This should be rendered once in the App component.
 */
const GlobalStyles = () => (
  <style>{`
    body {
      background-color: #0f172a; /* bg-slate-900 */
      color: #f1f5f9; /* text-slate-100 */
      font-family: 'Inter', sans-serif;
    }
    /* Simple custom scrollbar for the futuristic vibe */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #1e293b; /* bg-slate-800 */
    }
    ::-webkit-scrollbar-thumb {
      background: #06b6d4; /* bg-cyan-500 */
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #22d3ee; /* bg-cyan-400 */
    }
    /* Style for form elements to match Tailwind @tailwindcss/forms */
    select, input[type="text"], textarea, input[type="checkbox"] {
      background-color: #1e293b; /* bg-slate-800 */
      border-color: #334155; /* border-slate-700 */
      border-radius: 0.5rem; /* rounded-lg */
      color: white;
    }
    input[type="checkbox"] {
      border-radius: 0.25rem;
      color: #06b6d4; /* text-cyan-500 */
    }
    select:focus, input[type="text"]:focus, textarea:focus, input[type="checkbox"]:focus {
      border-color: #06b6d4; /* border-cyan-500 */
      box-shadow: 0 0 0 1px #06b6d4;
      outline: none;
      ring: none;
      ring-offset: 0;
    }
  `}</style>
);


// --- UI COMPONENTS ---

// --- Header ---
interface HeaderProps {
  onAddProblem: () => void;
}
function Header({ onAddProblem }: HeaderProps) {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          <span className="text-cyan-400">Coding</span> Memo Decks
        </h1>
        <button
          onClick={onAddProblem}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2 px-4 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
        >
          <Plus size={18} />
          Add Problem
        </button>
      </div>
    </header>
  );
}

// --- ProblemCard (Redesigned as a List Item) ---
interface ProblemCardProps {
  problem: Problem;
  onSelect: (problem: Problem) => void;
  onEdit: (problem: Problem) => void;
  onToggleSolve: (id: string) => void;
}

const difficultyColorMap = {
  Easy: 'bg-green-600/30 text-green-300 border border-green-500/50',
  Medium: 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/50',
  Hard: 'bg-red-600/30 text-red-300 border border-red-500/50',
};

function ProblemCard({ problem, onSelect, onEdit, onToggleSolve }: ProblemCardProps) {
  return (
    <div
      className={`
        relative flex items-center gap-4 w-full bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 
        rounded-lg overflow-hidden shadow-md transition-all duration-300
        hover:border-cyan-500/50 hover:shadow-cyan-500/10
        ${problem.isSolved ? 'opacity-60' : ''}
      `}
    >
      {/* Solved Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSolve(problem.id);
        }}
        className="group p-4 h-full flex items-center justify-center bg-slate-700/50 hover:bg-slate-700/80 transition-colors"
        title={problem.isSolved ? "Mark as Unsolved" : "Mark as Solved"}
      >
        {problem.isSolved ? (
          <CheckCircle size={20} className="text-cyan-400" />
        ) : (
          <Circle size={20} className="text-slate-500 group-hover:text-slate-300" />
        )}
      </button>

      {/* Image Thumbnail */}
      <div className="flex-shrink-0 hidden sm:block">
        {problem.imageUrl ? (
          <img 
            src={problem.imageUrl} 
            alt={problem.title} 
            className="w-20 h-16 object-cover rounded-md border border-slate-700" 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <div className="w-20 h-16 flex items-center justify-center bg-slate-900/50 rounded-md border border-slate-700">
             <Code size={24} className="text-slate-600" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div 
        className="flex-grow py-4 pr-4 cursor-pointer"
        onClick={() => onSelect(problem)}
      >
        <div className="flex justify-between items-center mb-1">
          <h3 className={`text-lg font-semibold text-white truncate ${problem.isSolved ? 'line-through' : ''}`}>
            {problem.title}
          </h3>
          <span className={`hidden md:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColorMap[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm text-slate-400 line-clamp-1">{problem.notes || "No notes for this problem."}</p>
      </div>

      {/* Edit Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          onEdit(problem);
        }}
        className="flex-shrink-0 p-4 h-full flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
        aria-label="Edit problem"
        title="Edit Problem"
      >
        <Pencil size={16} />
      </button>
    </div>
  );
}

// --- CategorySection (New Component) ---
interface CategorySectionProps {
  category: Category;
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  onEditProblem: (problem: Problem) => void;
  onToggleSolve: (id: string) => void;
}
function CategorySection({ category, problems, onSelectProblem, onEditProblem, onToggleSolve }: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const solvedCount = useMemo(() => problems.filter(p => p.isSolved).length, [problems]);
  const totalCount = problems.length;
  
  if (totalCount === 0) {
    return null; // Don't render empty categories
  }

  return (
    <section className="w-full bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-lg overflow-hidden">
      {/* Category Header */}
      <button 
        className="w-full flex justify-between items-center p-4 bg-slate-900/50 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">{category}</h2>
          <span className="text-sm font-medium text-slate-400 bg-slate-700/50 px-2.5 py-0.5 rounded-full">
            {solvedCount} / {totalCount} Solved
          </span>
        </div>
        <ChevronsUpDown 
          size={20} 
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Problems Stacked List */}
      {isOpen && (
        <div className="p-4 flex flex-col gap-3">
          {problems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              onSelect={onSelectProblem}
              onEdit={onEditProblem}
              onToggleSolve={onToggleSolve}
            />
          ))}
        </div>
      )}
    </section>
  );
}


// --- ProblemModal (Detail View) ---
interface ProblemModalProps {
  problem: Problem | null;
  onClose: () => void;
}
function ProblemModal({ problem, onClose }: ProblemModalProps) {
  if (!problem) return null;

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="relative w-full max-w-3xl bg-slate-800/80 backdrop-blur-2xl border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-900/20 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-700/70 rounded-full text-slate-300 hover:bg-cyan-500/80 hover:text-slate-900 transition-all"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-4 pr-10">{problem.title}</h2>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-block bg-cyan-600/30 text-cyan-200 border border-cyan-500/40 text-sm font-medium px-3 py-1 rounded-full">
            {problem.category}
          </span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${difficultyColorMap[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          {problem.isSolved && (
             <span className="inline-flex items-center gap-1.5 bg-green-600/30 text-green-300 border border-green-500/50 text-sm font-medium px-3 py-1 rounded-full">
              <CheckCircle size={16} />
              Solved
            </span>
          )}
        </div>

        {/* Full-size Image */}
        {problem.imageUrl && (
          <div className="mb-6 rounded-lg overflow-hidden border border-slate-700">
            <img 
              src={problem.imageUrl} 
              alt={problem.title} 
              className="w-full h-auto object-contain" 
              onError={(e) => (e.currentTarget.src = "https://placehold.co/600x300/0f172a/334155?text=Image+Not+Found")}
            />
          </div>
        )}

        {/* Notes */}
        {problem.notes && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">Notes</h3>
            <p className="text-slate-200 whitespace-pre-wrap">{problem.notes}</p>
          </div>
        )}

        {/* Code Snippet */}
        {problem.code && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">Code Snippet</h3>
            <div className="bg-slate-900/70 border border-slate-700 rounded-lg overflow-hidden">
              <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                <code className="font-mono">{problem.code}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ProblemFormModal (Add/Edit) ---
interface ProblemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (problem: ProblemFormData) => void;
  onDelete?: (id: string) => void; // Optional delete
  initialData: Problem | null;
}
function ProblemFormModal({ isOpen, onClose, onSave, onDelete, initialData }: ProblemFormModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [notes, setNotes] = useState('');
  const [code, setCode] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isSolved, setIsSolved] = useState(false); // New state for solved
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit mode
        setTitle(initialData.title);
        setCategory(initialData.category);
        setDifficulty(initialData.difficulty);
        setNotes(initialData.notes);
        setCode(initialData.code);
        setImageUrl(initialData.imageUrl);
        setIsSolved(initialData.isSolved); // Set solved state
        setImageFile(null);
      } else {
        // Add mode
        setTitle('');
        setCategory(CATEGORIES[0]);
        setDifficulty(DIFFICULTIES[0]);
        setNotes('');
        setCode('');
        setImageFile(null);
        setImageUrl(undefined);
        setIsSolved(false); // Default to not solved
      }
    }
  }, [initialData, isOpen]);

  const resetAndClose = () => {
    onClose();
    setIsSaving(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || isSaving) return;

    setIsSaving(true);
    
    let finalImageUrl = imageUrl;
    if (imageFile) {
      try {
        finalImageUrl = await convertFileToDataURL(imageFile);
      } catch (error) {
        console.error("Error converting image:", error);
        setIsSaving(false);
        return;
      }
    }

    const problemData: ProblemFormData = {
      title,
      category,
      difficulty,
      notes,
      code,
      imageUrl: finalImageUrl,
      isSolved, // Add solved state to saved data
    };

    onSave(problemData);
    resetAndClose();
  };

  const handleDelete = () => {
    // Note: Replaced confirm() with a simple prompt for compatibility.
    // In a real app, you'd build a custom modal for this.
    const isConfirmed = window.prompt(`Type DELETE to confirm deletion of "${initialData?.title}"`) === "DELETE";
    if (initialData && onDelete && isConfirmed) {
      onDelete(initialData.id);
      resetAndClose();
    }
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const tempUrl = URL.createObjectURL(file);
      setImageUrl(tempUrl);
    }
  };
  
  const formInputClass = "block w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500";
  const formLabelClass = "block text-sm font-medium text-cyan-300 mb-1";

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-3xl bg-slate-800/80 backdrop-blur-2xl border border-slate-700 rounded-2xl shadow-2xl shadow-cyan-900/20 max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {initialData ? 'Edit Problem' : 'Add New Problem'}
            </h2>
            <button
              type="button"
              onClick={resetAndClose}
              className="p-1.5 bg-slate-700/70 rounded-full text-slate-300 hover:bg-cyan-500/80 hover:text-slate-900 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className={formLabelClass}>Problem Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={formInputClass} required />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className={formLabelClass}>Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className={formInputClass}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" className={formLabelClass}>Difficulty</label>
              <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className={formInputClass}>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className={formLabelClass}>Image (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700/80 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imageUrl ? (
                     <img src={imageUrl} alt="Preview" className="mx-auto h-32 w-auto object-contain rounded-md" />
                  ) : (
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-500" />
                  )}
                  <div className="flex justify-center text-sm text-slate-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-cyan-300 hover:text-cyan-200 px-2 py-1">
                      <span>{imageUrl ? 'Change image' : 'Upload a file'}</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleImageChange} />
                    </label>
                  </div>
                  {imageUrl && (
                     <button type="button" onClick={() => { setImageUrl(undefined); setImageFile(null); }} className="text-xs text-red-400 hover:text-red-300">
                      Remove image
                     </button>
                  )}
                  {!imageUrl && <p className="text-xs text-slate-500">PNG or JPG</p>}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className={formLabelClass}>Short Notes / Explanation</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={formInputClass}></textarea>
            </div>

            {/* Code Snippet */}
            <div className="md:col-span-2">
              <label htmlFor="code" className={formLabelClass}>Code Snippet</label>
              <textarea id="code" value={code} onChange={(e) => setCode(e.target.value)} rows={10} className={`${formInputClass} font-mono text-sm`}></textarea>
            </div>
            
            {/* Solved Checkbox */}
            <div className="md:col-span-2 flex items-center gap-2">
               <input
                type="checkbox"
                id="isSolved"
                checked={isSolved}
                onChange={(e) => setIsSolved(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              <label htmlFor="isSolved" className="text-sm font-medium text-slate-200">
                Mark as Solved
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <div>
              {initialData && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 font-medium py-2 px-4 rounded-lg transition-all"
                  disabled={isSaving}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={resetAndClose}
                className="bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 font-semibold py-2 px-5 rounded-lg transition-all"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2 px-5 rounded-lg shadow-md shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Problem'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- MAIN APP COMPONENT ---

function App() {
  // === STATE ===
  const [problems, setProblems] = useLocalStorage<Problem[]>("coding-memo-decks", initialData);
  
  // Modal State
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [problemToEdit, setProblemToEdit] = useState<Problem | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // === DERIVED STATE ===
  const groupedProblems = useMemo(() => {
    // Group problems by category
    const groups: Record<Category, Problem[]> = {
      "Binary Search": [],
      "Dynamic Programming": [],
      "Graphs": [],
      "Arrays": [],
      "Strings": [],
      "Other": [],
    };

    for (const problem of problems) {
      if (groups[problem.category]) {
        groups[problem.category].push(problem);
      } else {
        groups.Other.push(problem); // Fallback for any unknown category
      }
    }
    return groups;
  }, [problems]);

  // === HANDLERS ===
  const handleOpenAddForm = () => {
    setProblemToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditForm = (problem: Problem) => {
    setProblemToEdit(problem);
    setIsFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
    setProblemToEdit(null); // Clear edit state on close
  };

  const handleSaveProblem = (formData: ProblemFormData) => {
    if (problemToEdit) {
      // Edit existing problem
      setProblems(prev => 
        prev.map(p => 
          p.id === problemToEdit.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      // Add new problem
      const newProblem: Problem = {
        ...formData,
        id: crypto.randomUUID(),
      };
      setProblems(prev => [newProblem, ...prev]);
    }
  };

  const handleDeleteProblem = (id: string) => {
    setProblems(prev => prev.filter(p => p.id !== id));
  };
  
  const handleToggleSolve = (id: string) => {
    setProblems(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isSolved: !p.isSolved } : p
      )
    );
  };

  return (
    <div className="min-h-screen selection:bg-cyan-500/30">
      <GlobalStyles />
      <main className="flex flex-col items-center pb-24 px-4 gap-6">
        {/* Header */}
        <Header onAddProblem={handleOpenAddForm} />
        
        {/* Modular Category Sections */}
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
          {CATEGORIES.map(category => (
            <CategorySection
              key={category}
              category={category}
              problems={groupedProblems[category] || []}
              onSelectProblem={setSelectedProblem}
              onEditProblem={handleOpenEditForm}
              onToggleSolve={handleToggleSolve}
            />
          ))}
        </div>

      </main>

      {/* Modals */}
      <ProblemModal
        problem={selectedProblem}
        onClose={() => setSelectedProblem(null)}
      />
      
      <ProblemFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseForm}
        onSave={handleSaveProblem}
        onDelete={handleDeleteProblem}
        initialData={problemToEdit}
      />
    </div>
  );
}

export default App;
