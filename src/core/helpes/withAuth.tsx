'use client'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../infra/ports/react/componentes/load/load';

export function AuthGuard({ children, load = true } : any) {
    const route = usePathname();
    const [isLoading, setIsLoading] = useState(true);  // Estado para controle do loading

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         window.location.href = '/'
//     }else {
//         setIsLoading(false);
//     }
//   }, []);

//     if (isLoading) {

//         if(load){
//             return <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}> <LoadingSpinner /> </div>;
//         }else{
//             return;
//         }
    
//     }

  return children; 
}
