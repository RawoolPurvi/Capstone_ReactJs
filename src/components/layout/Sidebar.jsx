import React from 'react';
import { CATEGORIES } from '../../data/booksData';
import { useBookStore } from '../../context/BookStoreContext';

const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { selectedCategory, setSelectedCategory } = useBookStore();

  const handleSelect = (category) => {
    setSelectedCategory(category);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`w-56 shrink-0 bg-[#16181f] border-r border-[#262b37] min-h-[calc(100vh-3.5rem)] py-3 px-2 flex flex-col z-30 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isMobileOpen
            ? 'fixed top-14 left-0 bottom-0 translate-x-0 shadow-2xl'
            : 'fixed -translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase px-3 py-1 mb-1">
          Categories
        </div>

        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors truncate ${
                  isSelected
                    ? 'bg-[#252936] text-blue-400 font-semibold border-l-2 border-blue-500 pl-2.5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1d2028]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
