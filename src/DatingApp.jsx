import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  X, 
  Star, 
  MessageCircle, 
  User, 
  Settings, 
  ChevronLeft, 
  Send, 
  MapPin, 
  Info, 
  Zap,
  Filter,
  SlidersHorizontal,
  Check,
  MoreVertical,
  Bell,
  RotateCcw,
  Sparkles,
  Wine,
  Cigarette,
  Ruler,
  Moon,
  CalendarHeart,
  Clock,
  Coffee,
  Utensils,
  Martini,
  Footprints,
  Palette,
  Type,
  MoveUp,
  ArrowLeft,
  Search,
  Ticket,
  Edit, 
  Mars,
  Venus,
  Users,
  Shield,
  Lock,
  Map as MapIcon,
  List,
  Navigation
} from 'lucide-react';

// --- THEME & STYLES ---
const THEME = {
  gradient: 'bg-gradient-to-tr from-pink-600 to-rose-400',
  gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-400',
  bgSoft: 'bg-pink-50/50',
  accentPink: 'text-pink-600',
  accentPurple: 'text-purple-500', 
};

// --- CONSTANTS ---
const CHAT_BACKGROUNDS = [
  { id: 'default', label: 'Classic', class: 'bg-gray-50' },
  { id: 'hearts', label: 'Hearts', class: 'bg-[radial-gradient(#f9a8d4_1px,transparent_1px)] [background-size:16px_16px] bg-pink-50' },
  { id: 'dark', label: 'Midnight', class: 'bg-gray-900' },
  { id: 'gradient', label: 'Sunset', class: 'bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100' },
  { id: 'clouds', label: 'Dreamy', class: 'bg-blue-50' },
];

const FONTS = [
  { id: 'sans', label: 'Modern', class: 'font-sans' },
  { id: 'serif', label: 'Classy', class: 'font-serif' },
  { id: 'mono', label: 'Tech', class: 'font-mono' },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Alex matched with you!", time: "2m ago", icon: Heart, color: "text-pink-600", bg: "bg-pink-100" },
  { id: 2, text: "Priya sent a message", time: "1h ago", icon: MessageCircle, color: "text-purple-600", bg: "bg-purple-100" },
  { id: 3, text: "Lucas liked your photo", time: "3h ago", icon: Star, color: "text-orange-500", bg: "bg-orange-100" },
  { id: 4, text: "Don't forget to complete your profile", time: "1d ago", icon: User, color: "text-blue-500", bg: "bg-blue-100" },
];

const ALL_PROFILES = [
  {
    id: 1,
    name: 'Sarah',
    age: 24,
    gender: 'female',
    distance: 3,
    bio: 'Adventure seeker 🏔️ Coffee enthusiast ☕️ looking for someone to explore the city with.',
    interests: ['Hiking', 'Photography', 'Sushi'],
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'],
    job: 'Graphic Designer',
    basics: { height: '5\'6"', zodiac: 'Leo', education: 'BFA Design' },
    lifestyle: { smoking: 'No', drinking: 'Socially', pets: 'Dog Lover' },
    coords: { top: '30%', left: '40%' }
  },
  {
    id: 2,
    name: 'Lucas',
    age: 29,
    gender: 'male',
    distance: 12,
    bio: 'Photographer by day, jazz musician by night. 🎷 Let’s make some noise.',
    interests: ['Jazz', 'Photography', 'Vinyl'],
    images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'],
    job: 'Freelance Photographer',
    basics: { height: '6\'1"', zodiac: 'Virgo', education: 'Berklee' },
    lifestyle: { smoking: 'Sometimes', drinking: 'Yes', pets: 'Cat Dad' },
    coords: { top: '50%', left: '70%' }
  },
  {
    id: 4,
    name: 'Zain',
    age: 25,
    gender: 'male',
    distance: 6,
    bio: 'Tech founder. I speak Python better than English. 🐍',
    interests: ['Startups', 'Coding', 'Travel'],
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'],
    job: 'CTO @ Stealth',
    basics: { height: '5\'11"', zodiac: 'Capricorn', education: 'Stanford' },
    lifestyle: { smoking: 'No', drinking: 'No', pets: 'Dog' },
    coords: { top: '20%', left: '60%' }
  },
  {
    id: 5,
    name: 'Priya',
    age: 23,
    gender: 'female',
    distance: 2,
    bio: 'Dancer & Choreographer. 💃 Always moving. Catch me if you can.',
    interests: ['Dance', 'Hip Hop', 'Fashion'],
    images: ['https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80'],
    job: 'Choreographer',
    basics: { height: '5\'4"', zodiac: 'Aries', education: 'Arts School' },
    lifestyle: { smoking: 'No', drinking: 'Socially', pets: 'None' },
    coords: { top: '60%', left: '20%' }
  },
  {
    id: 6,
    name: 'Tom',
    age: 31,
    gender: 'male',
    distance: 15,
    bio: 'Sous Chef. I make a mean risotto. 🥘 Looking for a taste tester.',
    interests: ['Cooking', 'Foodie', 'Cycling'],
    images: ['https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=800&q=80'],
    job: 'Sous Chef',
    basics: { height: '6\'2"', zodiac: 'Taurus', education: 'Culinary Inst.' },
    lifestyle: { smoking: 'No', drinking: 'Yes', pets: 'None' },
    coords: { top: '75%', left: '50%' }
  },
  {
    id: 7,
    name: 'Nina',
    age: 27,
    gender: 'female',
    distance: 9,
    bio: 'Yoga Instructor 🧘‍♀️. Finding balance in chaos.',
    interests: ['Yoga', 'Meditation', 'Tea'],
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'],
    job: 'Yoga Teacher',
    basics: { height: '5\'8"', zodiac: 'Pisces', education: 'Certified' },
    lifestyle: { smoking: 'No', drinking: 'No', pets: 'Cat' },
    coords: { top: '15%', left: '30%' }
  },
  // ... other profiles would have coords added similarly for Map View
];

const INITIAL_MATCHES = [
  {
    id: 101,
    name: 'Chloe',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Hey! How was your weekend?',
    timestamp: '2m ago',
    unread: true,
    isOnline: true
  },
  {
    id: 102,
    name: 'Alex',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'That sounds amazing! 🤩',
    timestamp: '1h ago',
    unread: false,
    isOnline: false
  },
  {
    id: 103,
    name: 'Sam',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Sent you a photo',
    timestamp: '3h ago',
    unread: false,
    isOnline: true
  }
];

const INITIAL_MESSAGES = {
  101: [
    { sender: 'them', text: 'Hey! How was your weekend?', time: '10:30 AM', type: 'text' }
  ],
  102: [
    { sender: 'me', text: 'I really liked your bio, do you really play jazz flute?', time: 'Yesterday', type: 'text' },
    { sender: 'them', text: 'Haha yes! It started as a joke but now I love it. 🎵', time: 'Yesterday', type: 'text' },
    { sender: 'me', text: 'That is incredible. We need to do a duet sometime.', time: 'Yesterday', type: 'text' },
    { sender: 'them', text: 'That sounds amazing! 🤩', time: 'Yesterday', type: 'text' }
  ],
  103: [
    { sender: 'them', text: 'Check out this view from my hike today!', time: '1:00 PM', type: 'text' },
    { sender: 'them', text: 'Sent you a photo', time: '1:01 PM', type: 'image' }
  ]
};

// --- SUB COMPONENTS (DEFINED OUTSIDE MAIN) ---

const LovrLogo = ({ className, color = "brand" }) => (
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900.000000 243.000000" className={className} preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,243.000000) scale(0.100000,-0.100000)" fill={color === "white" ? "#FFFFFF" : "#db2777"} stroke="none">
      <path d="M2692 2134 l-22 -15 0 -766 c0 -757 0 -765 21 -794 l20 -29 418 0 418 0 21 23 c18 20 20 33 19 125 -3 146 6 141 -257 143 -271 2 -314 4 -328 13 -9 5 -12 159 -12 641 l0 634 -22 21 c-19 18 -35 20 -138 20 -88 0 -121 -4 -138 -16z m88 -34 c0 -5 -9 -10 -20 -10 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 -4 20 -10z m170 -126 c0 -13 -4 -24 -10 -24 -5 0 -10 14 -10 31 0 17 4 28 10 24 6 -3 10 -17 10 -31z m-10 -1053 c13 -25 13 -51 0 -51 -5 0 -10 10 -10 23 0 13 -5 28 -12 35 -9 9 -9 12 0 12 6 0 16 -9 22 -19z m590 -171 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0 6 7 10 15 10 8 0 15 -4 15 -10z"/>
      <path d="M766 2090 c-65 -23 -162 -88 -213 -143 -42 -45 -113 -164 -113 -190 0 -8 -7 -29 -16 -47 -14 -27 -16 -54 -11 -164 6 -135 15 -174 61 -260 74 -140 333 -402 571 -578 88 -65 165 -122 170 -126 69 -52 115 -61 151 -29 26 23 39 33 79 57 22 13 42 27 45 30 3 4 23 18 45 32 22 14 49 34 60 45 11 10 52 44 92 76 97 77 359 337 416 413 58 78 95 146 109 204 15 60 15 233 1 297 -28 123 -119 259 -211 316 -43 28 -101 51 -189 77 -57 17 -239 -2 -265 -28 -7 -7 -18 -12 -25 -12 -21 0 -115 -69 -157 -116 l-39 -44 -43 40 c-24 22 -55 46 -69 52 -14 6 -25 14 -25 18 0 12 -125 70 -176 81 -84 20 -193 19 -248 -1z m724 -190 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0 6 7 10 15 10 8 0 15 -4 15 -10z m-502 -29 c9 -6 38 -20 63 -32 47 -21 117 -83 197 -172 30 -33 50 -47 68 -47 34 0 79 33 109 80 32 50 93 109 128 122 15 5 27 14 27 18 0 5 13 11 30 15 16 4 32 11 35 16 11 16 149 11 186 -8 63 -30 107 -73 141 -136 31 -59 33 -67 32 -162 -1 -92 -4 -105 -31 -156 -34 -61 -74 -109 -203 -238 -100 -101 -246 -225 -422 -361 -37 -28 -54 -25 -102 15 -22 20 -48 42 -56 49 -8 7 -44 34 -80 61 -128 97 -376 341 -404 397 -3 7 -15 27 -26 43 -30 46 -40 73 -49 137 -8 62 12 170 37 196 6 7 12 19 12 26 0 19 88 105 129 126 39 20 149 26 179 11z m1182 -221 c0 -11 -4 -20 -10 -20 -5 0 -10 9 -10 20 0 11 5 20 10 20 6 0 10 -9 10 -20z m-1590 -121 c0 -11 -4 -17 -10 -14 -5 3 -10 13 -10 21 0 8 5 14 10 14 6 0 10 -9 10 -21z m1425 -198 c7 -12 -12 -24 -25 -16 -11 7 -4 25 10 25 5 0 11 -4 15 -9z m-485 -461 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0 6 7 10 15 10 8 0 15 -4 15 -10z"/>
      <path d="M4105 1696 c-5 -2 -37 -12 -69 -21 -75 -23 -91 -31 -168 -90 -62 -47 -158 -161 -158 -188 0 -7 -4 -17 -10 -23 -5 -5 -19 -46 -31 -89 -18 -68 -20 -100 -17 -213 3 -82 9 -137 16 -144 7 -7 12 -20 12 -30 0 -46 117 -220 175 -259 19 -13 35 -27 35 -31 0 -4 21 -16 48 -28 26 -13 56 -27 66 -32 28 -15 118 -29 221 -35 87 -5 218 13 263 36 9 5 38 18 64 30 71 33 168 133 207 216 19 39 38 78 43 88 5 10 16 73 24 139 13 108 13 128 -1 197 -9 42 -20 83 -24 91 -5 9 -12 30 -15 48 -4 17 -12 34 -17 37 -4 3 -16 23 -26 43 -26 54 -139 163 -203 194 -107 53 -138 60 -285 64 -77 2 -144 2 -150 0z m-123 -108 c-9 -9 -15 -9 -24 0 -9 9 -7 12 12 12 19 0 21 -3 12 -12z m353 -149 c56 -25 144 -110 168 -162 63 -140 35 -329 -64 -427 -60 -59 -122 -85 -200 -84 -80 1 -126 20 -190 81 -45 43 -51 51 -86 128 -24 54 -24 206 1 262 37 81 51 103 95 144 83 76 186 98 276 58z m415 -546 c0 -19 -3 -24 -10 -17 -6 6 -8 18 -4 27 9 24 14 21 14 -10z m-866 -192 c3 -4 3 -11 0 -14 -8 -8 -34 3 -34 14 0 11 27 12 34 0z"/>
      <path d="M4937 1672 c-95 -9 -112 -40 -69 -118 6 -10 25 -55 42 -99 17 -44 37 -93 45 -108 8 -16 15 -35 15 -44 0 -8 6 -27 13 -41 8 -15 22 -45 31 -67 10 -22 24 -53 32 -70 7 -16 16 -42 20 -57 3 -16 10 -28 15 -28 5 0 9 -7 9 -16 0 -9 6 -28 13 -42 21 -41 54 -112 72 -157 47 -114 61 -146 85 -200 43 -95 43 -95 207 -95 l144 0 24 28 c13 15 25 37 25 49 0 12 4 24 9 28 5 3 12 19 16 36 4 17 13 42 21 57 8 15 14 35 14 44 0 9 4 19 9 22 5 3 12 18 15 33 4 16 13 42 21 58 60 129 75 163 75 173 0 7 4 20 10 30 13 24 50 110 50 117 0 6 54 123 76 167 8 14 14 31 14 36 0 6 20 54 45 106 45 97 55 143 33 151 -24 8 -207 14 -243 8 -36 -6 -38 -8 -78 -103 -4 -8 -11 -22 -15 -30 -23 -40 -33 -64 -53 -122 -11 -35 -27 -76 -34 -93 -31 -69 -45 -103 -45 -111 0 -7 -52 -154 -70 -199 -5 -11 -18 -50 -30 -87 -13 -40 -27 -68 -35 -68 -14 0 -45 53 -45 76 0 11 -19 55 -50 114 -4 9 -11 30 -14 48 -4 17 -12 34 -17 37 -5 4 -9 13 -9 22 0 8 -6 29 -13 46 -15 35 -27 69 -59 162 -11 33 -26 73 -34 88 -8 16 -14 36 -14 45 0 9 -6 29 -14 44 -8 15 -17 39 -20 55 -13 58 -37 75 -107 78 -35 2 -95 0 -132 -3z m170 -59 c3 -7 -3 -9 -17 -6 -29 8 -37 25 -9 21 12 -1 24 -8 26 -15z m703 -47 c0 -8 -4 -18 -10 -21 -5 -3 -10 3 -10 14 0 12 5 21 10 21 6 0 10 -6 10 -14z m-718 -391 c0 -5 -5 -11 -11 -13 -6 -2 -11 4 -11 13 0 9 5 15 11 13 6 -2 11 -8 11 -13z m148 -340 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z"/>
      <path d="M6273 1673 c-108 -7 -101 33 -102 -572 -1 -632 -18 -571 163 -571 108 0 125 2 140 19 15 17 17 53 19 339 1 241 5 324 15 334 6 6 12 20 12 30 0 23 84 110 127 132 23 11 59 16 127 16 92 0 96 1 113 26 13 20 17 47 16 108 -1 107 -12 133 -58 142 -48 9 -159 -4 -182 -21 -10 -8 -25 -15 -34 -15 -20 0 -99 -84 -99 -105 0 -8 -7 -15 -15 -15 -17 0 -24 27 -22 83 0 21 -5 44 -14 52 -17 17 -106 25 -206 18z"/>
    </g>
  </svg>
);

const Splash = () => (
  <div className={`absolute inset-0 z-[200] bg-white flex flex-col items-center justify-center animate-out fade-out duration-700 delay-[2800ms] fill-mode-forwards pointer-events-none`}>
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-pink-100 to-transparent"></div>
    <div className="relative animate-bounce">
        <LovrLogo className="w-64" color="brand" />
    </div>
    <p className="mt-4 text-pink-400 font-medium tracking-widest text-sm uppercase animate-pulse">Find Your Spark</p>
    <div className="mt-8 flex gap-2">
       <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
       <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-100"></div>
       <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce delay-200"></div>
    </div>
  </div>
);

const WelcomeScreen = ({ userName, setUserName, userPreference, setUserPreference, onComplete }) => (
    <div className="absolute inset-0 z-[150] bg-pink-50/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="bg-white w-full max-w-sm rounded-[40px] p-8 shadow-2xl flex flex-col items-center text-center">
            <LovrLogo className="w-40 mb-6" color="brand" />
            <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome to Lovr!</h1>
            <p className="text-gray-500 mb-8 font-medium">Let's set up your profile to find your perfect match.</p>
            
            <div className="w-full space-y-6">
                <div className="text-left">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">What's your name?</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full bg-gray-50 p-4 rounded-2xl font-bold text-gray-900 border border-transparent focus:border-pink-500 focus:bg-white focus:outline-none transition"
                      autoFocus
                    />
                </div>

                <div className="text-left">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-2 block">What's your type?</label>
                    <div className="flex gap-3">
                        <button 
                          onClick={() => setUserPreference('male')}
                          className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition ${userPreference === 'male' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-gray-50'}`}
                        >
                            <Mars size={32} className="text-pink-500 mb-2" />
                            <span className="text-sm font-bold text-gray-700">Men</span>
                        </button>
                        <button 
                          onClick={() => setUserPreference('female')}
                          className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition ${userPreference === 'female' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-gray-50'}`}
                        >
                            <Venus size={32} className="text-pink-500 mb-2" />
                            <span className="text-sm font-bold text-gray-700">Women</span>
                        </button>
                        <button 
                          onClick={() => setUserPreference('both')}
                          className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition ${userPreference === 'both' ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-gray-50'}`}
                        >
                            <Users size={32} className="text-pink-500 mb-2" />
                            <span className="text-sm font-bold text-gray-700">Both</span>
                        </button>
                    </div>
                </div>

                <button 
                  disabled={!userName || !userPreference}
                  onClick={onComplete}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition mt-4"
                >
                    Find Matches
                </button>
            </div>
        </div>
    </div>
);

const NotificationsSheet = ({ onClose }) => (
    <div className="absolute top-[80px] right-4 w-80 bg-white rounded-3xl shadow-2xl z-[150] border border-gray-100 animate-in slide-in-from-top-4 zoom-in-95 duration-300">
        <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Activity</h3>
            <button onClick={onClose} className="bg-gray-50 p-1 rounded-full hover:bg-gray-100"><X size={16} className="text-gray-400" /></button>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
            {MOCK_NOTIFICATIONS.map(n => (
                <div key={n.id} className="p-3 mb-2 rounded-2xl hover:bg-gray-50 transition flex gap-3 cursor-pointer group">
                    <div className={`w-10 h-10 rounded-full ${n.bg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition`}>
                        <n.icon size={18} className={n.color} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800 leading-tight">{n.text}</p>
                        <span className="text-xs text-gray-400 font-medium">{n.time}</span>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-3 text-center border-t border-gray-50 bg-gray-50/50 rounded-b-3xl">
            <button className="text-xs font-bold text-pink-600 hover:text-pink-700">Mark all as read</button>
        </div>
    </div>
);

const TourTooltip = ({ text, position, color = "bg-gray-900", arrow = "right", side = "left" }) => {
    // Position tooltip outside the phone frame
    const sideClass = side === 'left' ? 'right-full mr-4' : 'left-full ml-4';

    // Arrow colors for different tooltip colors
    const getArrowClass = () => {
        if (arrow === 'right') {
            // Arrow pointing right (for left-side tooltips)
            const borderColor = color === "bg-blue-600" ? "border-l-blue-600"
                : color === "bg-purple-600" ? "border-l-purple-600"
                : color === "bg-pink-600" ? "border-l-pink-600"
                : color === "bg-gray-800" ? "border-l-gray-800"
                : "border-l-gray-900";
            return `absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] ${borderColor}`;
        } else {
            // Arrow pointing left (for right-side tooltips)
            const borderColor = color === "bg-blue-600" ? "border-r-blue-600"
                : color === "bg-purple-600" ? "border-r-purple-600"
                : color === "bg-pink-600" ? "border-r-pink-600"
                : color === "bg-gray-800" ? "border-r-gray-800"
                : "border-r-gray-900";
            return `absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] ${borderColor}`;
        }
    };

    return (
        <div className={`absolute ${position} ${sideClass} z-[300] w-[200px] animate-in fade-in zoom-in-95 duration-500 pointer-events-none`}>
            <div className={`${color} text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-2xl relative`}>
                {text}
                <div className={getArrowClass()}></div>
            </div>
        </div>
    );
};

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <div 
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
           backgroundColor: ['#ec4899', '#a855f7', '#f97316'][Math.floor(Math.random() * 3)],
           top: '-10px',
           left: `${Math.random() * 100}%`,
           animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
           opacity: 0.8
        }}
      />
    ))}
    <style>{`
      @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `}</style>
  </div>
);

const LikesView = ({ setShowGoldModal }) => (
    <div className="flex-1 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Who Liked You (12)</h2>
        <div className="grid grid-cols-2 gap-3">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group" onClick={() => setShowGoldModal(true)}>
                    {/* Placeholder blurred image */}
                    <div className="absolute inset-0 bg-gray-300 filter blur-md transform scale-110"></div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition">
                         <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                             <Heart size={20} className="text-white" fill="white" />
                         </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-8 p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl text-center border border-pink-100">
             <h3 className="font-bold text-gray-900 text-lg mb-2">See who likes you</h3>
             <p className="text-sm text-gray-500 mb-4">Upgrade to Gold to see people who already liked you.</p>
             <button onClick={() => setShowGoldModal(true)} className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition">Unlock Now</button>
        </div>
    </div>
);

const MapView = ({ profiles, setShowProfileDetail }) => (
    <div className="flex-1 relative bg-gray-100 overflow-hidden">
        {/* Custom Map Background */}
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
                backgroundImage: 'url("https://www.mappedin.com/static/1d270e7e2c1f30c0f37e13eb0478a52b/homepage-hero-first-frame.webp")',
                opacity: 0.8
            }} 
        />
        
        {profiles.map((p) => (
             p.coords && (
                 <button 
                    key={p.id}
                    onClick={() => setShowProfileDetail(p.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                    style={{ top: p.coords.top, left: p.coords.left }}
                 >
                     <div className="relative">
                         <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden relative z-10 transition group-hover:scale-125 bg-white">
                             <img src={p.images[0]} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0.5 h-3 bg-white/80"></div>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-1 bg-black/20 rounded-full blur-[1px]"></div>
                     </div>
                 </button>
             )
        ))}
        
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg relative z-20 animate-pulse"></div>
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
        </div>
        
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-100 text-xs font-bold text-gray-600">
            Exploring Area
        </div>
    </div>
);

const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-in fade-in slide-in-from-bottom duration-[3000ms] fill-mode-forwards"
              style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-50px',
                  animationDelay: `${Math.random() * 2000}ms`,
                  transform: `scale(${Math.random() + 0.5})`,
                  opacity: 0,
              }}
            >
                <Heart fill={Math.random() > 0.5 ? "#db2777" : "#ec4899"} className={Math.random() > 0.5 ? "text-pink-600" : "text-rose-600"} size={Math.random() * 30 + 10} />
            </div>
        ))}
    </div>
);

const DatePlannerModal = ({ onClose, sendMessage, activeChat }) => {
  const [step, setStep] = useState(1);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState('');

  const vibes = [
      { icon: Coffee, label: 'Coffee', color: 'text-amber-600', bg: 'bg-amber-100', desc: 'Chill & Cozy' },
      { icon: Martini, label: 'Drinks', color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Fun Night' },
      { icon: Utensils, label: 'Dinner', color: 'text-pink-600', bg: 'bg-pink-100', desc: 'Romantic' },
      { icon: Footprints, label: 'Adventure', color: 'text-green-600', bg: 'bg-green-100', desc: 'Explore' },
  ];

  const times = ['Tonight', 'Tomorrow', 'This Weekend', 'Next Week'];
  const spots = ['Starbucks', 'The Ritz', 'Central Park', 'Joe\'s Pizza'];

  const sendInvite = () => {
      if (!selectedVibe) return;
      sendMessage(`Invited you to ${selectedVibe.label} at ${selectedSpot || 'a surprise spot'}!`, 'date-invite', { vibe: selectedVibe, time: selectedTime, spot: selectedSpot });
      onClose();
  };

  return (
      <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:w-[380px] sm:rounded-[32px] rounded-t-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className={`p-6 ${THEME.gradient} text-center relative`}>
                  <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white"><X size={20} /></button>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-white border border-white/30">
                      <CalendarHeart size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Date Planner</h2>
                  <p className="text-sm text-white/90 font-medium">Design the perfect meet-up</p>
              </div>
              
              <div className="p-6 min-h-[350px] bg-white">
                  {/* Progress Bar */}
                  <div className="flex gap-2 mb-6">
                      <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-pink-500' : 'bg-gray-100'}`} />
                      <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-purple-500' : 'bg-gray-100'}`} />
                      <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-orange-500' : 'bg-gray-100'}`} />
                  </div>

                  {step === 1 && (
                      <div className="space-y-4 animate-in slide-in-from-right">
                          <h3 className="font-bold text-gray-900 text-lg">What's the vibe?</h3>
                          <div className="grid grid-cols-2 gap-3">
                              {vibes.map((v, i) => (
                                  <button 
                                      key={i} 
                                      onClick={() => { setSelectedVibe(v); setStep(2); }}
                                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all text-center ${selectedVibe === v ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-white shadow-sm'}`}
                                  >
                                      <div className={`p-3 rounded-full ${v.bg} ${v.color}`}>
                                          <v.icon size={24} />
                                      </div>
                                      <div>
                                          <span className="font-bold text-gray-900 text-sm block">{v.label}</span>
                                          <span className="text-[10px] text-gray-400 font-medium">{v.desc}</span>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}
                  {step === 2 && (
                      <div className="space-y-4 animate-in slide-in-from-right">
                          <button onClick={() => setStep(1)} className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1"><ArrowLeft size={12}/> Back</button>
                          <h3 className="font-bold text-gray-900 text-lg">When are you free?</h3>
                          <div className="space-y-2">
                              {times.map((t, i) => (
                                  <button 
                                      key={i} 
                                      onClick={() => setSelectedTime(t)}
                                      className={`w-full p-4 rounded-2xl text-left font-bold text-sm transition flex justify-between items-center ${selectedTime === t ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                                  >
                                      {t}
                                      {selectedTime === t && <Check size={18} />}
                                  </button>
                              ))}
                          </div>
                          <button onClick={() => setStep(3)} disabled={!selectedTime} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold mt-4 disabled:opacity-50 hover:scale-[1.02] transition">
                              Next Step
                          </button>
                      </div>
                  )}
                  {step === 3 && (
                      <div className="space-y-4 animate-in slide-in-from-right">
                          <button onClick={() => setStep(2)} className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1"><ArrowLeft size={12}/> Back</button>
                          <h3 className="font-bold text-gray-900 text-lg">Pick a Spot (Optional)</h3>
                          
                          <div className="relative">
                              <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
                              <input 
                                  type="text" 
                                  placeholder="Search places..." 
                                  className="w-full bg-gray-50 rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-200"
                                  value={selectedSpot}
                                  onChange={(e) => setSelectedSpot(e.target.value)}
                              />
                          </div>

                          <div className="flex flex-wrap gap-2">
                              {spots.map(s => (
                                  <button key={s} onClick={() => setSelectedSpot(s)} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition">
                                      {s}
                                  </button>
                              ))}
                          </div>

                          <button 
                              onClick={sendInvite}
                              className={`w-full py-4 ${THEME.gradient} text-white rounded-2xl font-bold mt-6 hover:scale-[1.02] transition shadow-xl`}
                          >
                              Send Invitation 🚀
                          </button>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

const ChatCustomizer = ({ onClose, chatSettings, setChatSettings }) => (
    <div className="absolute top-[70px] right-4 w-64 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl z-50 border border-gray-200 animate-in fade-in zoom-in-95 duration-200 p-4">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-sm">Style Studio 🎨</h3>
            <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
        </div>
        
        <div className="space-y-4">
            <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Theme</label>
                <div className="grid grid-cols-5 gap-2">
                    {CHAT_BACKGROUNDS.map(bg => (
                        <button 
                          key={bg.id} 
                          onClick={() => setChatSettings({...chatSettings, bg: bg.id})}
                          className={`w-8 h-8 rounded-full border-2 ${bg.class} ${chatSettings.bg === bg.id ? 'border-pink-600 scale-110' : 'border-gray-200'}`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Font</label>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    {FONTS.map(f => (
                        <button 
                          key={f.id}
                          onClick={() => setChatSettings({...chatSettings, font: f.id})}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${chatSettings.font === f.id ? 'bg-white shadow text-pink-600' : 'text-gray-500'}`}
                        >
                            Aa
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                <span className="text-xs font-bold text-gray-700">Rainbow Text 🌈</span>
                <button 
                  onClick={() => setChatSettings({...chatSettings, rainbow: !chatSettings.rainbow})}
                  className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${chatSettings.rainbow ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500' : 'bg-gray-200'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${chatSettings.rainbow ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
            </div>
        </div>
    </div>
);

const GoldModal = ({ onClose }) => (
  <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl relative border border-yellow-500/20">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"><X size={24} /></button>
          <div className={`bg-gradient-to-br from-rose-400 via-pink-500 to-amber-400 p-10 text-center text-white relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-[60px] opacity-20"></div>
              
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/40 shadow-inner relative z-10">
                  <Sparkles size={48} className="text-white drop-shadow-md" />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter drop-shadow-md">Lovr Gold</h2>
              <p className="text-sm font-bold opacity-90 mt-2 uppercase tracking-widest">Unlock Premium</p>
          </div>
          <div className="p-8 space-y-4 bg-white">
              {[
                  { icon: RotateCcw, text: "Unlimited Rewinds", color: "text-yellow-600", bg: "bg-yellow-100" },
                  { icon: Heart, text: "See Who Likes You", color: "text-rose-600", bg: "bg-rose-100" },
                  { icon: MapPin, text: "Passport Anywhere", color: "text-blue-600", bg: "bg-blue-100" },
                  { icon: Zap, text: "5 Super Likes / Day", color: "text-purple-600", bg: "bg-purple-100" },
              ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition cursor-default">
                      <div className={`p-2.5 rounded-full ${item.bg} ${item.color}`}><item.icon size={20} /></div>
                      <span className="text-gray-800 font-bold text-sm">{item.text}</span>
                  </div>
              ))}
              
              <button 
                  onClick={onClose}
                  className="w-full py-4 bg-gray-900 rounded-2xl text-white font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition mt-4"
              >
                  Upgrade for $9.99
              </button>
          </div>
      </div>
  </div>
);

const SafetyModal = ({ onClose }) => (
  <div className="absolute inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      <header className="px-5 py-4 border-b flex items-center gap-3">
           <button onClick={onClose}><ChevronLeft size={24} className="text-gray-800" /></button>
           <h2 className="text-lg font-bold">Safety Center</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                  <Shield className="text-blue-500 shrink-0" size={24} />
                  <div>
                      <h3 className="font-bold text-blue-900">Safe Dating Tips</h3>
                      <p className="text-sm text-blue-800 mt-1">Meet in public places and tell a friend where you are going.</p>
                  </div>
              </div>
          </div>
          {/* Tools */}
          <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Tools</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-full shadow-sm"><Lock size={20} className="text-gray-600" /></div>
                      <span className="font-medium text-gray-700">Unmatch & Report</span>
                  </div>
                  <ChevronLeft className="rotate-180 text-gray-400" size={20} />
              </div>
          </div>
      </div>
  </div>
);

const ProfileDetailSheet = ({ profileId, onClose, handleSwipe }) => {
  const profile = ALL_PROFILES.find(p => p.id === profileId);
  if (!profile) return null;

  return (
      <div className="absolute inset-0 z-40 bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300 flex flex-col">
          <div className="flex-1 relative overflow-y-auto pb-24">
               <div className="h-[55vh] w-full relative">
                  <img src={profile.images[0]} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <button 
                      onClick={onClose}
                      className="absolute top-4 right-4 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition"
                  >
                      <ChevronLeft size={28} className="-rotate-90" />
                  </button>
               </div>
               
               <div className="px-6 py-8 -mt-12 relative bg-white rounded-t-[40px] min-h-[500px] shadow-[0_-10px_60px_rgba(0,0,0,0.2)]">
                   <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
                   
                   <div className="flex justify-between items-start mb-8">
                      <div>
                          <h1 className="text-4xl font-black text-gray-900 flex items-center gap-2 tracking-tight">
                              {profile.name} <span className="text-3xl font-medium text-gray-400">{profile.age}</span>
                          </h1>
                          <div className={`flex items-center gap-2 mt-2 font-bold ${THEME.gradientText} text-lg`}>
                              <MapPin size={18} className="text-pink-500" /> {profile.distance} miles away
                          </div>
                      </div>
                      <button className={`w-16 h-16 ${THEME.gradient} rounded-full flex items-center justify-center text-white shadow-xl shadow-pink-200 hover:scale-110 transition active:scale-95`}>
                          <Send size={28} />
                      </button>
                   </div>

                   <div className="mb-10">
                       <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">About Me</h3>
                       <p className="text-gray-600 leading-relaxed text-lg font-medium">{profile.bio}</p>
                   </div>

                   <div className="mb-10">
                       <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Basics</h3>
                       <div className="grid grid-cols-2 gap-3">
                           <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                               <Ruler size={20} className="text-gray-400" />
                               <span className="text-sm font-bold text-gray-700">{profile.basics?.height}</span>
                           </div>
                           <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                               <Moon size={20} className="text-gray-400" />
                               <span className="text-sm font-bold text-gray-700">{profile.basics?.zodiac}</span>
                           </div>
                           <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 col-span-2">
                               <span className="text-2xl">🎓</span>
                               <span className="text-sm font-bold text-gray-700">{profile.basics?.education}</span>
                           </div>
                       </div>
                   </div>

                   <div className="mb-10">
                       <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Lifestyle</h3>
                       <div className="flex flex-wrap gap-2">
                          <span className="px-5 py-2.5 border border-gray-100 rounded-full text-sm font-bold text-gray-600 flex items-center gap-2 bg-white shadow-sm">
                              <Wine size={16} className="text-pink-500" /> {profile.lifestyle?.drinking}
                          </span>
                          <span className="px-5 py-2.5 border border-gray-100 rounded-full text-sm font-bold text-gray-600 flex items-center gap-2 bg-white shadow-sm">
                              <Cigarette size={16} className="text-pink-500" /> {profile.lifestyle?.smoking}
                          </span>
                          <span className="px-5 py-2.5 border border-gray-100 rounded-full text-sm font-bold text-gray-600 flex items-center gap-2 bg-white shadow-sm">
                              🐶 {profile.lifestyle?.pets}
                          </span>
                       </div>
                   </div>

                   {/* Action Buttons */}
                   <div className="flex justify-center gap-8 mb-10">
                       <button onClick={() => { onClose(); handleSwipe('left'); }} className="w-20 h-20 bg-white border-2 border-gray-100 shadow-xl rounded-full flex items-center justify-center text-rose-500 hover:scale-110 transition active:scale-95"><X size={40} strokeWidth={3}/></button>
                       <button onClick={() => { onClose(); handleSwipe('right'); }} className={`w-20 h-20 ${THEME.gradient} shadow-2xl shadow-pink-300 rounded-full flex items-center justify-center text-white hover:scale-110 transition active:scale-95`}><Heart size={40} fill="white"/></button>
                   </div>

                   <div className="text-center py-8 border-t border-gray-100">
                       <button className="text-gray-400 text-sm font-bold uppercase hover:text-rose-500 transition">Report {profile.name}</button>
                   </div>
               </div>
          </div>
      </div>
  );
};

const UserProfileView = ({ userProfile, setShowGoldModal, setShowSafety }) => (
    <div className="flex-1 bg-gray-50 flex flex-col overflow-y-auto">
      <div className="relative h-80 w-full group">
        <img src={userProfile?.images?.[0]} className="w-full h-full object-cover" alt="My Profile" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        <div className="absolute top-4 w-full px-4 flex justify-between items-center text-white">
            <button className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition">
                <Settings size={20} />
            </button>
            <span className="font-bold tracking-widest text-xs opacity-80 uppercase">My Profile</span>
            <button className="p-2 bg-white text-rose-500 rounded-full hover:bg-gray-100 transition shadow-lg">
                <MoreVertical size={20} />
            </button>
        </div>

        <div className="absolute -bottom-8 left-0 right-0 flex justify-center z-10">
            <div className="relative">
                <div className="w-24 h-24 rounded-full p-1 bg-white shadow-xl">
                    <img src={userProfile?.images?.[0]} className="w-full h-full rounded-full object-cover" alt="" />
                </div>
                <div className="absolute bottom-1 right-1 bg-pink-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                    <Edit size={12} strokeWidth={4} />
                </div>
            </div>
        </div>
      </div>

      <div className="px-5 pt-12 pb-8 space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-black text-gray-900">{userProfile.name}, {userProfile.age}</h1>
            <p className="text-gray-500 text-base mt-1 font-medium">{userProfile.job}</p>
        </div>

        <div className="flex justify-center">
            <button className="px-6 py-2.5 bg-gray-100 rounded-full font-bold text-gray-700 hover:bg-gray-200 transition flex items-center gap-2">
                <Edit size={16} /> Edit Profile
            </button>
        </div>

        <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">About Me</h3>
                <p className="text-gray-600 leading-relaxed">{userProfile.bio}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.interests?.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-full text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
            </div>
        </div>

        <div className="flex gap-4">
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-1 relative overflow-hidden group hover:border-pink-200 transition">
                <div className="absolute top-0 left-0 w-full h-1 bg-pink-600"></div>
                <div className="text-2xl font-black text-gray-900 group-hover:scale-110 transition">12</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Likes You</div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-1 relative overflow-hidden group hover:border-purple-200 transition">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                <div className="text-2xl font-black text-gray-900 group-hover:scale-110 transition">3</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Super Likes</div>
            </div>
        </div>

        <button onClick={() => setShowSafety(true)} className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50">
            <Shield size={20} className="text-blue-500" />
            <div className="flex-1 text-left">
                <div className="font-bold text-gray-900 text-sm">Safety Center</div>
                <div className="text-xs text-gray-400">Tools & resources for safe dating</div>
            </div>
            <ChevronLeft className="rotate-180 text-gray-300" size={16} />
        </button>

        <div className="relative overflow-hidden bg-gray-900 rounded-3xl p-6 text-white shadow-xl cursor-pointer hover:scale-[1.02] transition" onClick={() => setShowGoldModal(true)}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full blur-[60px] opacity-40"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`bg-gradient-to-r from-pink-600 to-rose-500 p-1 px-2 rounded text-white font-black text-[10px] uppercase tracking-wide`}>Gold</div>
                    <span className="font-black italic text-lg">Lovr Premium</span>
                </div>
                <p className="text-sm opacity-80 mb-4 pr-8 font-medium">See who likes you, rewind swipes, and get unlimited likes.</p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wide hover:bg-gray-100 transition shadow-lg">Upgrade Now</button>
            </div>
        </div>
        
        <div className="text-center pt-4">
            <span className="text-gray-300 text-xs font-medium">Lovr Version 2.1 (Prod)</span>
        </div>
      </div>
    </div>
);

// --- MAIN COMPONENT ---

export default function DatingApp() {
  const [currentView, setCurrentView] = useState('splash'); 
  const [viewMode, setViewMode] = useState('stack');
  const [profiles, setProfiles] = useState(ALL_PROFILES);
  const [filteredProfiles, setFilteredProfiles] = useState(ALL_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [activeChat, setActiveChat] = useState(null);
  const [chatBg, setChatBg] = useState('default');
  const [showMatchOverlay, setShowMatchOverlay] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [showGoldModal, setShowGoldModal] = useState(false);
  const [showProfileDetail, setShowProfileDetail] = useState(null);
  const [showDatePlanner, setShowDatePlanner] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatCustomizer, setShowChatCustomizer] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Tour State
  const [showHomeTour, setShowHomeTour] = useState(false);
  const [showMatchesTour, setShowMatchesTour] = useState(false);
  const [showChatTour, setShowChatTour] = useState(false);
  const [showMapTour, setShowMapTour] = useState(false);

  // Welcome Screen State
  const [userName, setUserName] = useState('');
  const [userPreference, setUserPreference] = useState(''); 

  // Chat Settings
  const [chatSettings, setChatSettings] = useState({
      bg: 'default',
      font: 'sans',
      rainbow: false,
      color: 'pink'
  });

  // History for Rewind
  const [history, setHistory] = useState([]);

  // Filter State
  const [filters, setFilters] = useState({
    gender: 'all',
    ageRange: [18, 35],
    maxDistance: 20
  });

  // Drag State
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Jordan',
    age: 25,
    bio: 'Just looking for someone to share my Netflix account with.',
    job: 'Software Engineer',
    images: ['https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80'],
    interests: ['Coding', 'Sci-Fi', 'Running']
  });

  // Splash Screen Timer
  useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => {
          // playSound('match'); // Not reliable on load
          setCurrentView('welcome');
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // View Change & Tour Logic
  useEffect(() => {
      // Reset tours when view changes
      setShowHomeTour(false);
      setShowMatchesTour(false);
      setShowChatTour(false);
      setShowMapTour(false);

      if (currentView === 'home' && userName) { // Only show home tour if we passed welcome
          if (viewMode === 'stack') {
            setShowHomeTour(true);
            const timer = setTimeout(() => setShowHomeTour(false), 8000);
            return () => clearTimeout(timer);
          } else if (viewMode === 'map') {
            setShowMapTour(true);
            const timer = setTimeout(() => setShowMapTour(false), 8000);
            return () => clearTimeout(timer);
          }
      } else if (currentView === 'matches') {
          setShowMatchesTour(true);
          const timer = setTimeout(() => setShowMatchesTour(false), 8000);
          return () => clearTimeout(timer);
      } else if (currentView === 'chat') {
          setShowChatTour(true);
          const timer = setTimeout(() => setShowChatTour(false), 8000);
          return () => clearTimeout(timer);
      }
  }, [currentView, userName, viewMode]);


  // Effect to filter profiles based on preference
  useEffect(() => {
    if (userPreference) {
        let newFilters = { ...filters };
        if (userPreference === 'both') {
            newFilters.gender = 'all';
        } else {
            newFilters.gender = userPreference;
        }
        setFilters(newFilters);
        
        // Apply logic to filter profiles
        const filtered = ALL_PROFILES.filter(p => {
            if (newFilters.gender !== 'all' && p.gender !== newFilters.gender) return false;
            // Add other filters logic if needed here
            return true;
        });
        setFilteredProfiles(filtered);
    }
  }, [userPreference]);

  // --- ACTIONS ---

  const handleOnboardingComplete = () => {
      if (userName && userPreference) {
          setUserProfile(prev => ({ ...prev, name: userName }));
          // Ensure filtered profiles are set before navigating
          let newFilters = { ...filters };
          if (userPreference === 'both') {
              newFilters.gender = 'all';
          } else {
              newFilters.gender = userPreference;
          }
          setFilters(newFilters);
          
          const filtered = ALL_PROFILES.filter(p => {
              if (newFilters.gender !== 'all' && p.gender !== newFilters.gender) return false;
              return true;
          });
          setFilteredProfiles(filtered);
          setCurrentIndex(0);
          
          setCurrentView('home');
      }
  };

  const playSound = (type) => {
      // Placeholder
  };

  const handleDragStart = (e) => {
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    setDragCurrent({ x: clientX - dragStart.x, y: clientY - dragStart.y });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 100;
    if (dragCurrent.x > threshold) handleSwipe('right');
    else if (dragCurrent.x < -threshold) handleSwipe('left');
    else setDragCurrent({ x: 0, y: 0 });
  };

  const handleSwipe = (direction) => {
    if (!isDragging) {
        if (direction === 'right') setDragCurrent({ x: 500, y: 0 });
        if (direction === 'left') setDragCurrent({ x: -500, y: 0 });
        if (direction === 'up') setDragCurrent({ x: 0, y: -500 });
    }

    // Safety Check: Ensure current profile exists before proceeding
    const currentProfile = filteredProfiles[currentIndex];
    if (!currentProfile) return;

    setHistory(prev => [...prev, { index: currentIndex, profile: currentProfile, direction }]);

    setTimeout(() => {
      if (direction === 'right' || direction === 'up') {
        if (Math.random() > 0.6) handleMatch(currentProfile);
      }

      if (currentIndex < filteredProfiles.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setDragCurrent({ x: 0, y: 0 });
        setDragStart({ x: 0, y: 0 });
      } else {
        // End of stack logic
      }
    }, 200);
  };

  const handleRewind = () => {
    if (history.length === 0) return;
    if (Math.random() > 0.3) {
        setShowGoldModal(true);
        return;
    }
    const lastAction = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentIndex(lastAction.index);
    setDragCurrent({ x: 0, y: 0 });
  };

  const handleMatch = (profile) => {
    playSound('match');
    setShowMatchOverlay(profile);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    const newMatch = {
      id: profile.id,
      name: profile.name,
      image: profile.images[0],
      lastMessage: 'New Match! Say hello 👋',
      timestamp: 'Just now',
      unread: true,
      isOnline: true
    };
    
    if (!matches.find(m => m.id === profile.id)) {
      setMatches(prev => [newMatch, ...prev]);
      setMessages(prev => ({...prev, [profile.id]: []}));
    }
  };

  const toggleChatBg = () => {
      const idx = CHAT_BACKGROUNDS.findIndex(b => b.id === chatBg);
      const next = CHAT_BACKGROUNDS[(idx + 1) % CHAT_BACKGROUNDS.length];
      setChatBg(next.id);
  };

  const sendMessage = (text, type = 'text', payload = null) => {
    if (type === 'text' && !text.trim()) return;
    playSound('send');
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { sender: 'me', text, time, type, payload };
    
    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));

    if (type === 'text') {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const responses = ["That's so cool!", "I was thinking the same thing.", "Tell me more!", "Do you like sushi?", "We should hang out soon."];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const responseMsg = { sender: 'them', text: randomResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' };
            
            setMessages(prev => ({
                ...prev,
                [activeChat.id]: [...(prev[activeChat.id] || []), responseMsg]
            }));
        }, 2500);
    } else if (type === 'date-invite') {
         setTimeout(() => {
            const responseMsg = { sender: 'them', text: "I'd love to! 😍 That sounds perfect.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' };
            setMessages(prev => ({
                ...prev,
                [activeChat.id]: [...(prev[activeChat.id] || []), responseMsg]
            }));
         }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 font-sans text-gray-900 sm:py-20 overflow-x-hidden">
      <style>{`
        /* Custom Pink Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #fdf2f8;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #fbcfe8;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #f9a8d4;
        }
      `}</style>
      {/* Phone wrapper - allows tooltips to overflow */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-[400px] h-[850px] bg-white sm:rounded-[45px] shadow-2xl overflow-hidden flex flex-col relative sm:border-[8px] sm:border-gray-900 ring-1 ring-black/5">
        
        {/* Modals & Overlays */}
        {showConfetti && <Confetti />}
        {currentView === 'splash' && <Splash />}
        {currentView === 'welcome' && (
            <WelcomeScreen 
                userName={userName} 
                setUserName={setUserName} 
                userPreference={userPreference} 
                setUserPreference={setUserPreference} 
                onComplete={handleOnboardingComplete}
            />
        )}
        {showSafety && <SafetyModal onClose={() => setShowSafety(false)} />}
        {showGoldModal && <GoldModal onClose={() => setShowGoldModal(false)} />}
        {showProfileDetail && (
            <ProfileDetailSheet 
                profileId={showProfileDetail} 
                onClose={() => setShowProfileDetail(null)} 
                handleSwipe={handleSwipe}
            />
        )}
        {showDatePlanner && (
            <DatePlannerModal 
                onClose={() => setShowDatePlanner(false)}
                sendMessage={sendMessage}
                activeChat={activeChat}
            />
        )}

        {/* Match Overlay - Z-Index 100 to stay above stack (Z-30) */}
        {showMatchOverlay && (
          <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-500 p-6 overflow-hidden">
             <FloatingHearts />
             <div className="absolute top-20 left-10 w-40 h-40 bg-pink-600 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
             <div className="relative z-10 flex flex-col items-center w-full">
                 <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300 italic tracking-tighter mb-12 transform -rotate-6 drop-shadow-lg">
                    IT'S A<br/>MATCH!
                 </div>
                 <div className="flex items-center justify-center gap-6 mb-12 relative w-full h-32">
                    <div className="absolute left-[15%] w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl transform -rotate-12 animate-in slide-in-from-left duration-700">
                       <img src={userProfile?.images?.[0]} alt="You" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute right-[15%] w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl transform rotate-12 -ml-8 animate-in slide-in-from-right duration-700 delay-100">
                       <img src={showMatchOverlay.images[0]} alt="Match" className="w-full h-full object-cover" />
                    </div>
                 </div>
                 <button onClick={() => { const match = matches.find(m => m.id === showMatchOverlay.id); setActiveChat(match); setShowMatchOverlay(null); setCurrentView('chat'); }} className={`w-full py-4 ${THEME.gradient} rounded-full text-white font-bold text-lg mb-4 shadow-xl hover:scale-105 transition`}>
                    Send a Message
                 </button>
                 <button onClick={() => setShowMatchOverlay(null)} className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold hover:bg-white/20 transition">
                    Keep Swiping
                 </button>
             </div>
          </div>
        )}

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden flex flex-col bg-white">
          {currentView === 'home' && (
            <div className="flex-1 flex flex-col relative overflow-hidden bg-gray-50 select-none">
              <header className="px-5 py-4 flex justify-between items-center relative z-[100] bg-white/80 backdrop-blur-md border-b border-pink-50/50">
                <div className="flex items-center gap-2">
                  <LovrLogo className="w-24 h-8" color="brand" />
                </div>
                <div className="flex gap-2">
                    <button 
                         onClick={() => setViewMode(viewMode === 'stack' ? 'map' : 'stack')}
                         className="p-2.5 rounded-full transition border border-gray-100 shadow-sm active:scale-95 bg-white hover:bg-pink-50 text-gray-600"
                    >
                        {viewMode === 'stack' ? <MapIcon size={20} /> : <List size={20} />}
                    </button>

                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`p-2.5 rounded-full transition border shadow-sm relative active:scale-95 ${showNotifications ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-100 hover:bg-pink-50'}`}
                    >
                        <Bell size={20} className="text-gray-600" />
                        <div className="absolute top-2 right-2.5 w-2 h-2 bg-pink-500 rounded-full border border-white"></div>
                    </button>
                    {showNotifications && <NotificationsSheet onClose={() => setShowNotifications(false)} />}
                    
                    <button 
                        onClick={() => setShowFilters(true)}
                        className="p-2.5 bg-white hover:bg-pink-50 rounded-full transition border border-gray-100 shadow-sm active:scale-95"
                    >
                    <SlidersHorizontal size={20} className="text-gray-600" />
                    </button>
                </div>
              </header>

              {viewMode === 'map' ? (
                <MapView profiles={filteredProfiles} setShowProfileDetail={setShowProfileDetail} />
              ) : (
                /* STACK CONTAINER */
                <div className="flex-1 relative w-full h-full z-0 overflow-hidden">
                    {filteredProfiles.length > 0 && filteredProfiles.map((profile, index) => {
                    if (index < currentIndex) return null;
                    // Only show next 1 card for performance
                    if (index > currentIndex + 1) return null;

                    const isTop = index === currentIndex;
                    
                    let x = 0, y = 0, rot = 0;
                    if (isTop) {
                        x = dragCurrent.x;
                        y = dragCurrent.y;
                        rot = x * 0.05;
                    }

                    // Stack Logic
                    const translateY = isTop ? 0 : -12; 
                    const scale = isTop ? 1 : 0.96;
                    
                    return (
                        <div 
                            key={profile.id}
                            ref={isTop ? cardRef : null}
                            className={`absolute inset-0 m-3 rounded-[32px] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-white`}
                            style={{
                                zIndex: isTop ? 50 : 40,
                                top: isTop ? '0px' : '15px', 
                                transform: isTop 
                                    ? `translate(${x}px, ${y}px) rotate(${rot}deg)` 
                                    : `translateY(${translateY}px) scale(${scale})`,
                                transition: isDragging && isTop ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                opacity: 1,
                            }}
                            onMouseDown={isTop ? handleDragStart : null}
                            onMouseMove={isTop ? handleDragMove : null}
                            onMouseUp={isTop ? handleDragEnd : null}
                            onMouseLeave={isTop ? handleDragEnd : null}
                            onTouchStart={isTop ? handleDragStart : null}
                            onTouchMove={isTop ? handleDragMove : null}
                            onTouchEnd={isTop ? handleDragEnd : null}
                        >
                        <div className="h-full w-full relative select-none pointer-events-none">
                            <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover pointer-events-none" />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent via-50% to-black/90" />
                            
                            {/* STAMPS */}
                            <div className="absolute top-8 right-8 border-[6px] border-rose-500 rounded-xl px-4 py-0 transform rotate-12 transition-opacity" style={{ opacity: isTop ? Math.max(0, Math.min(1, (x * -1) / 50)) : 0 }}>
                                <span className="text-5xl font-black text-rose-500 tracking-wider">NOPE</span>
                            </div>
                            <div className="absolute top-8 left-8 border-[6px] border-green-400 rounded-xl px-4 py-0 transform -rotate-12 transition-opacity" style={{ opacity: isTop ? Math.max(0, Math.min(1, x / 50)) : 0 }}>
                                <span className="text-5xl font-black text-green-400 tracking-wider">LIKE</span>
                            </div>

                            {/* Profile Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 pb-24 text-white flex flex-col justify-end">
                            <div className="flex items-end gap-3 mb-3 translate-y-2">
                                <h2 className="text-5xl font-black tracking-tighter drop-shadow-md">{profile.name}</h2>
                                <span className="text-3xl font-medium opacity-90 mb-1 drop-shadow-md">{profile.age}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm font-bold mb-5 translate-y-1">
                                <span className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-white/10">
                                    <MapPin size={14} /> {profile.distance} miles
                                </span>
                                <span className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-white/10">
                                    {profile.job}
                                </span>
                            </div>

                            {/* VISIBLE BIO */}
                            <p className="text-base font-medium opacity-90 mb-6 line-clamp-3 leading-relaxed drop-shadow-md pr-12">
                                {profile.bio}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {profile.interests.map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 bg-black/40 border border-white/20 backdrop-blur-md text-xs rounded-full font-bold">
                                    {tag}
                                </span>
                                ))}
                            </div>
                            </div>
                            
                            {/* Learn More Button */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowProfileDetail(profile.id);
                                }}
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                className="absolute bottom-6 left-6 right-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm hover:bg-white/30 pointer-events-auto transition border border-white/30 flex items-center justify-center gap-2"
                            >
                                <Info size={18} /> Learn more about me
                            </button>
                        </div>
                        </div>
                    );
                    })}
                    {filteredProfiles.length === 0 && (
                        <div className="flex items-center justify-center h-full text-center p-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No more profiles!</h3>
                                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                            </div>
                        </div>
                    )}
                </div>
              )}

              {/* Standard Bottom Actions Floating */}
              {viewMode === 'stack' && (
                <div className="absolute bottom-24 right-4 flex flex-col gap-4 z-50">
                    {/* Could put actions here, but standard bottom bar is safer for UX */}
                </div>
              )}

            </div>
          )}
          {currentView === 'likes' && (
             <LikesView setShowGoldModal={setShowGoldModal} />
          )}
          {currentView === 'matches' && (
              <div className="flex-1 bg-white flex flex-col relative animate-in fade-in">
                  <header className="px-5 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h1 className="text-xl font-black text-gray-900">Messages</h1>
                    <button className="p-2 bg-gray-50 rounded-full text-gray-400"><Filter size={16} /></button>
                  </header>
                  <div className="pt-4 pb-2">
                    <div className="px-5 flex justify-between items-end mb-3">
                        <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider">New Matches</h2>
                        <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">{matches.length}</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto px-5 pb-4 scrollbar-thin">
                      <div className="flex flex-col items-center gap-2 min-w-[76px] snap-start">
                        <div className="w-[72px] h-[72px] rounded-full bg-pink-50 border-2 border-dashed border-pink-300 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-pink-100 transition">
                          <Heart size={24} className="text-pink-600" />
                          <div className="absolute bottom-1 bg-pink-600 text-white text-[10px] px-1.5 rounded-full font-bold shadow-sm">99+</div>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">Likes</span>
                      </div>
                      {matches.map(match => (
                        <div key={match.id} className="flex flex-col items-center gap-2 min-w-[76px] snap-start cursor-pointer group" onClick={() => { setActiveChat(match); setCurrentView('chat'); }}>
                          <div className="relative w-[72px] h-[72px]">
                            <img src={match.image} alt={match.name} className="w-full h-full rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-105 transition duration-300" />
                            {match.isOnline && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-[3px] border-white rounded-full"></div>}
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{match.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto rounded-t-[32px] bg-gray-50 pt-4 border-t border-gray-100">
                    {matches.map(match => (
                      <div key={match.id} onClick={() => { setActiveChat(match); setCurrentView('chat'); }} className="flex items-center gap-4 px-5 py-4 hover:bg-white cursor-pointer transition active:scale-[0.99] border-b border-gray-100/50 last:border-0">
                        <div className="relative">
                          <img src={match.image} alt={match.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                          {match.unread && <div className="absolute top-0 right-0 w-4 h-4 bg-pink-600 rounded-full border-[3px] border-white ring-1 ring-gray-100" />}
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900 text-base">{match.name}</h3>
                            <span className={`text-xs ${match.unread ? 'text-pink-600 font-bold' : 'text-gray-400'}`}>{match.timestamp}</span>
                          </div>
                          <p className={`text-sm truncate ${match.unread ? 'font-bold text-gray-800' : 'text-gray-500'}`}>{match.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
          )}
          {currentView === 'chat' && (
            <div className={`flex-1 flex flex-col h-full relative ${CHAT_BACKGROUNDS.find(b => b.id === chatSettings.bg)?.class || 'bg-white'} ${FONTS.find(f => f.id === chatSettings.font)?.class || 'font-sans'}`}>
                <div className={`px-4 py-3 border-b flex items-center gap-3 shadow-sm z-10 sticky top-0 backdrop-blur-md ${chatSettings.bg === 'dark' ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white/80 border-gray-100 text-gray-900'}`}>
                <button onClick={() => setCurrentView('matches')} className={`p-2 -ml-2 rounded-full transition ${chatSettings.bg === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-400'}`}>
                    <ChevronLeft size={24} />
                </button>
                <div className="relative">
                    <img src={activeChat.image} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-600" />
                    {activeChat.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 cursor-pointer">
                    <h3 className="font-bold leading-tight flex items-center gap-1">
                        {activeChat.name}
                    </h3>
                    <span className="text-xs text-pink-600 font-medium">
                    {activeChat.isOnline ? 'Online Now' : 'Offline'}
                    </span>
                </div>
                
                <button 
                    onClick={() => setShowChatCustomizer(!showChatCustomizer)} 
                    className={`p-2 rounded-full transition relative ${showChatCustomizer ? 'bg-pink-100 text-pink-600' : (chatSettings.bg === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-pink-600')}`}
                >
                    <Palette size={20} />
                </button>
                </div>

                {/* Customizer Overlay */}
                {showChatCustomizer && <ChatCustomizer onClose={() => setShowChatCustomizer(false)} chatSettings={chatSettings} setChatSettings={setChatSettings} />}

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="text-center my-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${chatSettings.bg === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-400'}`}>
                        Matched Today
                    </span>
                </div>
                
                {messages[activeChat.id]?.map((msg, idx) => {
                    if (msg.type === 'date-invite') {
                        return (
                            <div key={idx} className="flex justify-end animate-in slide-in-from-bottom-4 duration-500">
                                <div className={`border p-4 rounded-3xl rounded-br-none shadow-lg max-w-[85%] ${chatSettings.bg === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                    <div className={`flex items-center gap-3 mb-3 border-b pb-3 ${chatSettings.bg === 'dark' ? 'border-gray-700' : 'border-gray-50'}`}>
                                        <div className={`p-2 rounded-full ${msg.payload.vibe.bg} ${msg.payload.vibe.color}`}>
                                            <msg.payload.vibe.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Invitation</div>
                                            <div className={`font-bold ${chatSettings.bg === 'dark' ? 'text-white' : 'text-gray-800'}`}>{msg.payload.vibe.label}</div>
                                        </div>
                                    </div>
                                    {msg.payload.spot && (
                                        <div className="text-sm font-medium mb-2 flex items-center gap-1 text-gray-500">
                                            <MapPin size={14} className="text-pink-500" /> {msg.payload.spot}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                        <Clock size={16} className="text-pink-600" />
                                        {msg.payload.time}
                                    </div>
                                    <div className="mt-3 text-center">
                                        <span className={`inline-block px-4 py-1.5 text-xs font-bold rounded-full ${chatSettings.bg === 'dark' ? 'bg-black text-white' : 'bg-gray-900 text-white'}`}>Sent</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                            msg.sender === 'me' 
                            ? 'bg-pink-600 text-white rounded-br-none' 
                            : `${chatSettings.bg === 'dark' ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border border-gray-100'} rounded-bl-none`
                        }`}>
                            <span className={chatSettings.rainbow ? "bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 font-bold" : ""}>
                                {msg.text}
                            </span>
                            <span className={`text-[10px] block text-right mt-1 opacity-60 ${msg.sender === 'me' ? 'text-white' : 'text-gray-400'}`}>
                            {msg.time}
                            </span>
                        </div>
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="flex justify-start animate-pulse">
                        <div className={`border px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 shadow-sm ${chatSettings.bg === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                </div>

                <div className={`p-3 border-t flex items-center gap-2 ${chatSettings.bg === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <button onClick={() => setShowDatePlanner(true)} className={`p-3 rounded-full transition group ${chatSettings.bg === 'dark' ? 'bg-gray-800 text-pink-400 hover:bg-gray-700' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'}`}>
                    <CalendarHeart size={20} className="group-hover:scale-110 transition" />
                </button>
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className={`w-full rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all font-medium ${chatSettings.bg === 'dark' ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-800'}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />
                    <button 
                        className="absolute right-1 top-1 bottom-1 w-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:scale-105 transition shadow-md shadow-pink-200"
                        onClick={(e) => {
                            const input = e.currentTarget.parentElement.querySelector('input');
                            sendMessage(input.value);
                            input.value = '';
                        }}
                    >
                        <Send size={18} className="ml-0.5" />
                    </button>
                </div>
                </div>
            </div>
          )}
          {currentView === 'profile' && <UserProfileView userProfile={userProfile} setShowGoldModal={setShowGoldModal} setShowSafety={setShowSafety} />}
        </div>

        {/* Bottom Navigation */}
        {currentView !== 'chat' && currentView !== 'splash' && currentView !== 'welcome' && (
          <nav className="h-[88px] bg-white border-t border-gray-100 flex justify-around items-start pt-4 px-2 pb-6 z-20">
            <button onClick={() => setCurrentView('home')} className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 w-16 group ${currentView === 'home' ? 'text-pink-600' : 'text-gray-300 hover:text-gray-500'}`}>
              <div className={`relative p-1 rounded-full ${currentView === 'home' ? 'bg-pink-50' : 'bg-transparent group-hover:bg-gray-50'}`}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill={currentView === 'home' ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.113.25-2.178.7-3.144C6.2 12.357 7.2 13.2 8.5 14.5z"></path></svg>
              </div>
            </button>
            <button onClick={() => setCurrentView('likes')} className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 w-16 group ${currentView === 'likes' ? 'text-pink-600' : 'text-gray-300 hover:text-gray-500'}`}>
               <div className={`relative p-1 rounded-full ${currentView === 'likes' ? 'bg-pink-50' : 'bg-transparent group-hover:bg-gray-50'}`}>
                   <Heart size={24} strokeWidth={2.5} fill={currentView === 'likes' ? "currentColor" : "none"} />
               </div>
            </button>
            <button onClick={() => setCurrentView('matches')} className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 w-16 group ${currentView === 'matches' ? 'text-pink-600' : 'text-gray-300 hover:text-gray-500'}`}>
               <div className={`relative p-1 rounded-full ${currentView === 'matches' ? 'bg-pink-50' : 'bg-transparent group-hover:bg-gray-50'}`}>
                   <MessageCircle size={24} strokeWidth={2.5} fill={currentView === 'matches' ? "currentColor" : "none"} />
                   <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-600 rounded-full border-2 border-white"></div>
               </div>
            </button>
            <button onClick={() => setCurrentView('profile')} className={`p-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 w-16 group ${currentView === 'profile' ? 'text-pink-600' : 'text-gray-300 hover:text-gray-500'}`}>
              <div className={`relative p-1 rounded-full ${currentView === 'profile' ? 'bg-pink-50' : 'bg-transparent group-hover:bg-gray-50'}`}>
                 <User size={24} strokeWidth={2.5} fill={currentView === 'profile' ? "currentColor" : "none"} />
              </div>
            </button>
          </nav>
        )}
        </div>
        {/* End Phone Frame */}

        {/* --- TOUR TOOLTIPS (External - appear outside phone frame) --- */}
        {/* Home Tour */}
        {showHomeTour && (
            <>
                <TourTooltip text="Switch between card stack and map view to find matches!" position="top-20 left-0" side="left" arrow="right" color="bg-blue-600" />
                <TourTooltip text="Swipe right to like, left to pass!" position="top-1/3 left-0" side="left" arrow="right" color="bg-gray-900" />
                <TourTooltip text="View your notifications here" position="top-20 left-0" side="right" arrow="left" color="bg-gray-900" />
                <TourTooltip text="Tap the info button to learn more about your match" position="top-1/2 left-0" side="right" arrow="left" color="bg-pink-600" />
                <TourTooltip text="Use the navigation bar to switch between pages!" position="bottom-28 left-0" side="left" arrow="right" color="bg-purple-600" />
            </>
        )}

        {/* Matches Tour */}
        {showMatchesTour && (
            <>
                <TourTooltip text="Wow you've already got some matches!" position="top-40 left-0" side="left" arrow="right" color="bg-purple-600" />
                <TourTooltip text="You have new messages! Tap to start chatting!" position="top-64 left-0" side="right" arrow="left" color="bg-pink-600" />
            </>
        )}

        {/* Chat Tour */}
        {showChatTour && (
            <>
                 <TourTooltip text="Customise your font, background, and personalise your chat!" position="top-24 left-0" side="right" arrow="left" color="bg-purple-600" />
                 <TourTooltip text="Use the date planner to plan a date!" position="bottom-28 left-0" side="left" arrow="right" color="bg-pink-600" />
                 <TourTooltip text="Go on, don't be shy - send them a message!" position="bottom-28 left-0" side="right" arrow="left" color="bg-gray-800" />
            </>
        )}

        {/* Map Tour */}
        {showMapTour && (
            <>
                <TourTooltip text="Explore profiles near you on the map!" position="top-28 left-0" side="left" arrow="right" color="bg-blue-600" />
                <TourTooltip text="Tap a pin to see who it is!" position="top-1/2 left-0" side="right" arrow="left" color="bg-gray-900" />
            </>
        )}
      </div>
      {/* End Phone Wrapper */}
    </div>
  );
}