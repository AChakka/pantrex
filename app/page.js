import dynamic from 'next/dynamic';
import AddItem from '../components/addItem.js';
import { Typography, Box } from '@mui/material';

const PantryList = dynamic(() => import('../components/PantryList.js'), { ssr: false });

export default function Home() {
  return (
    <Box component="main">
      <div className="content-container">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Pantrex
        </Typography>
        <AddItem />
        <PantryList />
      </div>
    </Box>
  );
}