// MyContext.js
import { createContext, useState } from 'react';
const [userProfile, setUserProfile] = useState({});
const MyContext = createContext();

export default MyContext;
