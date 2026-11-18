import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, TrendingUp, Rocket, RefreshCw, X } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import BookCard from '../components/common/BookCard';
import { LANGUAGES, FORMATS, PRICE_RANGES } from '../data/booksData';
import { useBookStore } from '../context/BookStoreContext';

const HomePage = () => {
  const {
    books,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLanguage,
    setSelectedLanguage,
    selectedFormat,
    setSelectedFormat,
    selectedPriceRange,
    setSelectedPriceRange,
    sortBy,
    setSortBy,
    orders
  } = useBookStore();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchAuthor = book.author.toLowerCase().includes(query);
        const matchGenre = book.genreTags?.some(g => g.toLowerCase().includes(query));
        if (!matchTitle && !matchAuthor && !matchGenre) return false;
      }

      // Category
      if (selectedCategory !== 'All' && book.category !== selectedCategory) {
        if (!book.genreTags?.includes(selectedCategory)) {
          return false;
        }
      }

      // Language
      if (selectedLanguage !== 'All' && book.language !== selectedLanguage) {
        return false;
      }

      // Format
      if (selectedFormat !== 'All' && book.format !== selectedFormat) {
        return false;
      }

      // Price Range
      const rangeObj = PRICE_RANGES.find(r => r.label === selectedPriceRange);
      if (rangeObj) {
        if (book.price < rangeObj.min || book.price > rangeObj.max) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      if (sortBy === 'Bestseller') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // Default Relevance
    });
  }, [books, searchQuery, selectedCategory, selectedLanguage, selectedFormat, selectedPriceRange, sortBy]);

  const isFilteringActive =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedLanguage !== 'All' ||
    selectedFormat !== 'All' ||
    selectedPriceRange !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLanguage('All');
    setSelectedFormat('All');
    setSelectedPriceRange('All');
    setSortBy('Relevance');
  };

  // Grouped sections for Default Landing Page
  const recommendedBooks = books.filter(b => b.featured === 'recommended').slice(0, 3);
  const bestsellers = books.filter(b => b.featured === 'bestseller').slice(0, 3);
  const newLaunches = books.filter(b => b.featured === 'new-launch').slice(0, 3);

  return (
    <div className="flex-1 flex max-w-[1500px] w-full mx-auto">
      
      {/* Left Category Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 lg:p-6 overflow-y-auto">
        
        {/* Top Controls & Search Bar (Matches Image 3 & 4) */}
        <div className="bg-[#181a22] border border-[#272c3a] rounded-lg p-3 mb-6 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            
            {/* Mobile Category Toggle Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center space-x-2 py-2 px-3 bg-[#242836] border border-zinc-700 text-xs rounded-md text-white font-medium"
            >
              <SlidersHorizontal size={14} />
              <span>Browse Categories ({selectedCategory})</span>
            </button>

            {/* Search Input Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search you want to read here"
                className="w-full bg-[#111216] border border-[#2b3040] rounded-md py-2 pl-3 pr-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              ) : (
                <Search size={14} className="absolute right-3 top-2.5 text-zinc-500 pointer-events-none" />
              )}
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              {/* Language */}
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 mb-0.5">Language</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-[#111216] border border-[#2b3040] text-zinc-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 mb-0.5">Format</span>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="bg-[#111216] border border-[#2b3040] text-zinc-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  {FORMATS.map(fmt => (
                    <option key={fmt} value={fmt}>{fmt}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 mb-0.5">Price Range</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="bg-[#111216] border border-[#2b3040] text-zinc-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  {PRICE_RANGES.map(p => (
                    <option key={p.label} value={p.label}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 mb-0.5">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#111216] border border-[#2b3040] text-zinc-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="Relevance">Relevance</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Rating">Rating</option>
                  <option value="Bestseller">Bestseller</option>
                </select>
              </div>

            </div>

          </div>

          {/* Active Filter Chips */}
          {isFilteringActive && (
            <div className="mt-3 pt-2.5 border-t border-[#272c3a] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="text-zinc-500 text-[11px]">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-blue-900/40 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded text-[11px]">
                    Category: {selectedCategory}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-blue-900/40 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded text-[11px]">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedFormat !== 'All' && (
                  <span className="bg-blue-900/40 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded text-[11px]">
                    Format: {selectedFormat}
                  </span>
                )}
                {selectedPriceRange !== 'All' && (
                  <span className="bg-blue-900/40 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded text-[11px]">
                    Price: {selectedPriceRange}
                  </span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-red-400 hover:text-red-300 underline font-medium"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Display: Filtered View VS Sectioned View */}
        {isFilteringActive ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">
                Results ({filteredBooks.length} books found)
              </h2>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="p-12 text-center bg-[#171922] border border-[#282d3b] rounded-lg">
                <p className="text-zinc-400 text-sm">No books found matching your current filter criteria.</p>
                <button
                  onClick={resetFilters}
                  className="mt-3 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Section 1: Recommended for You */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles size={16} className="text-yellow-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Recommended for You
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>

            {/* Section 2: Bestsellers this Month */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp size={16} className="text-blue-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Bestsellers this Month
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bestsellers.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>

            {/* Section 3: New Launches */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Rocket size={16} className="text-emerald-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  New Launches
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newLaunches.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>

          </div>
        )}

      </main>

    </div>
  );
};

export default HomePage;
