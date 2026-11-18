import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Star, BookOpen, MapPin, Check } from 'lucide-react';
import { WRITERS_DATA } from '../data/writersData';
import { BOOKS_DATA } from '../data/booksData';
import BookCover from '../components/common/BookCover';

const WritersPage = () => {
  const [followingWriters, setFollowingWriters] = useState(['daniel-reed', 'arjun-patel']);

  const toggleFollow = (writerId) => {
    setFollowingWriters((prev) =>
      prev.includes(writerId) ? prev.filter((id) => id !== writerId) : [...prev, writerId]
    );
  };

  return (
    <div className="max-w-[1500px] w-full mx-auto px-4 lg:px-6 py-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-zinc-400 mb-6">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-blue-400 font-medium">My Writers & Authors</span>
      </nav>

      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#282d3b]">
        <div>
          <h1 className="text-xl font-bold text-white">Featured Writers & Authors</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Follow authors, explore their published works, and get notified about new book launches.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {WRITERS_DATA.map((writer) => {
          const isFollowing = followingWriters.includes(writer.id);
          const authorBooks = BOOKS_DATA.filter((b) => b.writerId === writer.id);

          return (
            <div
              key={writer.id}
              id={writer.id}
              className="bg-[#181a23] border border-[#282d3b] rounded-xl p-6 shadow-md transition-all hover:border-[#384052]"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* Author Info */}
                <div className="flex items-start space-x-4">
                  <img
                    src={writer.avatar}
                    alt={writer.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/40 shrink-0 shadow-lg"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">{writer.name}</h3>
                      <span className="bg-blue-950/60 text-blue-300 border border-blue-700/50 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {writer.role}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 flex items-center space-x-1">
                      <MapPin size={12} className="text-zinc-500" />
                      <span>{writer.location}</span>
                      <span>•</span>
                      <span className="text-zinc-300 font-medium">{writer.followers} Followers</span>
                    </p>

                    <p className="text-xs text-zinc-300 pt-2 leading-relaxed max-w-2xl">
                      {writer.bio}
                    </p>
                  </div>
                </div>

                {/* Follow Button */}
                <div className="shrink-0">
                  <button
                    onClick={() => toggleFollow(writer.id)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                      isFollowing
                        ? 'bg-[#252936] text-zinc-300 border border-zinc-700 hover:bg-[#2e3444]'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check size={14} className="text-blue-400" />
                        <span>Following</span>
                      </>
                    ) : (
                      <span>Follow Author</span>
                    )}
                  </button>
                </div>

              </div>

              {/* Author's Books in Catalog */}
              {authorBooks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#262a37]">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                    Books by {writer.name}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {authorBooks.map((b) => (
                      <Link
                        key={b.id}
                        to={`/book/${b.id}`}
                        className="bg-[#12141a] hover:bg-[#1a1c24] border border-[#262a36] hover:border-blue-500/50 rounded-lg p-3 flex space-x-3 transition-all"
                      >
                        <div className="shrink-0">
                          <BookCover book={b} size="sm" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate">{b.title}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{b.format}</p>
                          <p className="text-xs font-bold text-white mt-2">₹{b.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default WritersPage;
