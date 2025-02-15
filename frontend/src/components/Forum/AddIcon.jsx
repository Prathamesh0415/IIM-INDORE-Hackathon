import AddIcon from '@mui/icons-material/Add';

import IconButton from '@mui/material/IconButton';

export default function Add(){
    return (
        <div className='flex flex-col items-center'>
        <IconButton
        style={{
          backgroundColor: '#1976d2', 
          color: 'white',        
          padding: '20px',           
          borderRadius: '50%',       
        }}
        size="large"
        >
        <AddIcon style={{ fontSize: 40 }} /> {/* Larger icon */}
      </IconButton>
        </div>
    )
}
