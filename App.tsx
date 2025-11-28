
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ExternalLink, Bookmark, Hash, Globe, Sparkles, Moon, Sun, Grid, List, Copy, Check, Heart, X, Plus, Trash2 } from 'lucide-react';
import { CATEGORIES, SITES } from './constants';
import { Category, Site } from './types';

// Simple Toast Component
const Toast = ({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white dark:bg-white dark:text-gray-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 animate-fade-in-up text-sm font-medium">
      <Check className="w-4 h-4 text-green-400 dark:text-green-600" />
      {message}
    </div>
  );
};

// Add Site Modal Component
interface AddSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (site: Site) => void;
}

const AddSiteModal: React.FC<AddSiteModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: '기타' as Category,
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSite: Site = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
      description: formData.description || '사용자 추가 사이트',
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      isCustom: true
    };
    onAdd(newSite);
    setFormData({ name: '', url: '', description: '', category: '기타', tags: '' }); // Reset
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">나만의 사이트 추가</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">사이트 이름 *</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="예: 내 블로그"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL (주소) *</label>
              <input 
                required
                type="text" 
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">카테고리</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {CATEGORIES.filter(c => c !== '전체' && c !== '즐겨찾기').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">설명</label>
              <input 
                type="text" 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="간단한 설명 (선택)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">태그</label>
              <input 
                type="text" 
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="쉼표(,)로 구분 (예: 개인, 메모)"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors mt-2"
            >
              추가하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customSites, setCustomSites] = useState<Site[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load state from local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedCustomSites = localStorage.getItem('customSites');
    if (savedCustomSites) setCustomSites(JSON.parse(savedCustomSites));

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link click
    e.stopPropagation();
    
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(fav => fav !== id);
      showToast('즐겨찾기에서 제거되었습니다');
    } else {
      newFavorites = [...favorites, id];
      showToast('즐겨찾기에 추가되었습니다');
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addCustomSite = (site: Site) => {
    const newCustomSites = [...customSites, site];
    setCustomSites(newCustomSites);
    localStorage.setItem('customSites', JSON.stringify(newCustomSites));
    showToast('사이트가 추가되었습니다');
    // If added to current category or All, it will show up automatically
    if (selectedCategory !== '전체' && selectedCategory !== site.category) {
      setSelectedCategory(site.category);
    }
  };

  const deleteCustomSite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('정말 이 사이트를 삭제하시겠습니까?')) {
      const newCustomSites = customSites.filter(site => site.id !== id);
      setCustomSites(newCustomSites);
      localStorage.setItem('customSites', JSON.stringify(newCustomSites));
      
      // Also remove from favorites if it was there
      if (favorites.includes(id)) {
        const newFavorites = favorites.filter(fav => fav !== id);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
      
      showToast('사이트가 삭제되었습니다');
    }
  };

  const showToast = (message: string) => {
    setToast({ visible: true, message });
  };

  // Filter sites logic
  const filteredSites = useMemo(() => {
    // Combine static SITES and dynamic customSites
    const allSites = [...customSites, ...SITES];

    return allSites.filter((site) => {
      // 1. Filter by Category
      if (selectedCategory === '즐겨찾기') {
        if (!favorites.includes(site.id)) return false;
      } else if (selectedCategory !== '전체' && site.category !== selectedCategory) {
        return false;
      }

      // 2. Filter by Search
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      const matchesSearch = 
        site.name.toLowerCase().includes(query) || 
        site.description.toLowerCase().includes(query) ||
        site.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesSearch;
    });
  }, [selectedCategory, searchQuery, favorites, customSites]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Header Section */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
            
            {/* Logo & Title */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {
                  setSelectedCategory('전체');
                  setSearchQuery('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
                <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">LifeLinks</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">유용한 사이트 모음집</p>
                </div>
              </div>
              
              {/* Mobile Controls */}
              <div className="flex items-center gap-2 md:hidden">
                 <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-blue-600 dark:text-blue-400">
                   <Plus className="w-6 h-6" />
                 </button>
                 <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-dark-card placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                placeholder="사이트, 태그 검색..."
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                </button>
              )}
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg mr-2"
              >
                <Plus className="w-4 h-4" /> 사이트 추가
              </button>

              <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex items-center">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={toggleTheme} 
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {category === '즐겨찾기' && <Heart className={`w-3.5 h-3.5 ${selectedCategory === '즐겨찾기' ? 'fill-current' : ''}`} />}
                {category === 'AI/도구' && <Sparkles className="w-3.5 h-3.5" />}
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            {selectedCategory === '전체' ? <Globe className="w-6 h-6 text-blue-500" /> : 
             selectedCategory === '즐겨찾기' ? <Heart className="w-6 h-6 text-pink-500 fill-pink-500" /> :
             selectedCategory === 'AI/도구' ? <Sparkles className="w-6 h-6 text-purple-500" /> :
             <Hash className="w-6 h-6 text-blue-500" />}
            {selectedCategory}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              {filteredSites.length}
            </span>
          </h2>
          
          <div className="md:hidden flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
             <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
          </div>
        </div>

        {/* Content Layout */}
        {filteredSites.length > 0 ? (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' 
              : 'grid grid-cols-1 gap-3'
            }
          `}>
            {filteredSites.map((site) => (
              <SiteCard 
                key={site.id} 
                site={site} 
                viewMode={viewMode}
                isFavorite={favorites.includes(site.id)}
                onToggleFavorite={toggleFavorite}
                onCopy={(text) => {
                  navigator.clipboard.writeText(text);
                  showToast('주소가 복사되었습니다');
                }}
                onDelete={site.isCustom ? (e) => deleteCustomSite(site.id, e) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-dark-card rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            {selectedCategory === '즐겨찾기' ? (
              <>
                <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">즐겨찾는 사이트가 없습니다</h3>
                <p className="text-gray-500 dark:text-gray-400">하트 아이콘을 눌러 자주 쓰는 사이트를 추가해보세요.</p>
              </>
            ) : (
              <>
                <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">검색 결과가 없습니다</h3>
                <p className="text-gray-500 dark:text-gray-400">다른 키워드나 카테고리를 선택해보세요.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('전체');}}
                  className="mt-6 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  전체 목록 보기
                </button>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border mt-auto py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 LifeLinks Korea. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            본 사이트는 유용한 웹사이트 정보를 제공할 뿐, 각 서비스의 운영과는 무관합니다.
          </p>
        </div>
      </footer>
      
      <Toast message={toast.message} visible={toast.visible} onClose={() => setToast(prev => ({ ...prev, visible: false }))} />
      <AddSiteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addCustomSite} />
    </div>
  );
}

// Site Card Component
interface SiteCardProps {
  site: Site;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onCopy: (text: string) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ site, viewMode, isFavorite, onToggleFavorite, onCopy, onDelete }) => {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden
        ${viewMode === 'grid' 
          ? 'rounded-2xl h-full flex flex-col hover:-translate-y-1' 
          : 'rounded-xl flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800'
        }
      `}
    >
      {/* Card Content Wrapper */}
      <div className={`${viewMode === 'grid' ? 'p-6 flex flex-col h-full' : 'flex items-center w-full gap-4'}`}>
        
        {/* Popular/New Badges (Grid Only) */}
        {viewMode === 'grid' && (
          <div className="absolute top-4 right-4 z-10 flex gap-1">
            {site.popular && (
              <span className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                <Sparkles className="w-3 h-3" /> 추천
              </span>
            )}
            {site.isCustom && (
              <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                MY
              </span>
            )}
          </div>
        )}

        {/* Icon */}
        <div className={`flex-shrink-0 flex items-center justify-center font-bold text-lg shadow-sm rounded-xl transition-colors
          ${getCategoryColor(site.category)}
          ${viewMode === 'grid' ? 'w-12 h-12 mb-4 text-xl' : 'w-10 h-10 text-base'}
        `}>
          {site.name.charAt(0)}
        </div>

        {/* Text Info */}
        <div className={`flex-grow min-w-0 ${viewMode === 'list' && 'flex flex-col'}`}>
          <div className="flex items-center gap-2 mb-1">
             <h3 className={`font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate
               ${viewMode === 'grid' ? 'text-lg' : 'text-base'}
             `}>
              {site.name}
            </h3>
            {viewMode === 'list' && site.popular && (
               <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            )}
             {viewMode === 'list' && site.isCustom && (
               <span className="text-[10px] bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">MY</span>
            )}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
          </div>
          
          <p className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed
            ${viewMode === 'grid' ? 'line-clamp-2 mb-4' : 'line-clamp-1'}
          `}>
            {site.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`flex items-center gap-1 z-20 ${viewMode === 'grid' ? 'mt-auto pt-4 border-t border-gray-50 dark:border-gray-700/50 justify-between' : 'ml-4 flex-shrink-0'}`}>
          
          {/* Tags (Grid Only) */}
          {viewMode === 'grid' && (
            <div className="flex flex-wrap gap-1.5 flex-1 mr-2">
              {site.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-1">
             <button
              onClick={(e) => {
                e.preventDefault();
                onCopy(site.url);
              }}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="주소 복사"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => onToggleFavorite(site.id, e)}
              className={`p-2 rounded-full transition-all focus:opacity-100
                ${isFavorite 
                  ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30' 
                  : 'text-gray-300 hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100'
                }
              `}
              title="즐겨찾기"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
             {/* Delete Button for Custom Sites */}
             {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="사이트 삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

// Helper function to assign colors based on category
const getCategoryColor = (category: string) => {
  if (category === '공공/민원') return 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300';
  if (category === '생활/편의') return 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300';
  if (category === '금융/부동산') return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300';
  if (category === '쇼핑/여행') return 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300';
  if (category === '취업/직장') return 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300';
  if (category === '미디어/정보') return 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300';
  if (category === '디자인/이미지') return 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300';
  if (category === '개발/IT') return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
  if (category === '학습/자기계발') return 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-300';
  if (category === 'AI/도구') return 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300';
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
};
