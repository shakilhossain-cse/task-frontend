import { Outlet } from 'react-router-dom';
import { Box ,Container} from '@mui/material';
import Navbar from '../Navbar';

function UserLayout() {
   return (

         <Box>
           <Navbar/>
           <Container>
               <Outlet />
           </Container>
         </Box>
   );
}



export default UserLayout;
